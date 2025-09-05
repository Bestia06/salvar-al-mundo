import chalk from "chalk";

export function askAI(context: {
  bothThrustersOK: boolean;
  rightOK: boolean;
  leftOK: boolean;
  distanceMeters: number;
}) {
  console.log(chalk.cyan("\n[IA Aliada] Analizando situación..."));

  if (!context.leftOK && !context.rightOK) {
    console.log(chalk.cyan("Sugerencia: ambos propulsores fallan; evitar combate directo. Buscar cobertura."));
    return;
  }

  if (context.distanceMeters < 450) {
    console.log(chalk.cyan("Sugerencia: aumentar distancia antes del despegue para evitar detección."));
  } else {
    console.log(chalk.cyan("Sugerencia: la distancia parece razonable. Priorizar despegue si se cumplen umbrales."));
  }

  if (context.bothThrustersOK) {
    console.log(chalk.cyan("Sugerencia: con ambos propulsores sanos, el umbral es menor. Acelera cuando esté listo."));
  } else {
    console.log(chalk.cyan("Sugerencia: con un solo propulsor, revisa la fórmula adicional antes de decidir."));
  }
}
