import * as xlsx from 'xlsx';
import * as fs from 'fs';
import { IMPORT_QUEUE } from "../const/queue";
import { onlyUnique } from "../helpers/unique";
import tableFields from "../helpers/fields";

const getDirectoryArray = (data, field, field2) => {
    return data
        .map((item) => (item[field][field2].toLowerCase()))
        .filter(onlyUnique)
        .map((item, index) => ({
            id: index + 1,
            value: item,
        }));
}

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

    for (let i = 3; i < maxRowIndex; i++) {
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
                    endData[i - 3][tableFields[letters].value] = data[`${letters}${i}`] ? data[`${letters}${i}`].v : '';
                } else {
                    endData[i - 3][tableFields[letters].category][tableFields[letters].value] = data[`${letters}${i}`] ? data[`${letters}${i}`].w : '';
                }
            }
        }
    }
    const shelterData = endData
        .map((item) => {
            const field = item.responsible;
            return `${field.address.toLowerCase()}/${field.organization.toLowerCase()}/${field.CEOFullName.toLowerCase()}`;
        })
        .filter(onlyUnique)
        .map((item, index) => {
            const split = item.split('/');
            return {
                id: index + 1,
                address: split[0],
                name: split[1],
                director: split[2],
            }
        })
    fs.writeFile(`${__dirname}/../mock/animals.json`, JSON.stringify(endData), (err) => { console.log(err) });
    fs.writeFile(`${__dirname}/../mock/ears.json`, JSON.stringify(getDirectoryArray(endData, 'general', 'ears')), (err) => { console.log(err) });
    fs.writeFile(`${__dirname}/../mock/kind.json`, JSON.stringify(getDirectoryArray(endData, 'general', 'kind')), (err) => { console.log(err) });
    fs.writeFile(`${__dirname}/../mock/tail.json`, JSON.stringify(getDirectoryArray(endData, 'general', 'tail')), (err) => { console.log(err) });
    fs.writeFile(`${__dirname}/../mock/sex.json`, JSON.stringify(getDirectoryArray(endData, 'general', 'sex')), (err) => { console.log(err) });
    fs.writeFile(`${__dirname}/../mock/breed.json`, JSON.stringify(getDirectoryArray(endData, 'general', 'breed')), (err) => { console.log(err) });
    fs.writeFile(`${__dirname}/../mock/color.json`, JSON.stringify(getDirectoryArray(endData, 'general', 'color')), (err) => { console.log(err) });
    fs.writeFile(`${__dirname}/../mock/fur.json`, JSON.stringify(getDirectoryArray(endData, 'general', 'fur')), (err) => { console.log(err) });
    fs.writeFile(`${__dirname}/../mock/size.json`, JSON.stringify(getDirectoryArray(endData, 'general', 'size')), (err) => { console.log(err) });
    fs.writeFile(`${__dirname}/../mock/anamnesis.json`, JSON.stringify(getDirectoryArray(endData, 'health', 'anamnesis')), (err) => { console.log(err) });
    fs.writeFile(`${__dirname}/../mock/shelter.json`, JSON.stringify(shelterData), (err) => { console.log(err) });
    fs.unlink(`${__dirname}/../uploads/imports/${filename}`, (err) => { console.log(err) });
    IMPORT_QUEUE.pop();
    cron.start();
}

/*
{
    dls_name: 'value from field'
}
 */
