import * as xlsx from 'xlsx';
import { IMPORT_QUEUE } from "../const/queue";
import { onlyUnique } from "../helpers/unique";

export default function importCron(cron) {
    const filename = IMPORT_QUEUE[IMPORT_QUEUE.length - 1];
    const wb = xlsx.readFile(`${__dirname}/../uploads/imports/${filename}`);
    const data = wb.Sheets['Лист'];
    let endData = {};
    let allField = [];
    const fields = Object.keys(data)
        .filter((item) => (item !== '!ref' && item !== '!margins' && item !== '!autofilter' && item !== '!merges'));
    const allColumnLetters = fields
        .map((field) => (field.replace(/\d/g, '')))
        .filter(onlyUnique);
    const maxRowIndex = Math.max.apply(
        null,
        fields
            .map((field) => (field.replace(/\D/g, '')))
            .filter(onlyUnique));
    for (let i = 0; i < allColumnLetters.length - 1; i++) {
        const letters = allColumnLetters[i];

    }
    IMPORT_QUEUE.pop();
    setTimeout(() => {
        cron.start();
    }, 10000)
}

/*
{
    dls_name: 'value from field'
}
 */
