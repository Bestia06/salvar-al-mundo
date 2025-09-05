import player from "play-sound";
import fs from "fs";
import { AUDIO_ATTACK, AUDIO_ROAR, AUDIO_ROCKET } from "../config/constants.js";

const p = player({});

// Utilidad genérica
function playSafe(path: string, label: string) {
  try {
    if (!fs.existsSync(path)) {
      console.warn(`[Audio] Archivo no encontrado: ${path} (${label})`);
      return;
    }
    p.play(path, (err) => {
      if (err) console.warn(`[Audio] Error al reproducir ${label}:`, err.message);
    });
  } catch (e) {
    console.warn(`[Audio] Error inesperado en ${label}:`, (e as Error).message);
  }
}

export const SFX = {
  roar: () => playSafe(AUDIO_ROAR, "Rugido"),
  rocket: () => playSafe(AUDIO_ROCKET, "Propulsor/Despegue"),
  attack: () => playSafe(AUDIO_ATTACK, "Ataque"),
};
