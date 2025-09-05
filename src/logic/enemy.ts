import chalk from "chalk";
import {
  POWER_ATOMIC_BREATH,
  POWER_SPIRAL_RAY,
  POWER_TAIL_WHIP,
  SUPER_CHARGE_MULTIPLIER
} from "../config/constants.js";
import { SFX } from "../engine/audio.js";

export type Attack = "Aliento atómico" | "Rayo espiral" | "Golpe de cola";

const BASE_POWERS: Record<Attack, number> = {
  "Aliento atómico": POWER_ATOMIC_BREATH,
  "Rayo espiral": POWER_SPIRAL_RAY,
  "Golpe de cola": POWER_TAIL_WHIP
};

export function logAttackPowers(multiplier = 1): void {
  (Object.keys(BASE_POWERS) as Attack[]).forEach(a => {
    const base = BASE_POWERS[a];
    const applied = base * multiplier;
    console.log(chalk.gray(`[Poder] ${a}  base=${base}  aplicado=${applied}`));
  });
}

export function superChargeAttack(): void {
  console.log(chalk.redBright("\n¡SUPER CHARGE ACTIVADO! Poder x10"));
  logAttackPowers(SUPER_CHARGE_MULTIPLIER);
  SFX.attack();
}
