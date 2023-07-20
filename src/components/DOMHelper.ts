export class DOMHelper {
    public createCell(row: number, col: number): HTMLDivElement {
        const cell = document.createElement("div");
        cell.dataset["id"] = `${row}-${col}`;
        cell.classList.add("cell");
        return cell;
    }

    public updateCellValue(cell: HTMLDivElement, num: number): void {
        cell.textContent = "";
        cell.classList.value = "";
        cell.classList.add("cell");

        if (num > 0) {
            cell.textContent = num.toString();
            cell.classList.add("slide");
        }
    }

    public getCell(row: number, column: number): HTMLDivElement {
        return document.querySelector(`[data-id="${row}-${column}"]`) as HTMLDivElement;
    }
}