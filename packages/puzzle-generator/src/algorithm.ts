import Board, { createBoardFromArray } from "./board";

const T = createBoardFromArray([
    [0, 0, 0],
    [0, 1, 0],
    [1, 1, 1]
]);
const I = createBoardFromArray([
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
]);
const J = createBoardFromArray([
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0]
]);
const L = createBoardFromArray([
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0]
]);
const O = createBoardFromArray([
    [1, 1],
    [1, 1]
]);
const S = createBoardFromArray([
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0]
]);
const Z = createBoardFromArray([
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0]
]);

function tsdable(board: Board) {
    const leftT = createBoardFromArray([
        [1, 0, 0],
        [0, 0, 0],
        [1, 0, 1]
    ]);
    const rightT = createBoardFromArray([
        [0, 0, 1],
        [0, 0, 0],
        [1, 0, 1]
    ]);
    return (
        [leftT, rightT]
            .flatMap((pat) => board.getFits(pat))
            .map((vec) => {
                const b = board.clone();
                const left = board.get(vec[0], vec[1]) === 1;
                let block = false;
                for (let k = 0; k < 2; k++) {
                    let x = vec[1] + k;
                    if (left) {
                        x++;
                    }
                    if (!b.emptyAbove(vec[0], x)) {
                        block = true;
                    }
                }
                if (block) {
                    return 0;
                }
                b.fillAt(vec[0], vec[1], T, false);
                return b.getClears().length;
            })
            .filter((clears) => clears === 2).length !== 0
    );
}

export function reverse(board: Board, n: number) {
    const blocks = [T, I, J, L, O, S, Z];
    const names = ["T", "I", "J", "L", "O", "S", "Z"];
    const output = [];
    while (output.length !== n) {
        const i = Math.floor(Math.random() * blocks.length);
        const j = Math.floor(Math.random() * blocks.length);
        const b1 = blocks[i].clone();
        const b2 = blocks[j].clone();
        const bb = board.clone();
        for (let k = 0; k < Math.floor(Math.random() * 4); k++) {
            //b1.cw();
        }
        for (let k = 0; k < Math.floor(Math.random() * 4); k++) {
            //b2.cw();
        }

        const fits1 = bb.getFitsOnTop(b1);
        if (fits1.length === 0) continue;

        bb.fillAt(fits1[0][0], fits1[0][1], b1, true, true);

        if (tsdable(bb)) continue;

        const fits2 = bb.getFitsOnTop(b2);
        if (fits2.length === 0) continue;

        bb.fillAt(fits2[0][0], fits2[0][1], b2, true, true);

        output.push({
            before: bb.clone(),
            after: board.clone(),
            minoes: [b2, b1]
        });
    }
    return output;
}
