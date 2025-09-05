const chalk = require('chalk');

export class SceneManager {
    
    /**
     * Muestra la escena de inicio del juego
     */
    static showIntroScene(): void {
        console.clear();
        console.log(chalk.red.bold(`
    ╔══════════════════════════════════════════════════════════════════════════════╗
    ║                                                                              ║
    ║         ██████╗  ██████╗ ██████╗ ███████╗██╗██╗     ██╗      █████╗          ║
    ║        ██╔════╝ ██╔═══██╗██╔══██╗╚══███╔╝██║██║     ██║     ██╔══██╗         ║
    ║        ██║ ████║██║   ██║██║  ██║  ███╔╝ ██║██║     ██║     ███████║         ║
    ║        ██║   ██║██║   ██║██║  ██║ ███╔╝  ██║██║     ██║     ██╔══██║         ║
    ║        ╚██████╔╝╚██████╔╝██████╔╝███████╗██║███████╗███████╗██║  ██║         ║
    ║         ╚═════╝  ╚═════╝ ╚═════╝ ╚══════╝╚═╝╚══════╝╚══════╝╚═╝  ╚═╝         ║
    ║                                                                              ║
    ╚══════════════════════════════════════════════════════════════════════════════╝
        `));
        
        console.log(chalk.yellow.bold(`
    ╔══════════════════════════════════════════════════════════════════════════════╗
    ║                          🚨 ALERTA MÁXIMA 🚨                                ║
    ║                                                                              ║
    ║  Soldados, la humanidad está al borde de la destrucción.                     ║
    ║  Godzilla ha despertado y amenaza con destruirlo todo.                       ║
    ║                                                                              ║
    ║  Tú y tu equipo deben programar la nave que puede salvar a la humanidad.     ║
    ║  Contarán con el apoyo de una inteligencia artificial que les dará           ║
    ║  consejos estratégicos, pero la decisión final es suya.                      ║
    ║                                                                              ║
    ║  El destino del mundo está en sus manos.                                     ║
    ║                                                                              ║
    ╚══════════════════════════════════════════════════════════════════════════════╝
        `));
    }

    /**
     * Muestra la escena de combate
     */
    static showCombatScene(): void {
        console.clear();
        console.log(chalk.red.bold(`
    ╔══════════════════════════════════════════════════════════════════════════════╗
    ║                                                                              ║
    ║  ██████╗ ██████╗ ███╗   ███╗██████╗  █████╗ ████████╗███████╗                ║
    ║ ██╔════╝██╔═══██╗████╗ ████║██╔══██╗██╔══██╗╚══██╔══╝██╔════╝                ║
    ║ ██║     ██║   ██║██╔████╔██║██████╔╝███████║   ██║   █████╗                  ║
    ║ ██║     ██║   ██║██║╚██╔╝██║██╔══██╗██╔══██║   ██║   ██╔══╝                  ║
    ║ ╚██████╗╚██████╔╝██║ ╚═╝ ██║██████╔╝██║  ██║   ██║   ███████╗                ║
    ║  ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝                ║
    ║                                                                              ║
    ╚══════════════════════════════════════════════════════════════════════════════╝
        `));
        
        console.log(chalk.yellow.bold(`
    ╔══════════════════════════════════════════════════════════════════════════════╗
    ║                          ⚔️  COMBATE INICIADO ⚔️                            ║
    ║                                                                              ║
    ║  Godzilla se acerca con furia destructiva...                                 ║
    ║  Sus ataques son devastadores:                                               ║
    ║                                                                              ║
    ║  🔥 Aliento Atómico    - Poder destructivo masivo                           ║
    ║  ⚡ Rayo Espiral       - Ataque de energía concentrada                      ║
    ║  🦴 Golpe de Cola      - Impacto físico devastador                          ║
    ║                                                                              ║
    ║  ¡Prepárate para la batalla final!                                           ║
    ║                                                                              ║
    ╚══════════════════════════════════════════════════════════════════════════════╝
        `));
    }

    /**
     * Muestra la escena de escape
     */
    static showEscapeScene(): void {
        console.clear();
        console.log(chalk.green.bold(`
    ╔══════════════════════════════════════════════════════════════════════════════╗
    ║                                                                              ║
    ║          ███████╗ ██████╗ █████╗ ██████╗ ███████╗                            ║
    ║          ██╔════╝██╔════╝██╔══██╗██╔══██╗██╔════╝                            ║
    ║          ███████╗██║     ███████║██████╔╝█████╗                              ║
    ║          ╚════██║██║     ██╔══██║██╔═══╝ ██╔══╝                              ║
    ║          ███████║╚██████╗██║  ██║██║     ███████╗                            ║
    ║          ╚══════╝ ╚═════╝╚═╝  ╚═╝╚═╝     ╚══════╝                            ║
    ║                                                                              ║
    ╚══════════════════════════════════════════════════════════════════════════════╝
        `));
        
        console.log(chalk.blue.bold(`
    ╔══════════════════════════════════════════════════════════════════════════════╗
    ║                          🚀 ESCAPE INICIADO 🚀                              ║
    ║                                                                              ║
    ║  La nave está lista para el despegue...                                      ║
    ║  Los propulsores se calientan...                                             ║
    ║  El destino: un lugar seguro lejos de la destrucción.                        ║
    ║                                                                              ║
    ║  ¡Cada segundo cuenta!                                                       ║
    ║  ¡La supervivencia de la humanidad depende de este escape!                   ║
    ║                                                                              ║
    ╚══════════════════════════════════════════════════════════════════════════════╝
        `));
    }

    /**
     * Muestra la escena de victoria
     */
    static showVictoryScene(): void {
        console.clear();
        console.log(chalk.green.bold(`
    ╔══════════════════════════════════════════════════════════════════════════════╗
    ║                                                                              ║
    ║  ██╗   ██╗██╗ ██████╗████████╗ ██████╗ ██████╗ ██╗   ██╗                     ║
    ║  ██║   ██║██║██╔════╝╚══██╔══╝██╔═══██╗██╔══██╗╚██╗ ██╔╝                     ║
    ║  ██║   ██║██║██║        ██║   ██║   ██║██████╔╝ ╚████╔╝                      ║
    ║  ╚██╗ ██╔╝██║██║        ██║   ██║   ██║██╔══██╗  ╚██╔╝                       ║
    ║   ╚████╔╝ ██║╚██████╗   ██║   ╚██████╔╝██║  ██║   ██║                        ║
    ║    ╚═══╝  ╚═╝ ╚═════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝   ╚═╝                        ║
    ║                                                                              ║
    ╚══════════════════════════════════════════════════════════════════════════════╝
        `));
        
        console.log(chalk.yellow.bold(`
    ╔══════════════════════════════════════════════════════════════════════════════╗
    ║                          🎉 ¡HUMANIDAD SALVADA! 🎉                          ║
    ║                                                                              ║
    ║  ¡Felicidades, soldado! Has logrado salvar a la humanidad.                   ║
    ║  Tu valentía y habilidades técnicas han sido fundamentales.                  ║
    ║                                                                              ║
    ║  La nave ha despegado exitosamente y la humanidad está a salvo.              ║
    ║  Godzilla ha sido evadido y el futuro de la Tierra está asegurado.           ║
    ║                                                                              ║
    ║  ¡Eres un verdadero héroe!                                                   ║
    ║                                                                              ║
    ╚══════════════════════════════════════════════════════════════════════════════╝
        `));
    }

    /**
     * Muestra la escena de derrota
     */
    static showDefeatScene(): void {
        console.clear();
        console.log(chalk.red.bold(`
    ╔══════════════════════════════════════════════════════════════════════════════╗
    ║                                                                              ║
    ║                 ██████╗ ███████╗  █████╗ ████████╗ ██╗  ██╗                  ║
    ║                 ██╔══██╗██╔════╝ ██╔══██╗╚══██╔══╝ ██║  ██║                  ║
    ║                 ██║  ██║█████╗   ███████║   ██║    ███████║                  ║
    ║                 ██║  ██║██╔══╝   ██╔══██║   ██║    ██╔══██║                  ║
    ║                 ██████╔╝███████╗ ██║  ██║   ██║    ██║  ██║                  ║
    ║                 ╚═════╝ ╚══════╝ ╚═╝  ╚═╝   ╚═╝    ╚═╝  ╚═╝                  ║
    ║                                                                              ║
    ╚══════════════════════════════════════════════════════════════════════════════╝
        `));
        
        console.log(chalk.red.bold(`
    ╔══════════════════════════════════════════════════════════════════════════════╗
    ║                          💀 HUMANIDAD DESTRUIDA 💀                          ║
    ║                                                                              ║
    ║  La misión ha fallado...                                                     ║
    ║  Godzilla ha destruido la nave y con ella, la última esperanza.              ║
    ║                                                                              ║
    ║  La humanidad ha sido aniquilada.                                            ║
    ║  El mundo ha caído bajo el poder destructivo de The Killer.                  ║
    ║                                                                              ║
    ║  Pero recuerda: cada fallo es una lección para el futuro.                    ║
    ║  ¡Inténtalo de nuevo y salva a la humanidad!                                 ║
    ║                                                                              ║
    ╚══════════════════════════════════════════════════════════════════════════════╝
        `));
    }

    /**
     * Muestra la escena de Godzilla detectado
     */
    static showGodzillaDetectedScene(): void {
        console.log(chalk.red.bold(`
    ╔══════════════════════════════════════════════════════════════════════════════╗
    ║                                                                              ║
    ║  🦕 GODZILLA DETECTADO 🦕                                                   ║
    ║                                                                              ║
    ║  ⚠️  ALERTA: The Killer se aproxima a la nave                               ║
    ║  📡 Distancia crítica detectada                                             ║
    ║  🚨 Sistema de sigilo activado                                              ║
    ║                                                                              ║
    ║  ¡Debes actuar rápidamente!                                                  ║
    ║                                                                              ║
    ╚══════════════════════════════════════════════════════════════════════════════╝
        `));
    }

    /**
     * Muestra la escena de código de seguridad
     */
    static showSecurityCodeScene(): void {
        console.log(chalk.blue.bold(`
    ╔══════════════════════════════════════════════════════════════════════════════╗
    ║                                                                              ║
    ║  🔐 CÓDIGO DE SEGURIDAD 🔐                                                  ║
    ║                                                                              ║
    ║  Generando código de iniciación para el despegue...                          ║
    ║  Este código es esencial para la secuencia de lanzamiento.                   ║
    ║                                                                              ║
    ║  ⚠️  Sin este código, la nave no podrá despegar                             ║
    ║                                                                              ║
    ╚══════════════════════════════════════════════════════════════════════════════╝
        `));
    }

    /**
     * Muestra la escena de secuencia de despegue
     */
    static showLaunchSequenceScene(): void {
        console.log(chalk.green.bold(`
    ╔══════════════════════════════════════════════════════════════════════════════╗
    ║                                                                              ║
    ║  🚀 SECUENCIA DE DESPEGUE INICIADA 🚀                                       ║
    ║                                                                              ║
    ║  Iniciando secuencia de lanzamiento...                                       ║
    ║  Tiempo estimado: 2 minutos (escala 5x)                                      ║
    ║                                                                              ║
    ║  ⏱️  Preparando sistemas críticos...                                         ║
    ║                                                                              ║
    ╚══════════════════════════════════════════════════════════════════════════════╝
        `));
    }

    /**
     * Muestra la pantalla de GAME OVER épica
     */
    static showGameOverScene(): void {
        console.clear();
        
        // ASCII Art de GAME OVER
        console.log(chalk.red.bold(`
    ╔══════════════════════════════════════════════════════════════════════════════╗
    ║                                                                              ║
    ║  ██████╗  █████╗ ███╗   ███╗███████╗     ██████╗ ██╗   ██╗███████╗██████╗    ║
    ║ ██╔════╝ ██╔══██╗████╗ ████║██╔════╝    ██╔═══██╗██║   ██║██╔════╝██╔══██╗   ║
    ║ ██║  ███╗███████║██╔████╔██║█████╗      ██║   ██║██║   ██║█████╗  ██████╔╝   ║
    ║ ██║   ██║██╔══██║██║╚██╔╝██║██╔══╝      ██║   ██║╚██╗ ██╔╝██╔══╝  ██╔══██╗   ║
    ║ ╚██████╔╝██║  ██║██║ ╚═╝ ██║███████╗    ╚██████╔╝ ╚████╔╝ ███████╗██║  ██║   ║
    ║  ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝     ╚═════╝   ╚═══╝  ╚══════╝╚═╝  ╚═╝   ║
    ║                                                                              ║
    ╚══════════════════════════════════════════════════════════════════════════════╝
        `));
        
        // Mensaje principal
        console.log(chalk.red.bold(`
    ╔══════════════════════════════════════════════════════════════════════════════╗
    ║                                                                              ║
    ║  🦕 THE KILLER HA TRIUNFADO 🦕                                              ║
    ║                                                                              ║
    ║  ⚡ SUPER CHARGE ACTIVADO ⚡                                                ║
    ║  💥 PODER DESTRUCTIVO x10 💥                                                ║
    ║                                                                              ║
    ║  La nave ha sido reducida a escombros...                                     ║
    ║  Los propulsores han fallado completamente...                                ║
    ║  La última esperanza de la humanidad se ha desvanecido...                    ║
    ║                                                                              ║
    ║  🌍 LA TIERRA ARDE BAJO EL PODER DE GODZILLA 🌍                             ║
    ║                                                                              ║
    ╚══════════════════════════════════════════════════════════════════════════════╝
        `));
        
        // Estadísticas de la derrota
        console.log(chalk.yellow.bold(`
    ╔══════════════════════════════════════════════════════════════════════════════╗
    ║                                                                              ║
    ║  📊 ESTADÍSTICAS DE LA DERROTA 📊                                           ║
    ║                                                                              ║
    ║  🚀 Propulsores: AMBOS FALLIDOS                                             ║
    ║  ⚡ Super Charge: ACTIVADO                                                  ║
    ║  💀 Ataques ejecutados: 3 (x10 poder)                                       ║
    ║  🌍 Estado de la humanidad: EXTINTA                                         ║
    ║  🦕 Dominio de Godzilla: ABSOLUTO                                           ║
    ║                                                                              ║
    ║  ⏰ Tiempo de supervivencia: 0 segundos                                     ║
    ║  🎯 Objetivo: FALLIDO                                                       ║
    ║                                                                              ║
    ╚══════════════════════════════════════════════════════════════════════════════╝
        `));
        
        // Mensaje de consuelo y reinicio
        console.log(chalk.blue.bold(`
    ╔══════════════════════════════════════════════════════════════════════════════╗
    ║                                                                              ║
    ║  💡 LECCIONES APRENDIDAS 💡                                                 ║
    ║                                                                              ║
    ║  • Nunca subestimes el poder de The Killer                                   ║
    ║  • Mantén siempre al menos un propulsor funcional                            ║
    ║  • El escape es preferible al combate directo                                ║
    ║  • La IA aliada puede ser tu mejor recurso                                   ║
    ║  • Cada decisión cuenta en la supervivencia                                  ║
    ║                                                                              ║
    ║  🔄 ¿Estás listo para intentar salvar la humanidad de nuevo?                 ║
    ║                                                                              ║
    ╚══════════════════════════════════════════════════════════════════════════════╝
        `));
    }

    /**
     * Muestra la pantalla de GAME OVER por combate
     */
    static showCombatGameOverScene(): void {
        console.clear();
        
        console.log(chalk.red.bold(`
    ╔══════════════════════════════════════════════════════════════════════════════╗
    ║                                                                              ║
    ║  ⚔️  COMBATE FALLIDO ⚔️                                                     ║
    ║                                                                              ║
    ║  🦕 GODZILLA ES DEMASIADO PODEROSO 🦕                                       ║
    ║                                                                              ║
    ║  Tu valentía fue admirable, pero inútil...                                   ║
    ║  The Killer ha demostrado por qué es el rey de los monstruos...              ║
    ║                                                                              ║
    ║  💥 Aliento Atómico: DEVASTADOR                                             ║
    ║  ⚡ Rayo Espiral: IMPARABLE                                                 ║
    ║  🦴 Golpe de Cola: DESTRUCTIVO                                              ║
    ║                                                                              ║
    ║  La nave ha sido reducida a cenizas...                                       ║
    ║  La humanidad ha perdido su última esperanza...                              ║
    ║                                                                              ║
    ║  🌍 EL MUNDO PERTENECE AHORA A GODZILLA 🌍                                  ║
    ║                                                                              ║
    ╚══════════════════════════════════════════════════════════════════════════════╝
        `));
        
        console.log(chalk.yellow.bold(`
    ╔══════════════════════════════════════════════════════════════════════════════╗
    ║                                                                              ║
    ║  🎯 ESTRATEGIA RECOMENDADA PARA LA PRÓXIMA VEZ 🎯                           ║
    ║                                                                              ║
    ║  ✅ Prioriza el escape sobre el combate                                     ║
    ║  ✅ Mantén los propulsores en buen estado                                   ║
    ║  ✅ Usa la IA aliada para consejos estratégicos                             ║
    ║  ✅ Calcula bien las distancias y potencias                                 ║
    ║  ✅ Genera códigos de seguridad válidos                                     ║
    ║                                                                              ║
    ║  💪 La humanidad necesita un estratega, no un guerrero                      ║
    ║                                                                              ║
    ╚══════════════════════════════════════════════════════════════════════════════╝
        `));
    }
}
