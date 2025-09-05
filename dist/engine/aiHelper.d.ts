export declare class AIHelper {
    private static adviceCount;
    /**
     * Proporciona consejo estratégico al jugador
     */
    static provideAdvice(context: string): string;
    /**
     * Obtiene consejo específico según el contexto
     */
    private static getAdviceByContext;
    /**
     * Proporciona consejo sobre propulsores
     */
    static getPropulsorAdvice(): string;
    /**
     * Proporciona consejo sobre distancia
     */
    static getDistanceAdvice(): string;
    /**
     * Proporciona consejo sobre código de seguridad
     */
    static getSecurityCodeAdvice(): string;
    /**
     * Proporciona consejo sobre combate
     */
    static getCombatAdvice(): string;
    /**
     * Proporciona consejo sobre escape
     */
    static getEscapeAdvice(): string;
    /**
     * Proporciona consejo general
     */
    static getGeneralAdvice(): string;
    /**
     * Obtiene el número de consejos dados
     */
    static getAdviceCount(): number;
    /**
     * Muestra estadísticas de la IA
     */
    static showAIStats(): void;
}
//# sourceMappingURL=aiHelper.d.ts.map