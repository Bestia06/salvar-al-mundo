export declare class Game {
    private audioManager;
    private propulsorManager;
    private godzilla;
    private miniMap;
    private hudManager;
    private gameState;
    private shipPosition;
    private shipHealth;
    constructor();
    /**
     * Inicia el juego
     */
    start(): Promise<void>;
    /**
     * Reproduce la secuencia de introducción
     */
    private playIntroSequence;
    /**
     * Bucle principal del juego
     */
    private mainGameLoop;
    /**
     * Muestra el menú principal
     */
    private showMainMenu;
    /**
     * Verifica el estado de los propulsores
     */
    private verificarPropulsores;
    /**
     * Calcula la distancia a Godzilla
     */
    private calcularDistancia;
    /**
     * Genera el código de seguridad
     */
    private generarCodigoSeguridad;
    /**
     * Intenta el despegue
     */
    private intentarDespegue;
    /**
     * Ejecuta la secuencia de despegue
     */
    private ejecutarSecuenciaDespegue;
    /**
     * Entra en combate con Godzilla
     */
    private entrarEnCombate;
    /**
     * Combate directo con Godzilla
     */
    private combatirDirectamente;
    /**
     * Intenta defender
     */
    private defender;
    /**
     * Intenta huir
     */
    private intentarHuir;
    /**
     * Pide consejo a la IA
     */
    private pedirConsejoIA;
    /**
     * Muestra el mini mapa
     */
    private mostrarMiniMapa;
    /**
     * Muestra el HUD completo
     */
    private mostrarHUDCompleto;
    /**
     * Calcula la distancia entre dos puntos
     */
    private calcularDistanciaEntrePuntos;
    /**
     * Genera alertas basadas en el estado del juego
     */
    private generarAlertas;
    /**
     * Muestra estadísticas del juego
     */
    private mostrarEstadisticas;
    /**
     * Espera la entrada del usuario
     */
    private waitForUserInput;
    /**
     * Finaliza el juego
     */
    endGame(): Promise<void>;
}
//# sourceMappingURL=game.d.ts.map