class Board {
    board: number[][];
    h: number;
    w: number;
    constructor(h: number, w: number){
        this.h = h;
        this.w = w;
        this.board = [];
        for (let i = 0; i < h; i ++) {
            this.board[i] = [];
            for (let j = 0; j < w; j++) {
                this.board[i][j] = 0;
            }
        }
    }

    get(y: number, x: number) {
        if (y < 0 || y >= this.h || x < 0 || x >= this.w) {
            throw new Error("Out of bound");
        }
        return this.board[y][x];
    }

    set(y: number, x: number, value: number) {
        if (y < 0 || y >= this.h || x < 0 || x >= this.w) {
            throw new Error("Out of bound");
        }
        this.board[y][x] = value;
    }

    clone() {
        const output = new Board(this.h, this.w);
        for (let i = 0; i < this.h; i ++) {
            for (let j = 0; j< this.w; j++) {
                output.set(i,j,this.get(i,j));
            }
        } 
        return output;
    }

    compareAt(y: number, x: number, value: Board, ignoreZero: boolean = true) {
        for (let i = 0; i < value.h; i++) {
            for (let j = 0; j < value.w; j++) {
                if (ignoreZero && value.get(i, j) == 0) {
                    continue;
                }
                if (value.get(i, j) != this.get(y+i, x+j)) {
                    return false;
                }
            }
        }
        return true;
    }

    hitAny(y: number, x: number, value: Board) {
        for (let i = 0; i < value.h; i++) {
            for (let j = 0; j < value.w; j++) {
                if (value.get(i, j) == 0) {
                    continue;
                }
                if (this.get(y+i, x+j) != 0) {
                    return true;
                }
            }
        }
        return false;
    }

    fillAt(y: number, x: number, value: Board, ignoreZero: boolean = true, inv: boolean = false) {
        for (let i = 0; i < value.h; i++) {
            for (let j = 0; j < value.w; j++) {
                if (ignoreZero && value.get(i, j) == 0) {
                    continue;
                }
                if (inv) { 
                    this.set(y+i, x+j, 0);
                } else {
                    this.set(y+i, x+j, value.get(i,j));
                }
            }
        }
    }
    
    emptyAbove(y: number, x: number) {
        for (let i = 0; i < y; i ++) {
            if (this.get(i, x) != 0) {
                return false;
            }
        }
        return true;
    }

    getClears() {
        const output = [];
        for (let i = 0; i < this.h; i++) {
            let full = true;
            for (let j = 0; j < this.w; j++) {
                if (this.get(i, j) == 0) {
                    full = false;
                }
            }
            if (full) {
                output.push(i);
            }
        }
        return output;
    }

    setLine(y: number, value: number) {
        for (let j = 0; j < this.w; j++) {
            this.set(y, j, value);
        }
    }

    getFits(board: Board, ignoreZero: boolean = true) {
        const output = [];
        for (let i = 0; i < this.h - board.h; i ++) { 
            for (let j = 0; j < this.w - board.w; j++) { 
                if (this.compareAt(i, j, board, ignoreZero)) {
                    output.push([i, j]);
                }
            }
        }
        return output;
    }
    
    getFitsOnTop(board: Board) {
        const output = [];
        for (let j = 0; j < this.w - board.w; j++) {
            for (let i = 0; i < this.h - board.h; i ++) { 
                if (this.compareAt(i, j, board, true)) {
                    output.push([i,j]);
                }
                if (this.hitAny(i, j, board)) {
                    continue;
                }
            }
        }
        return output;
    }

    cw() {
        // (x,y) -> (h-y,x)
        // (j,i) -> (h-i,j)
        const newboard = [];
        for (let i = 0; i < this.w; i ++) {
            newboard[i] = [];
            for (let j = 0; j < this.h; j++) {
                newboard[i][j] = 0;
            }
        }
        for (let i = 0; i < this.h; i ++) {
            for (let j = 0; j < this.w; j++) {
                newboard[j][this.h-i] = this.board[i][j];
            }
        }
        const tmp = this.w;
        this.w = this.h;
        this.h = tmp;
        this.board = newboard;
    }

    ccw() {
        // (x,y) -> (y,w-x)
        // (j,i) -> (i,w-j)
        const newboard = [];
        for (let i = 0; i < this.w; i ++) {
            newboard[i] = [];
            for (let j = 0; j < this.h; j++) {
                newboard[i][j] = 0;
            }
        }
        for (let i = 0; i < this.w; i ++) {
            for (let j = 0; j < this.h; j++) {
                newboard[this.w-j][i] = this.board[i][j];
            }
        }
        const tmp = this.w;
        this.w = this.h;
        this.h = tmp;
        this.board = newboard;
    }

    compress() {
        // Given board is not empty, board[:, 0:minX] is empty
        // Proof: 
        //  Assume board[:, 0:minX] is not empty.
        //  => there's at least one filled cell in 0:minX
        //  minX is the minimum x of filled cell in entire board <- contradiction
        
        // We can't shrink board more
        // Proof:
        //  Assume we can shrink the board more
        //  => there exists some h that which board[:, 0:h] is empty and h is more than minX
        //  However in board[:, minX], there's at least one filled cell
        //  because minX is the minimum x of filled cell in entire board <- contradiction
        
        // We can prove in simliar way for board[:, maxX:w], board[0:minY, :], board[minY:h, :]

        let minX = 999;
        let maxX = 0;
        let minY = 999;
        let maxY = 0;
        for (let i = 0; i < this.h; i ++) {
            for (let j = 0; j < this.w; j++) {
                if (this.get(i, j) == 1) {
                    minX = Math.min(j, minX);
                    maxX = Math.max(j, maxX);
                    minY = Math.min(i, minY);
                    maxY = Math.max(i, maxY);
                }
            }
        }
        
        // Proof: one filled cell => minX = maxX, minY = maxY
        // after that minX = min(maxX, x) <= maxX, minY = min(maxY, y) <= maxY
        if (minX > maxX || minY > maxY) {
            throw new Error("Empty board passed");
        }

        this.w = maxX + 1 - minX;
        this.h = maxY + 1 - minY;
        
        for (let i = 0; i < this.h; i ++){
            for (let j = 0; j <this.w; j++){
                this.board[i][j] = this.board[i + minY][j + minX];
            }
        }
    }
    
    print() {
        for (let i = 0; i < this.h; i ++) {
            let line = '';
            for (let j = 0; j <this.w; j++){ 
                if (this.board[i][j] == 1) {
                    line += '#';
                } else {
                    line += ' ';
                }
            }
            console.log(line);
        }
    }
}

export function createBoardFromArray(arr: number[][]) {
    const h = arr.length;
    const w = arr[0].length;
    const output = new Board(h, w);
    for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j ++) {
            output.set(i, j, arr[i][j]);
        }
    }
    return output;
}

export default Board;