const ExcelJS = verquire('exceljs');

const TEST_2244_XLSX_FILE_NAME = './spec/integration/data/test-pr-2244.xlsx';

describe('pull request  2244', () => {
  it('pull request 2244- Fix xlsx.writeFile() not catching error when error occurs', async () => {
    async function test() {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('sheet');
      const imageId1 = workbook.addImage({
        filename: 'path/to/image.jpg', // Non-existent file
        extension: 'jpeg',
      });
      worksheet.addImage(imageId1, 'B2:D6');
      await workbook.xlsx.writeFile(TEST_2244_XLSX_FILE_NAME);
    }
    let error;
    try {
      await test();
    } catch (err) {
      error = err;
    }
    expect(error).to.be.an('error');
  });
});
