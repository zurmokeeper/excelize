const ExcelJS = verquire('exceljs');

// const NEW_TEST_17_XLSX_FILE_NAME = './spec/integration/data/test-new-pr-17.xlsx';

describe('new pr related issues', () => {
  describe('new pr 17 serialize and deserialize multiple print areas on one worksheet', () => {
    it('Multiple print areas can be correctly read to settings', async () => {
      const wb = new ExcelJS.Workbook();
      const ws = wb.addWorksheet('sheet');
      const writePrintArea = 'A2:B5&&A7:B10&&A13:B17';
      ws.pageSetup.printArea = writePrintArea;
      //   await wb.xlsx.writeFile(NEW_TEST_17_XLSX_FILE_NAME);
      const buffer = await wb.xlsx.writeBuffer();
      await wb.xlsx.load(buffer);
      const worksheet = wb.getWorksheet('sheet');
      const readPintArea = worksheet.pageSetup.printArea;
      expect(writePrintArea).to.equal(readPintArea);
    });
  });
});
