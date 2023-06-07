const ExcelJS = verquire('exceljs');

const TEST_1899_XLSX_FILE_NAME = './spec/integration/data/test-pr-1899.xlsx';

describe('pull request  1899', () => {
  it('pull request 1899- Support nested columns feature', async () => {
    async function test() {
      const workbook = new ExcelJS.Workbook();
      //   const worksheet = workbook.addWorksheet('sheet');
      const worksheet = workbook.addWorksheet('sheet', {
        // properties: {defaultColWidth: 25},
        views: [{state: 'frozen', xSplit: 0, ySplit: 3}], // 冻结第1行和第二行
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
            {
              id: 45,
              title: 'Zoo 4',
              children: [
                {id: 451, title: 'Zoo 3XXXX'},
                {id: 452, title: 'Zoo 3XXXX1232'},
              ],
            },
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
        [
          1,
          'electron',
          'DOB',
          'DOB',
          'DOB',
          'DOB',
          'DOB',
          'DOB',
          'DOB',
          'DOB',
          'DOB',
          'DOB',
          'DOB',
          'DOB',
        ],
        [null, null, null, null, null, 'DOB'],
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

    // expect(error).to.be.an('error');
  });
});
