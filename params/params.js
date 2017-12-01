'use strict';

// console.log(process.argv);

console.log(
    process.argv
        .slice(2)
        .join(' ')
        .split('--')
        .filter(string => string)
        .map(param => param.trim().split(' '))
        .map(([param, ...pieces]) => [param, pieces.join(' ')])
        // .sort((param1, param2) => param1 > param2) // obsolete step
        .reduce((final, [param, value]) => Object.assign(final, {[param]: Number(value) || value}), {})
);