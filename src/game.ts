import chalk from "chalk";
import readline from "readline-sync";
import { sceneIntro, sceneChoice, sceneRoar, scenePropulsors, sceneAttack, sceneEscapeSuccess, sceneDefeat } from "./engine/scenes.js";
import { askAI } from "./engine/aiHelper.js";
import { calcPoderBase, canLaunch, ThrusterState } from "./logic/thrusters.js";
import { computeDistanceFlow } from "./logic/distance.js";
import { generateSecurityCode } from "./logic/securityCode";
import { launchSequence } from "./logic/launch.js";
import { superChargeAttack } from "./logic/enemy.js";
import { HYDRO_PROPULSOR, POTENCIA_SISTEMA } from "./config/constants.js";

export async function runGame(): Promise<void> {
  sceneIntro();

  const start = sceneChoice("¿Iniciar misión?", ["Sí", "No"]);
  if (start === "No") {
    console.log(chalk.gray("Misión abortada."));
    return;
  }

  sceneRoar();

  console.log(chalk.yellow("\nEstado de propulsores (true/false):"));
  const leftOK = readline.question(chalk.gray("¿Propulsor IZQUIERDO operativo? (s/n): ")).toLowerCase().startsWith("s");
  const rightOK = readline.question(chalk.gray("¿Propulsor DERECHO operativo? (s/n): ")).toLowerCase().startsWith("s");
  const thrusters: ThrusterState = { leftOK, rightOK };

  // Regla de fallo total
  if (!leftOK && !rightOK) {
    console.log(chalk.red("\nAmbos propulsores fuera de servicio. No hay despegue."));
    sceneAttack();
    superChargeAttack();
    sceneDefeat();
    return;
  }

  // IA aliada disponible
  const wantAI = sceneChoice("¿Pedir consejo a la IA aliada?", ["Sí", "No"]);
  if (wantAI === "Sí") {
    // distancia inicial rápida (placeholder 0) — luego se actualizará
    askAI({ bothThrustersOK: leftOK && rightOK, rightOK, leftOK, distanceMeters: 0 });
  }

  // Cálculos de potencia
  const poderBase = calcPoderBase();
  console.log(chalk.gray(`[Cálculo] hidroPropulsor=${HYDRO_PROPULSOR}, potencia=${POTENCIA_SISTEMA}, poderBase=${poderBase}`));

  const launchCheck = canLaunch(poderBase, thrusters);
  console.log(launchCheck.reason);

  const path = sceneChoice("Elige tu ruta", ["Intentar escape", "Enfrentar a The Killer"]);
  if (path === "Enfrentar a The Killer") {
    // Combate sencillo
    sceneAttack();
    // Resultado simplificado: si no podías despegar, probablemente pierdes; si podías, 50/50
    if (!launchCheck.ok || Math.random() < 0.5) {
      sceneDefeat();
    } else {
      console.log(chalk.green("Has resistido el ataque y logras reposicionarte para un escape posterior."));
      sceneEscapeSuccess();
    }
    return;
  }

  // Ruta: Intentar escape
  // 1) Verificar potencia
  if (!launchCheck.ok) {
    console.log(chalk.red("No alcanzas los requisitos de potencia. El enemigo aprovecha."));
    sceneAttack();
    sceneDefeat();
    return;
  }

  // 2) Distancia y sigilo
  const dist = computeDistanceFlow();

  // Posible segundo consejo de IA ahora con distancia real
  if (wantAI === "Sí") {
    askAI({ bothThrustersOK: leftOK && rightOK, rightOK, leftOK, distanceMeters: dist });
  }

  // 3) Código de iniciación
  const code = generateSecurityCode();
  if (code.length < 10) {
    console.log(chalk.red("Fallo en código de iniciación."));
    sceneDefeat();
    return;
  }

  // 4) Secuencia de lanzamiento
  scenePropulsors();
  await launchSequence();

  // Final
  sceneEscapeSuccess();
}
