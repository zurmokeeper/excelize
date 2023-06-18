const ExcelJS = verquire('exceljs');
const fs = require('fs');

const TEST_2247_STD_XLSX_FILE_NAME =
  './spec/integration/data/emca376-standard-123456.xlsx';
const TEST_2247_AGILE_XLSX_FILE_NAME =
  './spec/integration/data/emca376-agile-123456.xlsx';

describe('pr related issues', () => {
  describe('pr add the function of reading encrypted xlsx ', () => {
    it('workbook.xlsx.readFile, ecma376_standard encryption method decrypted successfully', async () => {
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(TEST_2247_STD_XLSX_FILE_NAME, {
        password: '123456',
      });
      const sheetName = workbook.getWorksheet(1).name;
      expect(sheetName).to.equal('Sheet1');
    }).timeout(10000);

    it('workbook.xlsx.readFile, ecma376_agile encryption method decrypted successfully', async () => {
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(TEST_2247_AGILE_XLSX_FILE_NAME, {
        password: '123456',
      });
      const sheetName = workbook.getWorksheet(1).name;
      expect(sheetName).to.equal('Sheet1');
    }).timeout(10000);

    it('workbook.xlsx.load, ecma376_standard encryption method decrypted successfully ', async () => {
      const workbook = new ExcelJS.Workbook();

      await workbook.xlsx.load(fs.readFileSync(TEST_2247_STD_XLSX_FILE_NAME), {
        password: '123456',
      });
      const sheetName = workbook.getWorksheet(1).name;
      expect(sheetName).to.equal('Sheet1');
    }).timeout(10000);

    it('workbook.xlsx.load, ecma376_agile encryption method decrypted successfully ', async () => {
      const workbook = new ExcelJS.Workbook();

      await workbook.xlsx.load(
        fs.readFileSync(TEST_2247_AGILE_XLSX_FILE_NAME),
        {
          password: '123456',
        }
      );
      const sheetName = workbook.getWorksheet(1).name;
      expect(sheetName).to.equal('Sheet1');
    }).timeout(10000);

    it('workbook.xlsx.load, options.base64 = true, ecma376_standard encryption method decrypted successfully ', async () => {
      const workbook = new ExcelJS.Workbook();
      const input = fs
        .readFileSync(TEST_2247_STD_XLSX_FILE_NAME)
        .toString('base64');
      await workbook.xlsx.load(input, {
        password: '123456',
        base64: true,
      });
      const sheetName = workbook.getWorksheet(1).name;
      expect(sheetName).to.equal('Sheet1');
    }).timeout(10000);

    it('workbook.xlsx.load, options.base64 = true, ecma376_agile encryption method decrypted successfully ', async () => {
      const workbook = new ExcelJS.Workbook();
      const input = fs
        .readFileSync(TEST_2247_AGILE_XLSX_FILE_NAME)
        .toString('base64');
      await workbook.xlsx.load(input, {
        password: '123456',
        base64: true,
      });
      const sheetName = workbook.getWorksheet(1).name;
      expect(sheetName).to.equal('Sheet1');
    }).timeout(10000);

    it('workbook.xlsx.read, ecma376_standard encryption method decrypted successfully ', async () => {
      const workbook = new ExcelJS.Workbook();
      const input = fs.createReadStream(TEST_2247_STD_XLSX_FILE_NAME);
      await workbook.xlsx.read(input, {
        password: '123456',
      });
      const sheetName = workbook.getWorksheet(1).name;
      expect(sheetName).to.equal('Sheet1');
    }).timeout(10000);

    it('workbook.xlsx.read, ecma376_agile encryption method decrypted successfully ', async () => {
      const workbook = new ExcelJS.Workbook();
      const input = fs.createReadStream(TEST_2247_AGILE_XLSX_FILE_NAME);
      await workbook.xlsx.read(input, {
        password: '123456',
      });
      const sheetName = workbook.getWorksheet(1).name;
      expect(sheetName).to.equal('Sheet1');
    }).timeout(10000);
  });
});
