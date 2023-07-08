const _ = verquire('utils/under-dash');
const util = require('util');

describe('under-dash', () => {
  describe('isEqual', () => {
    const values = [
      0,
      1,
      true,
      false,
      'string',
      'foobar',
      'other string',
      [],
      ['array'],
      ['array', 'foobar'],
      ['array2'],
      ['array2', 'foobar'],
      {},
      {object: 1},
      {object: 2},
      {object: 1, foobar: 'quux'},
      {object: 2, foobar: 'quux'},
      null,
      undefined,
      () => {},
      () => {},
      Symbol('foo'),
      Symbol('foo'),
      Symbol('bar'),
    ];

    function showVal(o) {
      return util.inspect(o, {compact: true});
    }

    it('works on simple values', () => {
      for (let i = 0; i < values.length; i++) {
        for (let j = 0; j < values.length; j++) {
          const a = values[i];
          const b = values[j];

          const assertion = `${showVal(a)} ${i === j ? '==' : '!='} ${showVal(
            b
          )}`;
          expect(_.isEqual(a, b)).to.equal(i === j, `expected ${assertion}`);
        }
      }
    });

    it('works on complex arrays', () => {
      for (let i = 0; i < values.length; i++) {
        for (let j = 0; j < values.length; j++) {
          const a = [values[i]];
          const b = [values[j]];

          const assertion = `${showVal(a)} ${i === j ? '==' : '!='} ${showVal(
            b
          )}`;
          expect(_.isEqual(a, b)).to.equal(i === j, `expected ${assertion}`);
        }
      }
    });

    it('works on complex objects', () => {
      for (let i = 0; i < values.length; i++) {
        for (let j = 0; j < values.length; j++) {
          const a = {key: values[i]};
          const b = {key: values[j]};

          const assertion = `${showVal(a)} ${i === j ? '==' : '!='} ${showVal(
            b
          )}`;
          expect(_.isEqual(a, b)).to.equal(i === j, `expected ${assertion}`);
        }
      }
    });
  });

  describe('cloneDeep', () => {
    it('should be null', () => {
      const clone = _.cloneDeep(null);

      expect(clone).to.be.equal(null);
    });
    it('should be date', () => {
      const myDate = new Date(Date.UTC(2017, 11, 15, 17, 0, 0, 0));
      const cloneDate = _.cloneDeep(myDate);

      expect(cloneDate).to.deep.equal(myDate);
    });
    it('should be string', () => {
      const clone = _.cloneDeep('string');

      expect(clone).to.equal('string');
    });
    it('should be array', () => {
      const origin = [1, 2, [3, undefined, [5]]];
      const clone = _.cloneDeep(origin);

      expect(clone).to.deep.equal(origin);

      origin.push(6);

      expect(clone).not.to.deep.equal(origin);
    });
    it('should be object', () => {
      const origin = {
        name: 'test',
        goods: [1, 2, 3, [4]],
        theme: {
          font: 'red',
          size: 12,
          border: undefined,
        },
      };
      const clone = _.cloneDeep(origin);

      expect(clone).to.deep.equal(origin);

      origin.theme.size = 13;

      expect(clone).not.to.deep.equal(origin);
    });
  });
});
