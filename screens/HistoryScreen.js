import { useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle, Defs, Line, LinearGradient, Path, Stop, Text as SvgText } from 'react-native-svg';
import { useBodyDataContext } from '../contexts/BodyDataContext';
import { useLanguage } from '../contexts/LanguageContext';

const CHART_WIDTH = 340;
const CHART_HEIGHT = 160;
const PADDING_LEFT = 32;
const PADDING_RIGHT = 16;
const PADDING_TOP = 16;
const PADDING_BOTTOM = 24;
const INNER_W = CHART_WIDTH - PADDING_LEFT - PADDING_RIGHT;
const INNER_H = CHART_HEIGHT - PADDING_TOP - PADDING_BOTTOM;

const METRICS = [
  {
    key: 'total',
    emoji: '⭐',
    labelKey: 'metricTotal',
    fallbackLabel: 'Score',
    max: 100,
    yLabels: [100, 75, 50, 25],
    formatValue: v => `${v}`,
    colorFrom: '#0D9373',
    colorTo:   '#34D399',
    inverted: false,
    dynamicScale: 'score',
  },
  {
    key: 'sleepHours',
    emoji: '😴',
    labelKey: 'metricSleep',
    fallbackLabel: 'Sleep',
    max: 12,
    yLabels: [12, 9, 6, 3],
    formatValue: v => `${v}h`,
    colorFrom: '#7C3AED',
    colorTo:   '#C4B5FD',
    inverted: false,
    dynamicScale: 'generic',
  },
  {
    key: 'energy',
    emoji: '⚡',
    labelKey: 'metricEnergy',
    fallbackLabel: 'Energy',
    max: 10,
    yLabels: [10, 7.5, 5, 2.5],
    formatValue: v => `${v}`,
    colorFrom: '#D97706',
    colorTo:   '#FCD34D',
    inverted: false,
    dynamicScale: 'generic',
  },
  {
    key: 'hydration',
    emoji: '💧',
    labelKey: 'metricHydration',
    fallbackLabel: 'Hydration',
    max: 3.5,
    yLabels: [3.5, 2.5, 1.5, 1],
    formatValue: v => `${v}L`,
    colorFrom: '#0284C7',
    colorTo:   '#7DD3FC',
    inverted: false,
    dynamicScale: 'hydration',
    targetLine: 2,
  },
  {
    key: 'stress',
    emoji: '🧠',
    labelKey: 'metricStress',
    fallbackLabel: 'Stress',
    max: 10,
    yLabels: [10, 7.5, 5, 2.5],
    formatValue: v => `${v}`,
    colorFrom: '#F43F5E',
    colorTo:   '#FDA4AF',
    inverted: true,
    invertedGood: true,
  },
];

function getMetricValue(day, metricKey) {
  if (metricKey === 'total') return day.score > 0 ? day.score : null;
  const v = day[metricKey];
  if (v === '-' || v === undefined || v === null) return null;
  const num = parseFloat(v);
  return isNaN(num) ? null : num;
}

function computeScale(rawVals, metric) {
  const { dynamicScale, max: staticMax, yLabels: staticYLabels } = metric;
  if (!dynamicScale || rawVals.length < 2) {
    return { scaleMin: 0, scaleMax: staticMax, yLabels: staticYLabels };
  }
  const dataMin = Math.min(...rawVals);
  const dataMax = Math.max(...rawVals);
  let scaleMin, scaleMax;
  if (dynamicScale === 'score') {
    scaleMin = Math.max(0, Math.floor(dataMin / 10) * 10 - 10);
    scaleMax = 100;
  } else if (dynamicScale === 'hydration') {
    scaleMin = Math.max(1, dataMin - 0.5);
    scaleMax = Math.max(dataMax + 0.5, metric.targetLine + 0.5);
  } else {
    scaleMin = Math.max(0, dataMin - 1);
    scaleMax = dataMax + 1;
  }
  const range = scaleMax - scaleMin;
  const step  = parseFloat((range / 3).toFixed(1));
  const yLabels = [
    parseFloat(scaleMax.toFixed(1)),
    parseFloat((scaleMax - step).toFixed(1)),
    parseFloat((scaleMin + step).toFixed(1)),
    parseFloat(scaleMin.toFixed(1)),
  ].filter((v, i, arr) => arr.indexOf(v) === i);
  return { scaleMin, scaleMax, yLabels };
}

export default function HistoryScreen() {
  const { history, seedTestData } = useBodyDataContext();
  const { t, lang } = useLanguage();
  const [period, setPeriod] = useState(7);
  const days = getLastNDays(history, lang, period);

  const [activeMetricKey, setActiveMetricKey] = useState('total');
  const activeMetric = METRICS.find(m => m.key === activeMetricKey);

  const metricValues = days.map(d => getMetricValue(d, activeMetricKey)).filter(v => v !== null);
  const metricAvg = metricValues.length
    ? parseFloat((metricValues.reduce((s, v) => s + v, 0) / metricValues.length).toFixed(1))
    : null;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{period === 7 ? t.evolution : t.evolution30}</Text>

      {__DEV__ && (
        <TouchableOpacity style={styles.seedBtn} onPress={seedTestData} activeOpacity={0.8}>
          <Text style={styles.seedBtnText}>🧪 Seed 14 days of random data</Text>
        </TouchableOpacity>
      )}

      <View style={styles.toggleRow}>
        <TouchableOpacity
          style={[styles.toggleBtn, period === 7 && styles.toggleBtnActive]}
          onPress={() => setPeriod(7)}
          activeOpacity={0.7}
        >
          <Text style={[styles.toggleText, period === 7 && styles.toggleTextActive]}>7 {t.toggleDays}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleBtn, period === 30 && styles.toggleBtnActive]}
          onPress={() => setPeriod(30)}
          activeOpacity={0.7}
        >
          <Text style={[styles.toggleText, period === 30 && styles.toggleTextActive]}>30 {t.toggleDays}</Text>
        </TouchableOpacity>
      </View>

      {period === 7 ? (
        <>
          <MetricSelector
            metrics={METRICS}
            activeKey={activeMetricKey}
            onSelect={setActiveMetricKey}
            t={t}
          />

          <View style={styles.chartCard}>
            <View style={[styles.metricBadge, { backgroundColor: activeMetric.colorFrom + '22' }]}>
              <Text style={[styles.metricBadgeText, { color: activeMetric.colorFrom }]}>
                {activeMetric.emoji}{' '}
                {t[activeMetric.labelKey] || activeMetric.fallbackLabel}
                {activeMetric.inverted ? `  ↓ ${t.lowerIsBetter || 'lower is better'}` : ''}
              </Text>
            </View>

            <MetricChart days={days} metric={activeMetric} avg={metricAvg} />

            <View style={styles.dayLabels}>
              {days.map((d, i) => (
                <Text key={i} style={[styles.dayLabel, i === days.length - 1 && styles.dayLabelToday]}>
                  {d.dayLabel}
                </Text>
              ))}
            </View>

            {metricAvg !== null && (
              <View style={styles.avgLegend}>
                <View style={[styles.avgDash, { backgroundColor: activeMetric.colorFrom }]} />
                <Text style={[styles.avgLegendText, { color: activeMetric.colorFrom }]}>
                  {t.average || 'Average'}{' '}{activeMetric.formatValue(metricAvg)}
                </Text>
                {activeMetric.targetLine && (
                  <>
                    <View style={[styles.avgDash, { backgroundColor: 'rgba(255,255,255,0.3)', marginLeft: 12 }]} />
                    <Text style={[styles.avgLegendText, { color: 'rgba(255,255,255,0.4)' }]}>
                      {t.target || 'Target'}{' '}{activeMetric.targetLine}L
                    </Text>
                  </>
                )}
              </View>
            )}
          </View>

          <MetricInsightCard metricKey={activeMetricKey} days={days} t={t} />
        </>
      ) : (
        <View style={styles.chartCard}>
          <View style={styles.calendarGrid}>
            {days.map((day, i) => {
              const color = day.score > 0 ? getColor(day.score) : '#1a1a2e';
              const borderColor = day.isToday ? '#a78bfa' : 'transparent';
              return (
                <View key={i} style={[styles.calendarCell, { backgroundColor: color, borderColor }]}>
                  <Text style={styles.calendarDay}>{day.dayNum}</Text>
                  {day.score > 0 && <Text style={styles.calendarScore}>{day.score}</Text>}
                </View>
              );
            })}
          </View>
        </View>
      )}

      <View style={styles.statsRow}>
        <StatCard
          label={t.average}
          value={getAverage(days)}
          emoji="📊"
          valueColor={period === 7 && activeMetricKey === 'total' ? activeMetric.colorFrom : undefined}
        />
        <StatCard label={t.maximum}    value={getMax(days)}              emoji="🏆" />
        <StatCard label={t.daysLogged} value={getDaysLogged(days, period)} emoji="🔥" />
      </View>

      <Text style={styles.sectionTitle}>{t.detailedHistory}</Text>
      {(() => {
        const locale = getLocale(lang);
        const logged = days.filter(d => d.score > 0).reverse();
        const showMonthHeaders = period === 30;
        let lastMonthKey = null;
        const rendered = [];
        logged.forEach((day, i) => {
          if (showMonthHeaders) {
            const d = new Date(day.date);
            const monthKey = `${d.getFullYear()}-${d.getMonth()}`;
            if (monthKey !== lastMonthKey) {
              lastMonthKey = monthKey;
              const monthLabel = d.toLocaleDateString(locale, { month: 'long', year: 'numeric' });
              rendered.push(
                <Text key={`mh-${monthKey}`} style={styles.monthHeader}>{monthLabel}</Text>
              );
            }
          }
          rendered.push(
            <View key={`day-${day.date}-${i}`} style={styles.historyRow}>
              <Text style={styles.historyEmoji}>{getEmoji(day.score)}</Text>
              <View style={styles.historyInfo}>
                <Text style={styles.historyDate}>{day.fullLabel}</Text>
                <Text style={styles.historyDetails}>
                  😴 {day.sleepHours}h  ✨ {day.sleepQuality}/5  ⚡ {day.energy}/10
                </Text>
                <Text style={styles.historyDetails}>
                  💧 {day.hydration}L  🧠 {t.stress ? t.stress.toLowerCase() : 'stress'} {day.stress}/10
                </Text>
                {day.note ? (
                  <Text style={styles.historyNote}>&ldquo;{day.note}&rdquo;</Text>
                ) : null}
              </View>
              <Text style={[styles.historyScore, { color: getColor(day.score) }]}>
                {day.score}
              </Text>
            </View>
          );
        });
        return rendered;
      })()}

      {days.filter(d => d.score > 0).length === 0 && (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>{t.noEntries}</Text>
        </View>
      )}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

function MetricSelector({ metrics, activeKey, onSelect, t }) {
  return (
    <View style={styles.selectorWrap}>
      {metrics.map(m => {
        const isActive = m.key === activeKey;
        return (
          <TouchableOpacity
            key={m.key}
            style={[
              styles.selectorBtn,
              isActive && { backgroundColor: m.colorFrom, borderColor: m.colorFrom },
            ]}
            onPress={() => onSelect(m.key)}
            activeOpacity={0.75}
          >
            <Text style={styles.selectorEmoji}>{m.emoji}</Text>
            <Text style={[styles.selectorLabel, isActive && styles.selectorLabelActive]}>
              {t[m.labelKey] || m.fallbackLabel}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function MetricChart({ days, metric, avg }) {
  const { key, colorFrom, colorTo, formatValue, inverted, targetLine } = metric;
  const rawVals = days.map(d => getMetricValue(d, key)).filter(v => v !== null);
  const { scaleMin, scaleMax, yLabels } = computeScale(rawVals, metric);
  const scaleRange = Math.max(scaleMax - scaleMin, 0.01);

  const points = days.map((d, i) => {
    const rawVal = getMetricValue(d, key);
    const val = rawVal !== null
      ? (inverted ? scaleMax - rawVal + scaleMin : rawVal)
      : null;
    const x = PADDING_LEFT + (i / (days.length - 1)) * INNER_W;
    const y = val !== null
      ? PADDING_TOP + INNER_H - (Math.min(Math.max(val - scaleMin, 0), scaleRange) / scaleRange) * INNER_H
      : null;
    return { x, y, rawVal, isToday: i === days.length - 1 };
  });

  const validPoints = points.filter(p => p.y !== null);

  if (validPoints.length === 0) {
    return (
      <Svg width={CHART_WIDTH} height={CHART_HEIGHT}>
        <SvgText x={CHART_WIDTH / 2} y={CHART_HEIGHT / 2} fill="#444" fontSize="13" textAnchor="middle">
          No data
        </SvgText>
      </Svg>
    );
  }

  const linePath = validPoints.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = validPoints[i - 1];
    const cpX  = (prev.x + p.x) / 2;
    return `${acc} C ${cpX} ${prev.y} ${cpX} ${p.y} ${p.x} ${p.y}`;
  }, '');

  const bottomY  = PADDING_TOP + INNER_H;
  const areaPath = `${linePath} L ${validPoints[validPoints.length - 1].x} ${bottomY} L ${validPoints[0].x} ${bottomY} Z`;

  const avgY = avg !== null
    ? (() => {
        const val = inverted ? scaleMax - avg + scaleMin : avg;
        return PADDING_TOP + INNER_H - (Math.min(Math.max(val - scaleMin, 0), scaleRange) / scaleRange) * INNER_H;
      })()
    : null;

  const targetY = targetLine != null
    ? PADDING_TOP + INNER_H - (Math.min(Math.max(targetLine - scaleMin, 0), scaleRange) / scaleRange) * INNER_H
    : null;

  const gradLineId = `lineGrad_${key}`;

  return (
    <Svg width={CHART_WIDTH} height={CHART_HEIGHT}>
      <Defs>
        <LinearGradient id={gradLineId} x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0%"   stopColor={colorFrom} />
          <Stop offset="100%" stopColor={colorTo}   />
        </LinearGradient>
      </Defs>

      {yLabels.map(val => {
        const displayVal = inverted ? scaleMax - val + scaleMin : val;
        const y = PADDING_TOP + INNER_H - ((val - scaleMin) / scaleRange) * INNER_H;
        return (
          <SvgText key={`l-${val}`} x={PADDING_LEFT - 6} y={y + 4} fill="#444" fontSize="9" textAnchor="end">
            {formatValue(displayVal)}
          </SvgText>
        );
      })}
      {yLabels.map(val => {
        const y = PADDING_TOP + INNER_H - ((val - scaleMin) / scaleRange) * INNER_H;
        return (
          <Line key={`g-${val}`} x1={PADDING_LEFT} y1={y} x2={PADDING_LEFT + INNER_W} y2={y}
            stroke="#1e1e3e" strokeWidth="1" />
        );
      })}

      <Path d={areaPath} fill={colorFrom} fillOpacity={0.28} />

      {targetY !== null && (
        <>
          <Line
            x1={PADDING_LEFT} y1={targetY}
            x2={PADDING_LEFT + INNER_W} y2={targetY}
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="1"
            strokeDasharray="3,3"
          />
          <SvgText x={PADDING_LEFT + INNER_W + 2} y={targetY + 4}
            fill="rgba(255,255,255,0.35)" fontSize="8">
            {targetLine}L
          </SvgText>
        </>
      )}

      {avgY !== null && (
        <>
          <Line
            x1={PADDING_LEFT} y1={avgY}
            x2={PADDING_LEFT + INNER_W} y2={avgY}
            stroke={colorFrom} strokeWidth="1.5" strokeDasharray="5,4"
          />
          <SvgText x={PADDING_LEFT + INNER_W + 2} y={avgY + 4}
            fill={colorFrom} fontSize="9">
            {formatValue(avg)}
          </SvgText>
        </>
      )}

      <Path d={linePath} fill="none" stroke={`url(#${gradLineId})`}
        strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

      {validPoints.map((p, i) => (
        <Circle key={`c-${i}`} cx={p.x} cy={p.y}
          r={p.isToday ? 6 : 3.5}
          fill={p.isToday ? colorTo : colorFrom}
          stroke={p.isToday ? '#fff' : 'none'}
          strokeWidth={p.isToday ? 2 : 0}
        />
      ))}

      {points[points.length - 1].y !== null && (
        <SvgText
          x={points[points.length - 1].x}
          y={points[points.length - 1].y - 12}
          fill={colorTo} fontSize="11" fontWeight="bold" textAnchor="middle"
        >
          {formatValue(points[points.length - 1].rawVal)}
        </SvgText>
      )}
    </Svg>
  );
}

function MetricInsightCard({ metricKey, days, t }) {
  const insight = getInsight(metricKey, days, t);
  if (!insight) return null;
  const { icon, message, sub, color } = insight;
  const bg = color + '18';
  return (
    <View style={[styles.insightCard, { borderColor: color + '59', backgroundColor: bg }]}>
      <Text style={styles.insightIcon}>{icon}</Text>
      <View style={styles.insightBody}>
        <Text style={[styles.insightMessage, { color }]} numberOfLines={2} adjustsFontSizeToFit>
          {message}
        </Text>
        {!!sub && <Text style={styles.insightSub}>{sub}</Text>}
      </View>
    </View>
  );
}

function getInsight(metricKey, days, t) {
  switch (metricKey) {
    case 'sleepHours': return getSleepInsight(days, t);
    case 'energy':     return getEnergyInsight(days, t);
    case 'hydration':  return getHydrationInsight(days, t);
    case 'stress':     return getStressInsight(days, t);
    case 'total':      return getScoreInsight(days, t);
    default:           return null;
  }
}

function validNums(days, field) {
  return days.map(d => {
    const v = field === 'score' ? d.score : d[field];
    if (v === '-' || v === undefined || v === null) return null;
    const n = parseFloat(v);
    return isNaN(n) ? null : n;
  }).filter(v => v !== null);
}
function pctChange(prev, curr) {
  if (!prev) return 0;
  return ((curr - prev) / prev) * 100;
}

function getSleepInsight(days, t) {
  const vals = validNums(days, 'sleepHours');
  if (vals.length < 2) return null;
  const today = vals[vals.length - 1];
  const prev  = vals[vals.length - 2];
  const diff  = today - prev;
  const pct   = pctChange(prev, today);
  if (diff > 0) {
    return { icon: '🌙', color: '#059669',
      message: t.sleepUp || 'Good rest this week 🌙',
      sub: `${today}h vs ${prev}h yesterday` };
  }
  if (diff === 0) {
    return { icon: '😌', color: '#9F7AEA',
      message: t.sleepEqual || 'Consistent sleep 🌙',
      sub: `${today}h — steady` };
  }
  if (Math.abs(pct) < 10) {
    return { icon: '😌', color: '#9F7AEA',
      message: t.sleepSmall || 'Slightly shorter sleep',
      sub: `${today}h vs ${prev}h — within range` };
  }
  if (Math.abs(pct) < 20) {
    return { icon: '🌙', color: '#D97706',
      message: t.sleepMedium || 'Your body would appreciate more rest',
      sub: `${today}h — try to reach ${prev}h` };
  }
  return { icon: '🫶', color: '#F43F5E',
    message: t.sleepLarge || 'Sleep deficit — take it easy today',
    sub: `${today}h — ${(prev - today).toFixed(1)}h less than usual` };
}

function getEnergyInsight(days, t) {
  const vals = validNums(days, 'energy');
  if (vals.length < 2) return null;
  const today = vals[vals.length - 1];
  const prev  = vals[vals.length - 2];
  const pct   = pctChange(prev, today);
  if (pct > 5) {
    return { icon: '⚡', color: '#059669',
      message: t.energyUp || 'Energetic week ⚡ Keep it up!',
      sub: `Energy ${today}/10 vs ${prev}/10 yesterday` };
  }
  if (Math.abs(pct) <= 5) {
    return { icon: '🔋', color: '#D97706',
      message: t.energyStable || 'Steady energy',
      sub: `${today}/10 — consistent level` };
  }
  if (Math.abs(pct) < 10) {
    return { icon: '😮‍💨', color: '#D97706',
      message: t.energySmall || 'Energy slightly lower',
      sub: `${today}/10 vs ${prev}/10 — normal range` };
  }
  if (Math.abs(pct) < 20) {
    return { icon: '🌤', color: '#B45309',
      message: t.energyMedium || 'A tiring day — it happens',
      sub: `Energy ${today}/10 — give yourself a break` };
  }
  return { icon: '🌥', color: '#EA580C',
    message: t.energyLarge || 'Low energy today',
    sub: `${today}/10 — hydration and light movement help` };
}

function getHydrationInsight(days, t) {
  const vals = validNums(days, 'hydration');
  if (!vals.length) return null;
  const today = vals[vals.length - 1];
  if (today < 1.5) {
    return { icon: '💧', color: '#0369A1',
      message: t.hydrationInsightLow || 'Low hydration 💧 Your body feels it',
      sub: `${today}L today — try to drink more often` };
  }
  if (today < 2.0) {
    return { icon: '💧', color: '#0284C7',
      message: t.hydrationInsightMedium || 'Close to target — one more glass!',
      sub: `${today}L of 2L recommended` };
  }
  if (today < 2.5) {
    return { icon: '💧', color: '#0891B2',
      message: t.hydrationInsightGood || 'Optimal hydration — recommended range',
      sub: `${today}L — within range` };
  }
  return { icon: '💧', color: '#059669',
    message: t.hydrationInsightGreat || 'Excellent hydration this week! 💧',
    sub: `${today}L — above the 2.5L target` };
}

function getStressInsight(days, t) {
  const vals = validNums(days, 'stress');
  if (!vals.length) return null;
  const today    = vals[vals.length - 1];
  const prev     = vals.length >= 2 ? vals[vals.length - 2] : null;
  const highDays = vals.filter(v => v > 7).length;
  if (highDays >= 3) {
    return { icon: '🧘', color: '#F43F5E',
      message: t.stressPersistent || 'Intense week — what helps you unwind?',
      sub: `High stress ${highDays} days of ${vals.length}` };
  }
  if (prev !== null && today < prev) {
    return { icon: '🌱', color: '#059669',
      message: t.stressDown || 'Stress decreasing — real progress 🌱',
      sub: `${today}/10 vs ${prev}/10 yesterday` };
  }
  if (prev !== null && today > prev) {
    return { icon: '🌬', color: '#F43F5E',
      message: t.stressUp || 'Tenser period — normal, it passes',
      sub: `Stress ${today}/10 — try a short break` };
  }
  if (today > 7) {
    return { icon: '😮‍💨', color: '#F43F5E',
      message: t.stressHigh || 'Moderate to high — mind the signals',
      sub: `Stress ${today}/10 — prioritize rest` };
  }
  if (today >= 5) {
    return { icon: '😐', color: '#D97706',
      message: t.stressMedium || 'Moderate level — mind the signals',
      sub: `Stress ${today}/10` };
  }
  return { icon: '🧘', color: '#059669',
    message: t.stressLow || 'Balanced week 🧘',
    sub: `Stress ${today}/10 — optimal level` };
}

function getScoreInsight(days, t) {
  const scored = days.filter(d => d.score > 0);
  if (scored.length < 2) return null;
  const scores   = scored.map(d => d.score);
  const today    = scores[scores.length - 1];
  const first    = scores[0];
  const trendPct = pctChange(first, today);
  if (trendPct > 5) {
    return { icon: '☀️', color: '#059669',
      message: t.scoreUp || 'Trending up since the start of the week',
      sub: `${first} → ${today} — real progress` };
  }
  if (trendPct < -10) {
    return { icon: '🌧️', color: '#D97706',
      message: t.scoreDownMedium || 'A few tough days — what changed?',
      sub: `${first} → ${today} — check sleep and hydration` };
  }
  if (trendPct < -3) {
    return { icon: '⛅', color: '#7C3AED',
      message: t.scoreDownSmall || 'Nothing to worry about 😌',
      sub: `${first} → ${today}` };
  }
  if (Math.abs(trendPct) <= 3) {
    return { icon: '🌤️', color: '#7C3AED',
      message: t.scoreStable || 'Stable week — consistent rhythm',
      sub: `${first} → ${today}` };
  }
  if (today < 50) {
    return { icon: '🫂', color: '#F43F5E',
      message: t.scoreLow || 'Rough week — you are human, it is ok',
      sub: `Score ${today} — one step at a time` };
  }
  if (today < 65) {
    return { icon: '🌤', color: '#D97706',
      message: t.scoreMedium || 'Below your average — what to improve today?',
      sub: `Score ${today} — try a small goal` };
  }
  if (today < 80) {
    return { icon: '💪', color: '#7C3AED',
      message: t.scoreGood || 'Solid week — keep going',
      sub: `Score ${today} — on the right track` };
  }
  return { icon: '🏆', color: '#059669',
    message: t.scoreExcellent || 'Excellent week 🏆 Top form!',
    sub: `Score ${today} — keep the rhythm` };
}

function StatCard({ label, value, emoji, valueColor }) {
  return (
    <View style={styles.statCard}>
      <View style={styles.statEmojiSlot}>
        {!!emoji && <Text style={styles.statEmoji}>{emoji}</Text>}
      </View>
      <Text style={[styles.statValue, valueColor ? { color: valueColor } : {}]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function getLocale(lang) {
  const map = { ro: 'ro-RO', fr: 'fr-FR', de: 'de-DE', es: 'es-ES', it: 'it-IT', pt: 'pt-PT', zh: 'zh-CN' };
  return map[lang] || 'en-US';
}
function getTodayLabel(lang) {
  const labels = { ro: 'Azi', en: 'Today', fr: 'Auj.', de: 'Heute', es: 'Hoy', it: 'Oggi', pt: 'Hoje', zh: '今天' };
  return labels[lang] || 'Today';
}
function getShortDayNames(lang) {
  const names = {
    ro: ['Du', 'Lu', 'Ma', 'Mi', 'Jo', 'Vi', 'Sâ'],
    en: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    fr: ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],
    de: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
    es: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
    it: ['Do', 'Lu', 'Ma', 'Me', 'Gi', 'Ve', 'Sa'],
    pt: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sá'],
    zh: ['日', '一', '二', '三', '四', '五', '六'],
  };
  return names[lang] || names['en'];
}

function getLastNDays(history, lang, n = 7) {
  const days     = [];
  const dayNames = getShortDayNames(lang);
  const todayLbl = getTodayLabel(lang);
  const locale   = getLocale(lang);
  for (let i = n - 1; i >= 0; i--) {
    const d   = new Date();
    d.setDate(d.getDate() - i);
    const key   = d.toISOString().split('T')[0];
    const entry = history.find(e => e.date === key);
    days.push({
      date:         key,
      dayLabel:     i === 0 ? todayLbl : dayNames[d.getDay()],
      dayNum:       d.getDate(),
      isToday:      i === 0,
      fullLabel:    d.toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'short' }),
      score:        entry ? entry.score.total : 0,
      sleepHours:   entry ? entry.inputs.sleepHours : '-',
      sleepQuality: entry ? entry.inputs.sleepQuality : '-',
      energy:       entry ? entry.inputs.energy : '-',
      hydration:    entry ? (entry.inputs.hydration || '-') : '-',
      stress:       entry ? (entry.inputs.stress || '-') : '-',
      note:         entry && typeof entry.note === 'string' ? entry.note : '',
    });
  }
  return days;
}

function getColor(score) {
  if (!score) return '#2a2a3e';
  if (score >= 85) return '#00C896';
  if (score >= 70) return '#4CAF50';
  if (score >= 55) return '#FFC107';
  if (score >= 40) return '#FF9800';
  return '#F44336';
}

function getEmoji(score) {
  if (score >= 85) return '⚡';
  if (score >= 70) return '🌤';
  if (score >= 55) return '🌥';
  if (score >= 40) return '🌧';
  return '⛈';
}

function getAverage(days) {
  const logged = days.filter(d => d.score > 0);
  if (!logged.length) return '-';
  return Math.round(logged.reduce((s, d) => s + d.score, 0) / logged.length);
}
function getMax(days) {
  const logged = days.filter(d => d.score > 0);
  if (!logged.length) return '-';
  return Math.max(...logged.map(d => d.score));
}
function getDaysLogged(days, total) {
  return days.filter(d => d.score > 0).length + '/' + total;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#12121f' },
  content:   { padding: 20, paddingTop: Platform.OS === 'ios' ? 60 : 30 },

  title: { fontSize: 22, fontWeight: '700', color: '#e0e0f0', marginBottom: 16 },

  seedBtn:     { backgroundColor: '#6C63FF', padding: 10, borderRadius: 10, marginBottom: 12 },
  seedBtnText: { color: '#fff', textAlign: 'center', fontWeight: '700' },

  toggleRow:       { flexDirection: 'row', marginBottom: 16, backgroundColor: '#0f0f1e', borderRadius: 12, padding: 3 },
  toggleBtn:       { flex: 1, paddingVertical: 10, borderRadius: 10, alignItems: 'center' },
  toggleBtnActive: { backgroundColor: '#2d1f7a' },
  toggleText:      { fontSize: 14, fontWeight: '600', color: '#666' },
  toggleTextActive:{ color: '#fff' },

  selectorWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 12 },
  selectorBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 10, paddingVertical: 7,
    borderRadius: 20, borderWidth: 1.5,
    borderColor: '#2a2a3e', backgroundColor: '#1a1a2e',
  },
  selectorEmoji:       { fontSize: 14 },
  selectorLabel:       { fontSize: 12, color: '#666', fontWeight: '600' },
  selectorLabelActive: { color: '#fff' },

  chartCard:       { backgroundColor: '#1a1a2e', borderRadius: 20, padding: 16, marginBottom: 16, alignItems: 'center' },
  metricBadge:     { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, marginBottom: 10 },
  metricBadgeText: { fontSize: 11, fontWeight: '700' },

  dayLabels:     { flexDirection: 'row', justifyContent: 'space-between', width: CHART_WIDTH, paddingHorizontal: PADDING_LEFT - 8, marginTop: 4 },
  dayLabel:      { fontSize: 11, color: '#555', flex: 1, textAlign: 'center' },
  dayLabelToday: { color: '#FFB347', fontWeight: '700' },

  avgLegend:     { flexDirection: 'row', alignItems: 'center', marginTop: 10, alignSelf: 'flex-start', paddingLeft: 8, flexWrap: 'wrap', gap: 4 },
  avgDash:       { width: 20, height: 2, marginRight: 6, borderRadius: 1 },
  avgLegendText: { fontSize: 11 },

  calendarGrid:  { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', gap: 6 },
  calendarCell:  { width: 42, height: 42, borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 2 },
  calendarDay:   { fontSize: 10, color: '#888', fontWeight: '600' },
  calendarScore: { fontSize: 11, color: '#fff', fontWeight: '700' },

  statsRow:      { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  statCard:      { flex: 1, backgroundColor: '#1a1a2e', borderRadius: 14, padding: 14, alignItems: 'center', marginHorizontal: 4 },
  statEmojiSlot: { height: 28, justifyContent: 'center', alignItems: 'center', marginBottom: 2 },
  statEmoji:     { fontSize: 20 },
  statValue:     { fontSize: 22, fontWeight: '800', color: '#e0e0f0' },
  statLabel:     { fontSize: 11, color: '#666', marginTop: 2 },

  insightCard:    { flexDirection: 'row', alignItems: 'center', borderRadius: 14, padding: 14, marginBottom: 16, borderWidth: 1.5 },
  insightIcon:    { fontSize: 26, marginRight: 12 },
  insightBody:    { flex: 1 },
  insightMessage: { fontSize: 14, fontWeight: '700', marginBottom: 3 },
  insightSub:     { fontSize: 12, color: '#888', lineHeight: 17 },

  sectionTitle: { fontSize: 14, fontWeight: '600', color: '#666', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 },
  monthHeader:  { fontSize: 13, fontWeight: '700', color: '#a78bfa', marginTop: 14, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1.2 },

  historyRow:     { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1a1a2e', borderRadius: 14, padding: 14, marginBottom: 10 },
  historyEmoji:   { fontSize: 28, marginRight: 12 },
  historyInfo:    { flex: 1 },
  historyDate:    { fontSize: 14, fontWeight: '600', color: '#e0e0f0', textTransform: 'capitalize' },
  historyDetails: { fontSize: 12, color: '#666', marginTop: 3 },
  historyScore:   { fontSize: 28, fontWeight: '800' },
  historyNote:    { fontSize: 12, color: '#a78bfa', marginTop: 6, fontStyle: 'italic', lineHeight: 18 },

  emptyCard: { backgroundColor: '#1a1a2e', borderRadius: 14, padding: 30, alignItems: 'center' },
  emptyText: { color: '#666', textAlign: 'center', lineHeight: 24, fontSize: 14 },
});
