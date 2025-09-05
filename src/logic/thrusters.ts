import chalk from "chalk";
import {
  HYDRO_PROPULSOR,
  POTENCIA_SISTEMA,
  THRESHOLD_AMBOS_OK,
  THRESHOLD_BASE,
  RIGHT_EXP,
  RIGHT_DIVISOR,
  LEFT_EXP,
  LEFT_DIVISOR,
} from "../config/constants.js";

export type ThrusterState = { leftOK: boolean; rightOK: boolean };

export function calcPoderBase(): number {
  return HYDRO_PROPULSOR + POTENCIA_SISTEMA;
}

export function canLaunch(powerBase: number, state: ThrusterState): {
  ok: boolean;
  reason: string;
  thresholdApplied: number; // 0..1
} {
  const bothOK = state.leftOK && state.rightOK;
  const threshold = bothOK ? THRESHOLD_AMBOS_OK : THRESHOLD_BASE;

  // regla principal de umbral
  const needed = threshold * powerBase;

  // reglas especiales cuando sólo uno funciona:
  let extraOK = true;
  if (state.rightOK && !state.leftOK) {
    // requeridoDerecho = (0.90 ^ 4 / 2) * HYDRO_PROPULSOR
    const requeridoDerecho = Math.pow(THRESHOLD_BASE, RIGHT_EXP) / RIGHT_DIVISOR * HYDRO_PROPULSOR;
    extraOK = powerBase >= requeridoDerecho;
    console.log(chalk.gray(`[Cálculo] Requisito adicional DERECHO: ${requeridoDerecho.toFixed(2)}`));
  } else if (state.leftOK && !state.rightOK) {
    // requeridoIzquierdo = (0.90 ^ 2 / 3) * POTENCIA_SISTEMA
    const requeridoIzquierdo = Math.pow(THRESHOLD_BASE, LEFT_EXP) / LEFT_DIVISOR * POTENCIA_SISTEMA;
    extraOK = powerBase >= requeridoIzquierdo;
    console.log(chalk.gray(`[Cálculo] Requisito adicional IZQUIERDO: ${requeridoIzquierdo.toFixed(2)}`));
  }

  const ok = powerBase >= needed && extraOK;
  const msg = ok ? "Despegue autorizado" : "Fallo: potencia insuficiente";

  console.log(chalk.gray(`[Cálculo] Umbral ${bothOK ? "75%" : "90%"} → Necesario: ${needed.toFixed(2)} | PoderBase: ${powerBase}`));
  return { ok, reason: msg, thresholdApplied: threshold };
}
