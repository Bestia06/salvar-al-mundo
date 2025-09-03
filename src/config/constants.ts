// NUNCA usar números sueltos en el código: todas las cifras como constantes:

// Thrusters & Potencia
export const HYDRO_PROPULSOR = 5000;                // dado por el enunciado
export const POTENCIA_SISTEMA = 10000;              // “potencia absoluta” del sistema
export const THRESHOLD_AMBOS_OK = 0.75;             // 75% si ambos buenos
export const THRESHOLD_BASE = 0.90;                 // 90% en casos restantes
export const RIGHT_EXP = 4;                          // “90% a la 4ta”
export const RIGHT_DIVISOR = 2;                     // “entre 2 elementos”
export const LEFT_EXP = 2;                           // “90% a la 2da”
export const LEFT_DIVISOR = 3;                      // “entre 3 elementos”
export const SUPER_CHARGE_MULTIPLIER = 10;          // ataques x10 cuando ambos fallan

// Distancia & Coordenadas
export const MIN_COORD = 50;
export const MAX_COORD = 1000;
export const COORD_TO_METERS = 100;                 // escalar coordenadas por 100
export const DISTANCE_EXTRA_SCALE = 100;            // multiplicar distancia por 100 adicional (según enunciado)
export const STEALTH_LIMIT_METERS = 300;            // sigilo hasta < 300 m
export const ENEMY_STEP_METERS = 40;                // paso de alejamiento simulado por ciclo

// Código de seguridad 50k + 1
export const CODE_LENGTH = 10;
export const CODE_MOD = 50;
export const CODE_CONGRUENT = 1;
export const CODE_K_MIN = 2;                        // rango razonable para generar diversidad
export const CODE_K_MAX = 999;

// Lanzamiento (2 min simulados a escala 5x => 24 s reales)
export const LAUNCH_SIM_SECONDS_TOTAL = 120;
export const LAUNCH_TIME_SCALE = 5;                 // 5x
export const TICK_SIM_SECONDS = 5;                  // actualizar cada 5s simulados
export const MS_PER_SECOND = 1000;

// Poder base de ataques
export const POWER_ATOMIC_BREATH = 120;
export const POWER_SPIRAL_RAY = 100;
export const POWER_TAIL_WHIP = 80;

// Rutas de audio
export const AUDIO_ROAR = "sounds/roar.mp3";
export const AUDIO_ROCKET = "sounds/rocket.mp3";
export const AUDIO_ATTACK = "sounds/attack.mp3";
