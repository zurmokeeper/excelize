const {PassThrough} = require('readable-stream');
const express = require('express');
const got = require('got');
const testutils = require('../utils/index');

const Excel = verquire('exceljs');

const password = '123456';

describe('Express test workbook.xlsx.write encryption', () => {
  let server;
  before(() => {
    const app = express();
    app.get('/workbook', (req, res) => {
      const wb = testutils.createTestBook(new Excel.Workbook(), 'xlsx');
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
      res.setHeader('Content-Disposition', 'attachment; filename=Report.xlsx');
      wb.xlsx.write(res, {password}).then(() => {
        res.end();
      });
    });
    server = app.listen(3003);
  });

  after(() => {
    server.close();
  });

  it('downloads a workbook, workbook.xlsx.write encryption successful', async function() {
    this.timeout(50000);
    const res = got.stream('http://127.0.0.1:3003/workbook', {
      decompress: false,
    });
    const wb2 = new Excel.Workbook();
    // TODO: Remove passThrough with got 10+ (requires node v10+)
    await wb2.xlsx.read(res.pipe(new PassThrough()), {password});
    testutils.checkTestBook(wb2, 'xlsx');
  });
});
