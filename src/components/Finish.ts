export class Finish {

    public isFinish (field: number[][])  {
        return field.some(row => row.includes(2048)) ? alert('you win') : false;
    }

    // the rest of the logic
}