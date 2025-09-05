import chalk from "chalk";
import { LAUNCH_SIM_SECONDS_TOTAL, LAUNCH_TIME_SCALE, TICK_SIM_SECONDS, MS_PER_SECOND } from "../config/constants.js";
import { SFX } from "../engine/audio.js";

function sleep(ms: number) {
  return new Promise<void>(resolve => setTimeout(resolve, ms));
}

export async function launchSequence(): Promise<void> {
  console.log(chalk.green("\nIniciando secuencia de despegue..."));
  SFX.rocket();

  const realTickMs = (TICK_SIM_SECONDS / LAUNCH_TIME_SCALE) * MS_PER_SECOND;
  let elapsedSim = 0;
  while (elapsedSim < LAUNCH_SIM_SECONDS_TOTAL) {
    await sleep(realTickMs);
    elapsedSim += TICK_SIM_SECONDS;
    const pct = Math.min(100, Math.round((elapsedSim / LAUNCH_SIM_SECONDS_TOTAL) * 100));
    console.log(chalk.gray(`[Lanzamiento] t_sim=${elapsedSim}s  progreso=${pct}%`));
  }

  console.log(chalk.greenBright("Despegue completo."));
}
