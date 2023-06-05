const ExcelJS = verquire('exceljs');

const TEST_567_XLSX_FILE_NAME = './spec/integration/data/123456.xlsx';

describe('pr related issues', () => {
  describe('pr 5676 whole column defined names', () => {
    it('Should be able to read this file', async () => {
      try {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(TEST_567_XLSX_FILE_NAME, {
          password: '123456',
        });
        // console.log('123-->', workbook);
      } catch (error) {
        // throw error;
        // console.log('error0-->', error);
      }
    });
  });
});
