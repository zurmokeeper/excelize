// const testXformHelper = require('../test-xform-helper');

// const LnXform = verquire('xlsx/xform/drawing/ln-xform');

// const expectations = [
//   {
//     title: 'solidFill',
//     create() {
//       return new LnXform();
//     },
//     preparedModel: {w: '12700'},
//     parsedModel: {schemeColor: 'accent1', shade: 0.5, opacity: 1},
//     xml:
//     '<a:ln w="12700">' +
//         '<a:solidFill/>' +
//     '</a:ln>',
//     tests: ['render', 'parse'],
//   },
//   {
//     title: 'noFill',
//     create() {
//       return new LnXform();
//     },
//     preparedModel: null,
//     xml:
//     '<a:ln w="12700">' +
//         '<a:noFill/>' +
//     '</a:ln>',
//     tests: ['render'],
//   },
// ];

// describe('LnXform', () => {
//   testXformHelper(expectations);
// });
