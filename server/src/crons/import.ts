import * as xlsx from 'xlsx';
import * as fs from 'fs';
import { IMPORT_QUEUE } from "../const/queue";
import { onlyUnique } from "../helpers/unique";
import tableFields from "../helpers/fields";

export default function importCron(cron) {
    const filename = IMPORT_QUEUE[IMPORT_QUEUE.length - 1];
    const wb = xlsx.readFile(`${__dirname}/../uploads/imports/${filename}`);
    const data = wb.Sheets['Лист'];
    let endData = [];
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

    for (let i = 1; i < maxRowIndex; i++) {
        endData.push({
            general: {},
            additional: {},
            catch: {},
            newOwners: {},
            responsible: {},
            treatment: {},
            vaccination: {},
            health: {},
        });

        for (let j = 0; j < allColumnLetters.length; j++) {
            const letters = allColumnLetters[j];
            const key = tableFields[letters];
            if (key) {
                if (key.category === null) {
                    endData[i - 1][tableFields[letters].value] = data[`${letters}${i}`] ? data[`${letters}${i}`].v : '';
                } else {
                    endData[i - 1][tableFields[letters].category][tableFields[letters].value] = data[`${letters}${i}`] ? data[`${letters}${i}`].w : '';
                }
            }
        }
    }
    fs.writeFile(`${__dirname}/../mock/animals.json`, JSON.stringify(endData), (err) => { console.log(err) });
    fs.unlink(`${__dirname}/../uploads/imports/${filename}`, (err) => { console.log(err) });
    IMPORT_QUEUE.pop();
    cron.start();
}

/*
{
    dls_name: 'value from field'
}
 */
