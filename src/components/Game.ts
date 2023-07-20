import { DOMHelper } from "./DOMHelper";
import { Management } from "./Management";

export class Game {
    private app: HTMLDivElement;

    public field: number[][];
    public readonly rows: number;
    public readonly columns: number;

    private readonly management: Management;
    private readonly domHelper: DOMHelper;

    constructor(app: string) {
        this.app = document.querySelector(app) as HTMLDivElement;

        this.field = [];
        this.rows = 4;
        this.columns = 4;

        this.management = new Management(this);
        this.domHelper = new DOMHelper();
    }

    public setGame(): void {
        this.field = Array.from({ length: this.rows }, () => Array(this.columns).fill(0));

        this.app.textContent = "";

        for (let row = 0; row < this.rows; row++) {
            for (let column = 0; column < this.columns; column++) {
                const cell = this.domHelper.createCell(row, column);
                this.app.appendChild(cell);
            }
        }

        this.setTwoCells();
        this.setTwoCells();
    }


    public setTwoCells(): void {
        if (!this.isEmptyCell()) return;

        const emptyCells: { row: number, col: number }[] = [];

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                if (this.field[i][j] === 0) {
                    emptyCells.push({ row: i, col: j });
                }
            }
        }

        if (emptyCells.length > 0) {
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            const { row, col } = emptyCells[randomIndex];
            this.field[row][col] = 2;

            const cell: HTMLDivElement = this.domHelper.getCell(row, col);
            cell.textContent = "2";
            cell.classList.add("slide");
        }
    }

    private isEmptyCell(): boolean {
        return this.field.some((row) => row.includes(0));
    }
}