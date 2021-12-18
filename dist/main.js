"use strict";
function RNGDec(min, max, precision) {
    const stringErr = `il numero di precision '${precision}' deve essere un numero intero positivo diverso da 0!!`;
    if (Math.sign(precision) != 1) {
        throw new Error(stringErr);
    }
    else if (!Number.isInteger(precision)) {
        throw new Error(stringErr);
    }
    const rng = Math.random();
    let app = (rng * (max - min) + min).toPrecision(precision + 1);
    return app;
}
function RNG(min, max) {
    const rng = Math.random();
    return Math.trunc(rng * (max - min) + min);
}
function RNGSequence(len, min, max) {
    const res = [];
    for (let i = 0; i < len; i++) {
        res.push(RNG(min, max));
    }
    return res;
}
const myArr = RNGSequence(10, 0, 10);
console.log(myArr);
