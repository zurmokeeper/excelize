const ExcelJS = verquire('exceljs');

const TEST_1899_XLSX_FILE_NAME = './spec/integration/data/test-pr-1899.xlsx';

describe('pull request  1899', () => {
  it('pull request 1899- Support nested columns feature', async () => {
    async function test() {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Sheet1', {
        // properties: {defaultColWidth: 25},
        views: [{state: 'frozen', xSplit: 0, ySplit: 2}], // 冻结第1行和第二行
      });

      worksheet.makeColumns([
        {
          id: 1,
          title: '姓名',
        },
        {id: 2, title: 'Qwe'},
        {id: 3, title: 'Foo'},
        {
          id: 4,
          title: '基础信息',
          children: [
            {id: 41, title: 'Zoo 1'},
            {id: 42, title: 'Zoo 2'},
            {id: 44, title: 'Zoo 3'},
          ],
        },
        {
          id: 5,
          title: 'Zoo1',
          children: [
            {id: 51, title: 'Zoo 51'},
            {id: 52, title: 'Zoo 52'},
            {id: 54, title: 'Zoo 53'},
          ],
        },
        {id: 6, title: 'Foo123213'},
      ]);
      const data = [
        [1, 2, 3, null, null, 'DOB'],
        [1, 'electron', 'DOB'],
        [1, 'electron', 'DOB'],
        [1, 'electron', 'DOB'],
        [1, 'electron', 'DOB'],
        [1, 'electron', 'DOB'],
        [1, 'electron', 'DOB'],
        [1, 'electron', 'DOB'],
      ];
      worksheet.addRows(data);
      worksheet.columns.forEach(function(column) {
        column.alignment = {horizontal: 'center', vertical: 'middle'};
      });
      await workbook.xlsx.writeFile(TEST_1899_XLSX_FILE_NAME);
    }

    await test();

    const workbookReader = new ExcelJS.Workbook();
    await workbookReader.xlsx.readFile(TEST_1899_XLSX_FILE_NAME);
    const worksheetReader = workbookReader.getWorksheet('Sheet1');

    const actualRows = worksheetReader.getSheetValues();

    // TODO: Why is the first data always null
    const expectedRows = [
      null,
      [
        null,
        '姓名',
        'Qwe',
        'Foo',
        '基础信息',
        '基础信息',
        '基础信息',
        'Zoo1',
        'Zoo1',
        'Zoo1',
        'Foo123213',
      ],
      [
        null,
        '姓名',
        'Qwe',
        'Foo',
        'Zoo 1',
        'Zoo 2',
        'Zoo 3',
        'Zoo 51',
        'Zoo 52',
        'Zoo 53',
        'Foo123213',
      ],
      [null, 1, 2, 3, null, null, 'DOB'],
      [null, 1, 'electron', 'DOB'],
      [null, 1, 'electron', 'DOB'],
      [null, 1, 'electron', 'DOB'],
      [null, 1, 'electron', 'DOB'],
      [null, 1, 'electron', 'DOB'],
      [null, 1, 'electron', 'DOB'],
      [null, 1, 'electron', 'DOB'],
    ];
    expect(JSON.stringify(actualRows)).to.equal(JSON.stringify(expectedRows));
  });
});
