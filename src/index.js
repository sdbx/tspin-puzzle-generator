"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Board_1 = require("./algorithm/Board");
var algorithm_1 = require("./algorithm/algorithm");
var bb = Board_1.createBoardFromArray([[0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 1, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 1, 1],
    [1, 1, 1, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 1, 1]]);
var oo = algorithm_1.reverse(bb, 1)[0];
console.log('field:');
oo.before.print();
console.log('nexts:');
oo.minoes[0].print();
console.log('');
oo.minoes[1].print();
console.log('solution:');
oo.after.print();
