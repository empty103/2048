import { DOMHelper } from "./DOMHelper";
import { Finish } from "./Finish";
import { Game } from "./Game";

export class Management {
    private readonly game: Game;
    private readonly finish: Finish;
    private readonly domHelper: DOMHelper;

    constructor(game: Game) {
        this.game = game;
        this.finish = new Finish();
        this.domHelper = new DOMHelper();

        this.addEventKeyboard();
    }

    private addEventKeyboard() {
        document.addEventListener("keyup", (e: KeyboardEvent) => {
            switch (e.code) {
                case "ArrowLeft":
                case "KeyA":
                    this.slideLeft();
                    this.game.setTwoCells();
                    this.finish.isFinish(this.game.field);
                    break;
                case "ArrowRight":
                case "KeyD":
                    this.slideRight();
                    this.game.setTwoCells();
                    this.finish.isFinish(this.game.field);
                    break;
                case "ArrowUp":
                case "KeyW":
                    this.slideUp();
                    this.game.setTwoCells();
                    this.finish.isFinish(this.game.field);
                    break;
                case "ArrowDown":
                case "KeyS":
                    this.slideDown();
                    this.game.setTwoCells();
                    this.finish.isFinish(this.game.field);
                    break;
                default:
                    break;
            }
        });
    }

    private slide(row: number[]): number[] {
        row = row.filter((num: number) => num !== 0);

        row = row.reduce((res: number[], el: number) => {
            if (el === res[res.length - 1]) {
                res[res.length - 1] *= 2;
            } else {
                res.push(el);
            }
            return res;
        }, []);

        while (row.length < this.game.columns) row.push(0);

        return row;
    }

    private slideLeft(): void {
        this.game.field.forEach((row: number[], rowIndex: number) => {
            const updatedRow: number[] = this.slide(row);
            this.game.field[rowIndex] = updatedRow;

            row.forEach((_: number, colIndex: number) => {
                const cell: HTMLDivElement = this.domHelper.getCell(rowIndex, colIndex);
                this.domHelper.updateCellValue(cell, updatedRow[colIndex]);
            });
        });
    }

    private slideRight(): void {
        this.game.field.forEach((row: number[], rowIndex: number) => {
            const updatedRow: number[] = this.slide(row.slice().reverse());
            updatedRow.reverse();
            this.game.field[rowIndex] = updatedRow;

            row.forEach((_: number, colIndex: number) => {
                const cell: HTMLDivElement = this.domHelper.getCell(rowIndex, colIndex);
                this.domHelper.updateCellValue(cell, updatedRow[colIndex]);
            });
        });
    }

    private slideUp(): void {
        for (let colIndex = 0; colIndex < this.game.columns; colIndex++) {
            const column: number[] = this.game.field.map((row: number[]) => row[colIndex]);
            const updatedColumn: number[] = this.slide(column);

            this.game.field.forEach((row: number[], rowIndex: number) => {
                row[colIndex] = updatedColumn[rowIndex];
                const cell: HTMLDivElement = this.domHelper.getCell(rowIndex, colIndex);
                this.domHelper.updateCellValue(cell, updatedColumn[rowIndex]);
            });
        }
    }

    private slideDown(): void {
        for (let colIndex = 0; colIndex < this.game.columns; colIndex++) {
            const column: number[] = this.game.field.map((row: number[]) => row[colIndex]).reverse();
            const updatedColumn: number[] = this.slide(column).reverse();

            this.game.field.forEach((row: number[], rowIndex: number) => {
                row[colIndex] = updatedColumn[rowIndex];
                const cell: HTMLDivElement = this.domHelper.getCell(rowIndex, colIndex);
                this.domHelper.updateCellValue(cell, updatedColumn[rowIndex]);
            });
        }
    }
}
