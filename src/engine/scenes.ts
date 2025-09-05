import chalk from "chalk";
import readline from "readline-sync";
import { SFX } from "./audio.js";

export function sceneIntro(): void {
  console.log(chalk.yellowBright(`
   ___       _       _                 _           _           _           
  / __| __ _| |_ ___| |__  _  _  ___  | |__  _  _ | |__  _ _  (_)__  ___   
  \\__ \\/ _\` |  _/ -_) '_ \\| || |/ _ \\ | '_ \\| || || '_ \\| ' \\ | / _|/ -_)  
  |___/\\__,_|\\__\\___|_.__/ \\_, |\\___/ |_.__/ \\_,_||_.__/|_||_|/ \\__|\\___|  
                           |__/                              |__/           
  `));
  console.log(chalk.white("Soldados, Godzilla (‘The Killer’) ha despertado. La humanidad depende de su decisión."));
  SFX.roar();
}

export function sceneChoice<T extends string>(title: string, options: T[]): T {
  console.log(chalk.magentaBright(`\n${title}`));
  options.forEach((opt, ix) => console.log(chalk.magenta(`[${ix + 1}] ${opt}`)));
  const choice = readline.questionInt(chalk.gray("Selecciona una opción: "));
  const idx = choice - 1;
  if (idx < 0 || idx >= options.length) {
    console.log(chalk.red("Opción inválida. Intenta de nuevo."));
    return sceneChoice(title, options);
  }
  return options[idx];
}

export function sceneRoar(): void {
  console.log(chalk.redBright("\n¡The Killer ruge al ser avistado!"));
  SFX.roar();
}

export function scenePropulsors(): void {
  console.log(chalk.greenBright("\nActivando propulsores..."));
  SFX.rocket();
}

export function sceneAttack(): void {
  console.log(chalk.red("\nEl enemigo lanza un ataque devastador..."));
  SFX.attack();
}

export function sceneEscapeSuccess(): void {
  console.log(chalk.greenBright("\n¡Escape exitoso! La humanidad tiene otra oportunidad."));
}

export function sceneDefeat(): void {
  console.log(chalk.redBright("\nDerrota. The Killer ha superado nuestras defensas."));
}
