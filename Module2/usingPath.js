const path = require('path');
console.log(path.basename(__filename));
console.log(path.extname(__filename));
console.log(path.dirname(__filename));
console.log(path.basename(path.dirname(__filename)));
console.log(path.dirname(path.dirname(__filename)));
console.log(path.join('one', 'two', 'three'));
console.log(path.resolve('one', 'two', 'three'));
