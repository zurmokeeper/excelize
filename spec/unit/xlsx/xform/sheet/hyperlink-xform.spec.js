const testXformHelper = require('../test-xform-helper');

const HyperlinkXform = verquire('xlsx/xform/sheet/hyperlink-xform');

const expectations = [
  {
    title: 'Web Link',
    create() {
      return new HyperlinkXform();
    },
    preparedModel: {address: 'B6', rId: 'rId1'},
    get parsedModel() {
      return this.preparedModel;
    },
    xml: '<hyperlink ref="B6" r:id="rId1"/>',
    tests: ['render', 'renderIn', 'parse'],
  },
  {
    title: 'Internal Link sheet1!B2',
    create() {
      return new HyperlinkXform();
    },
    preparedModel: {address: 'B6', target: '#sheet1!B2'},
    get parsedModel() {
      return this.preparedModel;
    },
    xml: '<hyperlink ref="B6" location="sheet1!B2"/>',
    // tests: ['render', 'renderIn', 'parse'],
    tests: ['render', 'renderIn'],
  },
  {
    title: 'Internal Link B2:C4',
    create() {
      return new HyperlinkXform();
    },
    preparedModel: {address: 'B6', target: '#B2:C4'},
    get parsedModel() {
      return this.preparedModel;
    },
    xml: '<hyperlink ref="B6" location="B2:C4"/>',
    // tests: ['render', 'renderIn', 'parse'],
    tests: ['render', 'renderIn'],
  },
  {
    title: 'Internal Link sheet1!B2:C4',
    create() {
      return new HyperlinkXform();
    },
    preparedModel: {address: 'B6', target: '#sheet1!B2:C4'},
    get parsedModel() {
      return this.preparedModel;
    },
    xml: '<hyperlink ref="B6" location="sheet1!B2:C4"/>',
    // tests: ['render', 'renderIn', 'parse'],
    tests: ['render', 'renderIn'],
  },
];

describe('HyperlinkXform', () => {
  testXformHelper(expectations);
});
