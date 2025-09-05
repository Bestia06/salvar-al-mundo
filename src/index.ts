import { Game } from './game';

/**
 * Punto de entrada principal del juego "Salvar Mundo"
 * 
 * Este es el juego épico de supervivencia contra Godzilla donde la humanidad
 * depende de una nave espacial para escapar de la destrucción.
 * 
 * Características principales:
 * - Sistema de propulsores con cálculos complejos
 * - Cálculo de distancia usando fórmula de Pitágoras
 * - Generación de código de seguridad con números aleatorios
 * - Múltiples finales basados en las decisiones del jugador
 * - Sistema de audio integrado
 * - IA aliada que proporciona consejos estratégicos
 * - Escenas épicas con ASCII art
 */

async function main(): Promise<void> {
    try {
        console.log('🚀 Iniciando juego "Salvar Mundo"...');
        console.log('🎮 Preparando sistemas...');
        
        const game = new Game();
        await game.start();
        await game.endGame();
        
    } catch (error) {
        console.error('❌ Error fatal en el juego:', error);
        console.log('💀 La humanidad ha fallado debido a un error técnico...');
        process.exit(1);
    }
}

// Ejecutar el juego
main().catch((error) => {
    console.error('💥 Error no manejado:', error);
    process.exit(1);
});
