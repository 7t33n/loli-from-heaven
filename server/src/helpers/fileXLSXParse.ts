import * as xlsx from 'xlsx';

export default function fileXLSXParse (file) {
    const wb = xlsx.read(file, { type: 'buffer' });
    console.log(wb.Sheets[wb.SheetNames[0]]);
    console.log(xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {header:2}));
}
