import readline from "readline-sync";
import chalk from "chalk";
import {
  MIN_COORD,
  MAX_COORD,
  COORD_TO_METERS,
  DISTANCE_EXTRA_SCALE,
  STEALTH_LIMIT_METERS,
  ENEMY_STEP_METERS
} from "../config/constants.js";

function readUniqueCoord(name: string, current: Set<number>): number {
  const v = readline.questionInt(chalk.gray(`Ingresa ${name} [${MIN_COORD}-${MAX_COORD}]: `));
  if (v < MIN_COORD || v > MAX_COORD) {
    console.log(chalk.red(`Valor fuera de rango (${MIN_COORD}-${MAX_COORD}).`));
    return readUniqueCoord(name, current);
  }
  if (current.has(v)) {
    console.log(chalk.red("Todos los valores deben ser diferentes entre sí."));
    return readUniqueCoord(name, current);
  }
  current.add(v);
  return v;
}

export function computeDistanceFlow(): number {
  console.log(chalk.yellow("\nCoordenadas (todas distintas, entre 50 y 1000):"));
  const used = new Set<number>();
  const x1 = readUniqueCoord("X1", used);
  const y1 = readUniqueCoord("Y1", used);
  const x2 = readUniqueCoord("X2", used);
  const y2 = readUniqueCoord("Y2", used);

  // Escalar coordenadas por 100 (a metros)
  const X1m = x1 * COORD_TO_METERS;
  const Y1m = y1 * COORD_TO_METERS;
  const X2m = x2 * COORD_TO_METERS;
  const Y2m = y2 * COORD_TO_METERS;

  // Distancia por Pitágoras
  const dx = X2m - X1m;
  const dy = Y2m - Y1m;
  let dist = Math.sqrt(dx * dx + dy * dy);

  // Extra: multiplicar distancia por 100 según enunciado
  dist = dist * DISTANCE_EXTRA_SCALE;

  console.log(chalk.gray(`[Cálculo] Distancia inicial: ${Math.round(dist)} m`));

  // Regla de sigilo: iterar hasta dist ≥ 300 m
  while (dist < STEALTH_LIMIT_METERS) {
    console.log(chalk.cyan("Velo de invisibilidad activo. Ajustando posición para aumentar distancia..."));
    // Simular alejamiento del enemigo (sumamos paso en X y Y positivamente)
    const step = ENEMY_STEP_METERS;
    const X2mNew = X2m + step;
    const Y2mNew = Y2m + step;
    const dx2 = X2mNew - X1m;
    const dy2 = Y2mNew - Y1m;
    dist = Math.sqrt(dx2 * dx2 + dy2 * dy2) * DISTANCE_EXTRA_SCALE;
    console.log(chalk.gray(`[Cálculo] Nueva distancia: ${Math.round(dist)} m`));
  }

  console.log(chalk.green(`Distancia suficiente: ${Math.round(dist)} m (≥ ${STEALTH_LIMIT_METERS} m)`));
  return dist;
}
