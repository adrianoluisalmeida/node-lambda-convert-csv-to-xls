const ExcelJS = require('exceljs');

const options = {
  parserOptions: {
    delimiter: ';',
    quote: '"',
    rowDelimiter: "\n"
  }
};

function readCSV(filepath) {
  const workbook = new ExcelJS.Workbook();
  return workbook.csv.readFile(filepath, options).then(() => workbook);
}

function writeXLSX(filepath, workbook) {
  return workbook.xlsx.writeFile(filepath);
}

module.exports = function convert(inFile, outFile) {
  return readCSV(inFile).then(workbook => writeXLSX(outFile, workbook));
};

