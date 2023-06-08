const ExcelJS = verquire('exceljs');

const test = './spec/integration/data/new-issue-2-test-encryption.xlsx';

describe('github issues', () => {
  describe('github issues encrypted xlsx ', () => {
    it('workbook.xlsx.writeFile, ecma376_agile encryption successful', async () => {
      const password = '123456';
      const writeWorkbook = new ExcelJS.Workbook();
      writeWorkbook.addWorksheet('Sheet1');
      await writeWorkbook.xlsx.writeFile(test, {password});

      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(test, {
        password,
      });
      const sheetName = workbook.getWorksheet(1).name;
      expect(sheetName).to.equal('Sheet1');
    }).timeout(10000);

    it('workbook.xlsx.writeBuffer, ecma376_agile encryption successful', async () => {
      const password = '123456';
      const writeWorkbook = new ExcelJS.Workbook();
      writeWorkbook.addWorksheet('Sheet1');
      const encryptBuffer = await writeWorkbook.xlsx.writeBuffer({password});

      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(encryptBuffer, {
        password,
      });
      const sheetName = workbook.getWorksheet(1).name;
      expect(sheetName).to.equal('Sheet1');
    }).timeout(10000);
  });
});
