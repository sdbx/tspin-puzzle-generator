import { createBoardFromArray } from "./algorithm/board";
import { reverse } from "./algorithm/algorithm";

const bb = createBoardFromArray(
    [[0,0,0,0,0,0,0,0,0,1], 
     [0,1,1,1,0,0,0,0,0,1], 
     [1,1,1,1,0,0,0,0,1,1], 
     [1,1,1,0,0,0,1,1,1,1], 
     [1,1,1,1,0,1,1,1,1,1]]
);

const oo = reverse(bb, 1)[0];
console.log('field:');
oo.before.print();

console.log('nexts:');
oo.minoes[0].print();
console.log('');
oo.minoes[1].print();

console.log('solution:');
oo.after.print();