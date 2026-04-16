/**
 * BodyWeather — ScoreEngine
 * Calculează scorul zilnic (0–100) pe baza inputurilor manuale.
 */

const WEIGHTS = {
  sleepHours:   0.30,
  sleepQuality: 0.20,
  energy:       0.25,
  hydration:    0.15,
  stress:       0.10,
};

function scoreSleepHours(hours) {
  if (hours <= 0) return 0;
  if (hours >= 7 && hours <= 9) return 100;
  if (hours < 7) return Math.max(0, 100 - (7 - hours) * 18);
  return Math.max(0, 100 - (hours - 9) * 12);
}

function scoreSleepQuality(quality) {
  return ((quality - 1) / 4) * 100;
}

function scoreEnergy(energy) {
  return ((energy - 1) / 9) * 100;
}

/** Hidratare: optim 2–3L */
function scoreHydration(liters) {
  if (liters <= 0) return 0;
  if (liters >= 2 && liters <= 3) return 100;
  if (liters < 2) return Math.max(0, liters * 50);
  return Math.max(0, 100 - (liters - 3) * 30);
}

/** Stres: 1=fără stres (bine), 10=stres maxim (rău) */
function scoreStress(stress) {
  return Math.max(0, 100 - ((stress - 1) / 9) * 100);
}

export function calculateScore({
  sleepHours,
  sleepQuality,
  energy,
  hydration = 2,
  stress = 5,
  streakDays = 1,
}) {
  const s_hours     = scoreSleepHours(sleepHours);
  const s_quality   = scoreSleepQuality(sleepQuality);
  const s_energy    = scoreEnergy(energy);
  const s_hydration = scoreHydration(hydration);
  const s_stress    = scoreStress(stress);

  const total = Math.round(
    s_hours     * WEIGHTS.sleepHours +
    s_quality   * WEIGHTS.sleepQuality +
    s_energy    * WEIGHTS.energy +
    s_hydration * WEIGHTS.hydration +
    s_stress    * WEIGHTS.stress
  );

  return {
    total,
    breakdown: {
      sleepHours:   Math.round(s_hours),
      sleepQuality: Math.round(s_quality),
      energy:       Math.round(s_energy),
      hydration:    Math.round(s_hydration),
      stress:       Math.round(s_stress),
    },
    ...getLabel(total),
  };
}

function getLabel(score) {
  if (score >= 85) return { labelKey: 'excellent', emoji: '⚡', color: '#00C896' };
  if (score >= 70) return { labelKey: 'good',      emoji: '🌤', color: '#4CAF50' };
  if (score >= 55) return { labelKey: 'moderate',   emoji: '🌥', color: '#FFC107' };
  if (score >= 40) return { labelKey: 'difficult',  emoji: '🌧', color: '#FF9800' };
  return                  { labelKey: 'difficult',  emoji: '⛈',  color: '#F44336' };
}