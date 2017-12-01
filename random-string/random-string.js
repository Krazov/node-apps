'use strict';

// declarations
const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const lastIndex = alphabet.length - 1;

const {abs, floor, random} = Math;

// params
const config = 
    process.argv
        .slice(2)
        .reduce(
        (final, current) => {
            const [key, value] = current.split('=');

            return final.hasOwnProperty(key) && value
                ? Object.assign(final, {[key]: Number(value) || final[key]})
                : final;
            },
            {
                limit: 10,
                difference: 2,
                help: 0
            }
        );

// pre-conditions
if (config.help) {
    console.log(``);
    console.log(`= Random string`);
    console.log(``);
    console.log(`Application generates random string from characters: "${alphabet}".`);
    console.log(``);
    console.log(`== Params`);
    console.log(``);
    console.log(`* limit - the length of string (default: 10)`);
    console.log(`* difference - difference beetween indexes of two consequtive characters in string (default: 2)`);
    console.log(``);
    console.log(`== Examples`);
    console.log(``);
    console.log(`  node random-string.js limit=16 difference=4`);
    console.log(``);
    console.log(`To see this information, type:`);
    console.log(``);
    console.log(`  node random-string.js help=1`);
    console.log(``);

    process.exit(1);
}

// main
main().then(name => {
    console.log(name);
})

// components
function main() {
    return new Promise(resolve => {
        generate(resolve);
    });
}

function generate(resolve = () => {}, name = '', limit = config.limit) {
    return name.length < limit
        ? setImmediate(() => {
            generate(
                resolve,
                name.concat(drawUniqueLetter(name.slice(-1))), 
                limit
            )
        })
        : resolve(name);
}

function drawUniqueLetter(lastLetter = '') {
    const letter = drawLetter();

    return shouldDrawAgain(letter, lastLetter)
        ? drawUniqueLetter()
        : letter;
}

function drawLetter() {
    return alphabet[trueRandom(0, lastIndex)];
}

function trueRandom(from = 0, to = 100) {
    return floor(random() * to) + from;
}

function shouldDrawAgain(letter = '', lastLetter = '') {
    return abs(getIndex(letter) - getIndex(lastLetter)) < config.difference;
}

function getIndex(letter = '') {
    return alphabet.indexOf(letter);
}