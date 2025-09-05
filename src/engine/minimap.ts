const chalk = require('chalk');

export interface Position {
    x: number;
    y: number;
}

export class MiniMap {
    private width: number = 40;
    private height: number = 20;
    private shipPosition: Position;
    private godzillaPosition: Position;
    private dangerZone: number = 300; // metros

    constructor() {
        this.shipPosition = { x: 500, y: 500 };
        this.godzillaPosition = { x: 0, y: 0 };
    }

    /**
     * Actualiza las posiciones
     */
    updatePositions(shipPos: Position, godzillaPos: Position): void {
        this.shipPosition = shipPos;
        this.godzillaPosition = godzillaPos;
    }

    /**
     * Renderiza el mini mapa
     */
    render(): void {
        console.clear();
        
        // Crear el mapa
        const map: string[][] = [];
        for (let y = 0; y < this.height; y++) {
            map[y] = [];
            for (let x = 0; x < this.width; x++) {
                map[y][x] = ' ';
            }
        }

        // Convertir posiciones a coordenadas del mapa
        const shipMapPos = this.worldToMap(this.shipPosition);
        const godzillaMapPos = this.worldToMap(this.godzillaPosition);

        // Dibujar zona de peligro
        this.drawDangerZone(map, shipMapPos);

        // Dibujar Godzilla
        if (this.isInMapBounds(godzillaMapPos)) {
            map[godzillaMapPos.y][godzillaMapPos.x] = '🦕';
        }

        // Dibujar nave
        if (this.isInMapBounds(shipMapPos)) {
            map[shipMapPos.y][shipMapPos.x] = '🚀';
        }

        // Dibujar bordes del mapa
        this.drawMapBorders(map);

        // Mostrar el mapa
        this.displayMap(map);
        
        // Mostrar información
        this.displayInfo();
    }

    /**
     * Convierte coordenadas del mundo a coordenadas del mapa
     */
    private worldToMap(worldPos: Position): Position {
        const scaleX = this.width / 1000; // Escala para coordenadas 0-1000
        const scaleY = this.height / 1000;
        
        return {
            x: Math.floor(worldPos.x * scaleX),
            y: Math.floor(worldPos.y * scaleY)
        };
    }

    /**
     * Verifica si una posición está dentro de los límites del mapa
     */
    private isInMapBounds(pos: Position): boolean {
        return pos.x >= 0 && pos.x < this.width && pos.y >= 0 && pos.y < this.height;
    }

    /**
     * Dibuja la zona de peligro alrededor de la nave
     */
    private drawDangerZone(map: string[][], shipPos: Position): void {
        const dangerRadius = Math.floor((this.dangerZone / 1000) * Math.min(this.width, this.height));
        
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const distance = Math.sqrt((x - shipPos.x) ** 2 + (y - shipPos.y) ** 2);
                if (distance <= dangerRadius && map[y][x] === ' ') {
                    map[y][x] = '⚠️';
                }
            }
        }
    }

    /**
     * Dibuja los bordes del mapa
     */
    private drawMapBorders(map: string[][]): void {
        // Bordes horizontales
        for (let x = 0; x < this.width; x++) {
            map[0][x] = '─';
            map[this.height - 1][x] = '─';
        }
        
        // Bordes verticales
        for (let y = 0; y < this.height; y++) {
            map[y][0] = '│';
            map[y][this.width - 1] = '│';
        }
        
        // Esquinas
        map[0][0] = '┌';
        map[0][this.width - 1] = '┐';
        map[this.height - 1][0] = '└';
        map[this.height - 1][this.width - 1] = '┘';
    }

    /**
     * Muestra el mapa en la consola
     */
    private displayMap(map: string[][]): void {
        console.log(chalk.blue.bold(`
    ╔══════════════════════════════════════════════════════════════════════════════╗
    ║                                                                              ║
    ║  🗺️  MINI MAPA EN TIEMPO REAL 🗺️                                         ║
    ║                                                                              ║
    ╚══════════════════════════════════════════════════════════════════════════════╝
        `));

        // Mostrar el mapa
        for (let y = 0; y < this.height; y++) {
            let line = '    ║  ';
            for (let x = 0; x < this.width; x++) {
                const cell = map[y][x];
                if (cell === '🦕') {
                    line += chalk.red(cell);
                } else if (cell === '🚀') {
                    line += chalk.green(cell);
                } else if (cell === '⚠️') {
                    line += chalk.yellow(cell);
                } else if (cell === '─' || cell === '│' || cell === '┌' || cell === '┐' || cell === '└' || cell === '┘') {
                    line += chalk.blue(cell);
                } else {
                    line += cell;
                }
            }
            line += '  ║';
            console.log(line);
        }
    }

    /**
     * Muestra información del mapa
     */
    private displayInfo(): void {
        const distance = this.calculateDistance();
        const isInDanger = distance < this.dangerZone;
        
        console.log(chalk.blue.bold(`
    ╔══════════════════════════════════════════════════════════════════════════════╗
    ║                                                                              ║
    ║  📊 INFORMACIÓN DEL MAPA 📊                                                ║
    ║                                                                              ║
    ║  🚀 Nave: (${this.shipPosition.x}, ${this.shipPosition.y}) metros                        ║
    ║  🦕 Godzilla: (${this.godzillaPosition.x.toFixed(1)}, ${this.godzillaPosition.y.toFixed(1)}) metros                    ║
    ║  📏 Distancia: ${distance.toFixed(1)} metros                                    ║
    ║  ${isInDanger ? '🚨 ESTADO: PELIGRO INMINENTE' : '✅ ESTADO: SEGURO'}                                    ║
    ║                                                                              ║
    ║  Leyenda:                                                                   ║
    ║  🚀 = Nave Espacial                                                         ║
    ║  🦕 = Godzilla (The Killer)                                                ║
    ║  ⚠️ = Zona de Peligro (${this.dangerZone}m)                                        ║
    ║                                                                              ║
    ╚══════════════════════════════════════════════════════════════════════════════╝
        `));
    }

    /**
     * Calcula la distancia entre la nave y Godzilla
     */
    private calculateDistance(): number {
        const dx = this.shipPosition.x - this.godzillaPosition.x;
        const dy = this.shipPosition.y - this.godzillaPosition.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * Simula el movimiento de Godzilla hacia la nave
     */
    simulateGodzillaMovement(): void {
        const dx = this.shipPosition.x - this.godzillaPosition.x;
        const dy = this.shipPosition.y - this.godzillaPosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 0) {
            const moveSpeed = 50; // metros por movimiento
            const moveX = (dx / distance) * moveSpeed;
            const moveY = (dy / distance) * moveSpeed;
            
            this.godzillaPosition.x += moveX;
            this.godzillaPosition.y += moveY;
        }
    }

    /**
     * Verifica si Godzilla está en rango de ataque
     */
    isGodzillaInAttackRange(): boolean {
        const distance = this.calculateDistance();
        return distance <= 100; // 100 metros de rango de ataque
    }

    /**
     * Obtiene la posición actual de Godzilla
     */
    getGodzillaPosition(): Position {
        return { ...this.godzillaPosition };
    }

    /**
     * Obtiene la posición actual de la nave
     */
    getShipPosition(): Position {
        return { ...this.shipPosition };
    }

    /**
     * Establece la posición de la nave
     */
    setShipPosition(pos: Position): void {
        this.shipPosition = pos;
    }

    /**
     * Establece la posición de Godzilla
     */
    setGodzillaPosition(pos: Position): void {
        this.godzillaPosition = pos;
    }
}
