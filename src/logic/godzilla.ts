const chalk = require('chalk');

export interface GodzillaAttack {
    name: string;
    basePower: number;
    description: string;
    emoji: string;
}

export class Godzilla {
    private attacks: GodzillaAttack[];
    private superChargeActive: boolean = false;
    private currentPosition: { x: number; y: number } = { x: 0, y: 0 };

    constructor() {
        this.attacks = [
            {
                name: "Aliento Atómico",
                basePower: 5000,
                description: "Rayo de energía atómica devastador",
                emoji: "🔥"
            },
            {
                name: "Rayo Espiral",
                basePower: 3500,
                description: "Ataque de energía concentrada en espiral",
                emoji: "⚡"
            },
            {
                name: "Golpe de Cola",
                basePower: 4000,
                description: "Impacto físico devastador con la cola",
                emoji: "🦴"
            }
        ];
    }

    /**
     * Obtiene todos los ataques de Godzilla
     */
    getAttacks(): GodzillaAttack[] {
        return this.attacks.map(attack => ({
            ...attack,
            power: this.superChargeActive ? attack.basePower * 10 : attack.basePower
        }));
    }

    /**
     * Activa Super Charge (multiplica ataques x10)
     */
    activateSuperCharge(): void {
        this.superChargeActive = true;
        console.log(chalk.red.bold(`
    ╔══════════════════════════════════════════════════════════════════════════════╗
    ║                                                                              ║
    ║  ⚡ SUPER CHARGE ACTIVADO ⚡                                                 ║
    ║                                                                              ║
    ║  Godzilla ha detectado la falla total de los propulsores...                 ║
    ║  Su poder destructivo se ha multiplicado por 10!                            ║
    ║                                                                              ║
    ║  ¡TODOS SUS ATAQUES AHORA SON DEVASTADORES!                                 ║
    ║                                                                              ║
    ╚══════════════════════════════════════════════════════════════════════════════╝
        `));
    }

    /**
     * Verifica si Super Charge está activo
     */
    isSuperChargeActive(): boolean {
        return this.superChargeActive;
    }

    /**
     * Ejecuta un ataque específico
     */
    executeAttack(attackIndex: number): { attack: GodzillaAttack; power: number } {
        if (attackIndex < 0 || attackIndex >= this.attacks.length) {
            throw new Error("Índice de ataque inválido");
        }

        const attack = this.attacks[attackIndex];
        const power = this.superChargeActive ? attack.basePower * 10 : attack.basePower;

        console.log(chalk.red.bold(`
    ╔══════════════════════════════════════════════════════════════════════════════╗
    ║                                                                              ║
    ║  ${attack.emoji} GODZILLA ATACA: ${attack.name.toUpperCase()} ${attack.emoji}                        ║
    ║                                                                              ║
    ║  ${attack.description}                                                      ║
    ║                                                                              ║
    ║  Poder Base: ${attack.basePower.toLocaleString()} unidades                                          ║
    ║  ${this.superChargeActive ? 'Poder con Super Charge: ' + power.toLocaleString() + ' unidades' : 'Poder Normal: ' + power.toLocaleString() + ' unidades'}                    ║
    ║                                                                              ║
    ╚══════════════════════════════════════════════════════════════════════════════╝
        `));

        return { attack, power };
    }

    /**
     * Ejecuta todos los ataques en secuencia
     */
    executeAllAttacks(): void {
        console.log(chalk.red.bold(`
    ╔══════════════════════════════════════════════════════════════════════════════╗
    ║                                                                              ║
    ║  💀 GODZILLA EJECUTA TODOS SUS ATAQUES 💀                                   ║
    ║                                                                              ║
    ║  La destrucción es inminente...                                             ║
    ║                                                                              ║
    ╚══════════════════════════════════════════════════════════════════════════════╝
        `));

        this.attacks.forEach((attack, index) => {
            setTimeout(() => {
                this.executeAttack(index);
            }, index * 2000); // 2 segundos entre ataques
        });
    }

    /**
     * Establece la posición de Godzilla
     */
    setPosition(x: number, y: number): void {
        this.currentPosition = { x, y };
    }

    /**
     * Obtiene la posición actual de Godzilla
     */
    getPosition(): { x: number; y: number } {
        return { ...this.currentPosition };
    }

    /**
     * Simula el movimiento de Godzilla hacia la nave
     */
    moveTowardsShip(shipX: number, shipY: number): void {
        const dx = shipX - this.currentPosition.x;
        const dy = shipY - this.currentPosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 0) {
            const moveX = (dx / distance) * 50; // Se mueve 50 metros por turno
            const moveY = (dy / distance) * 50;
            
            this.currentPosition.x += moveX;
            this.currentPosition.y += moveY;
        }
    }

    /**
     * Muestra el estado de Godzilla
     */
    showStatus(): void {
        console.log(chalk.red.bold(`
    ╔══════════════════════════════════════════════════════════════════════════════╗
    ║                                                                              ║
    ║  🦕 ESTADO DE GODZILLA (THE KILLER) 🦕                                     ║
    ║                                                                              ║
    ║  Posición: (${this.currentPosition.x.toFixed(1)}, ${this.currentPosition.y.toFixed(1)}) metros                        ║
    ║  Super Charge: ${this.superChargeActive ? '⚡ ACTIVO' : '❌ Inactivo'}                                    ║
    ║                                                                              ║
    ║  Ataques disponibles:                                                       ║
        `));
        
        this.attacks.forEach((attack, index) => {
            const power = this.superChargeActive ? attack.basePower * 10 : attack.basePower;
            console.log(chalk.red(`
    ║    ${index + 1}. ${attack.emoji} ${attack.name} - ${power.toLocaleString()} unidades de poder        ║
            `));
        });
        
        console.log(chalk.red(`
    ║                                                                              ║
    ╚══════════════════════════════════════════════════════════════════════════════╝
        `));
    }

    /**
     * Calcula la distancia a un punto específico
     */
    calculateDistanceTo(x: number, y: number): number {
        const dx = x - this.currentPosition.x;
        const dy = y - this.currentPosition.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * Verifica si Godzilla está en rango de ataque
     */
    isInAttackRange(shipX: number, shipY: number, range: number = 100): boolean {
        const distance = this.calculateDistanceTo(shipX, shipY);
        return distance <= range;
    }

    /**
     * Resetea el estado de Godzilla
     */
    reset(): void {
        this.superChargeActive = false;
        this.currentPosition = { x: 0, y: 0 };
    }
}
