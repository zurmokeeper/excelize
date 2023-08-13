const path = require('path');
const fs = require('fs');

const ExcelJS = verquire('exceljs');
const fileName = './spec/integration/data/test-new-issue-22.xlsx';

describe('github issues', () => {
  describe('new issue 22 - Memory overload when unnecessary dataValidations apply', () => {
    it('when using readFile', async () => {
      const wb = new ExcelJS.Workbook();
      await wb.xlsx.readFile(fileName, {
        ignoreNodes: ['dataValidations'],
      });

      expect(true).to.equal(true);
    });

    it('when loading an in memory buffer', async () => {
      const filePath = path.join(process.cwd(), fileName);
      const buffer = fs.readFileSync(filePath);
      const wb = new ExcelJS.Workbook();
      await wb.xlsx.load(buffer, {
        ignoreNodes: ['dataValidations'],
      });

      expect(true).to.equal(true);
    });

    it('when using read', async () => {
      const wb = new ExcelJS.Workbook();
      const input = fs.createReadStream(fileName);
      await wb.xlsx.read(input, {
        ignoreNodes: ['dataValidations'],
      });

      expect(true).to.equal(true);
    });
  });
});
