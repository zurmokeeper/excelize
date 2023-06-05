const ExcelJS = verquire('exceljs');

const TEST_1262_XLSX_FILE_NAME = './spec/integration/data/test-pr-1262.xlsx';

describe('github issues', () => {
  it('pull request 1262 - protect should work with streaming workbook writer', async () => {
    const workbook = new ExcelJS.stream.xlsx.WorkbookWriter({
      filename: TEST_1262_XLSX_FILE_NAME,
    });

    const sheet = workbook.addWorksheet('data');
    const row = sheet.addRow(['readonly cell']);
    row.getCell(1).protection = {
      locked: true,
    };

    expect(sheet.protect).to.exist();

    sheet.protect('password', {
      spinCount: 1,
    });

    await workbook.commit();

    // read in file and ensure sheetProtection is there:
    const checkBook = new ExcelJS.Workbook();
    await checkBook.xlsx.readFile(TEST_1262_XLSX_FILE_NAME);

    const checkSheet = checkBook.getWorksheet('data');
    expect(checkSheet.sheetProtection.spinCount).to.equal(1);
  });
});
