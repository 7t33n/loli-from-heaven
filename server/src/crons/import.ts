import * as xlsx from 'xlsx';
import * as fs from 'fs';
import { IMPORT_QUEUE } from "../const/queue";
import { onlyUnique } from "../helpers/unique";
import tableFields from "../helpers/fields";
import {Ears} from "../models/ears.model";
import {Kind} from "../models/kind.model";
import {Tail} from "../models/tail.model";
import {Sex} from "../models/sex.model";
import {Breed} from "../models/breed.model";
import {Color} from "../models/color.model";
import {Fur} from "../models/fur.model";
import {Size} from "../models/size.model";
import {Animal} from "../models/animal.model";
import {deathReason} from "../models/deathreason.model";
import {Reasonout} from "../models/reasonout.model";
import {Shelter} from "../models/shelter.modal";

const getDirectoryArray = async (data, field, field2, db) => {
    const dbData = await db.findAll();
    return data
        .map((item) => (item[field][field2].toLowerCase().trim()))
        .filter(onlyUnique)
        .map((item) => ({
            value: item,
        }))
        .map((item) => {
            const data = dbData.find((ear) => (item.value === ear.value.toLowerCase()));
            if (data) return false;
            return item;
        })
        .filter((item) => (item));
}

const getCurrentAge = (badDate) => {
    const split = badDate.split('-');
    if (split[1]) {
        return new Date().getFullYear() - new Date(`20${split[1]}`).getFullYear();
    }
    return new Date().getFullYear() - new Date(split[0]).getFullYear();
}

const getSocializedStatus = (social) => (social === 'да' ? 'социализирован' : 'несоциализирован');

const getVaccinationStatus = (vac) => (vac ? 'вакцинирован': 'невакцинирован');

const getImage = (shelter, record) => {
    return `/uploads/images/${shelter.trim()}/${record}.jpg`;
};

const getAnimalsCurrentData = async (data) => {
    return await Promise.all(data.map(async (item) => {
        const SizeId = await Size.findOne({
            where: {
                value: item.general.size,
            }
        });
        const KindId = await Kind.findOne({
            where: {
                value: item.general.kind,
            }
        });
        const BreedId = await Breed.findOne({
            where: {
                value: item.general.breed,
            }
        });
        const SexId = await Sex.findOne({
            where: {
                value: item.general.sex,
            }
        });
        const FurId = await Fur.findOne({
            where: {
                value: item.general.fur,
            }
        });
        const TailId = await Tail.findOne({
            where: {
                value: item.general.tail,
            }
        });
        const ColorId = await Color.findOne({
            where: {
                value: item.general.color,
            }
        });
        const EarsId = await Ears.findOne({
            where: {
                value: item.general.ears,
            }
        });
        const ReasonoutId = await Reasonout.findOne({
            where: {
                value: item.newOwners.reason,
            }
        });
        const ShelterId = await Shelter.findOne({
            where: {
                address: item.responsible.address.trim(),
            }
        });


        return {
            SizeId: SizeId ? SizeId.id : null,
            KindId: KindId ? KindId.id : null,
            BreedId: BreedId ? BreedId.id : null,
            SexId: SexId ? SexId.id : null,
            FurId: FurId ? FurId.id : null,
            TailId: TailId ? TailId.id : null,
            ColorId: ColorId ? ColorId.id : null,
            EarsId: EarsId ? EarsId.id : null,
            deathReasonId: null,
            ReasonoutId: ReasonoutId ? ReasonoutId.id : null,
            ReasoneuthId: null,
            ShelterId: ShelterId ? ShelterId.id : null,
            Socialized: getSocializedStatus(item.additional.socialized),
            name: item.general.nickname,
            record: item.record,
            markerId: item.additional.markerId,
            dateIn: new Date(item.newOwners.entryDate).toLocaleDateString(),
            age: getCurrentAge(item.general.year),
            signs: item.general.signs,
            dateSterilization: new Date(item.additional.sterilization).toLocaleDateString(),
            dateOut: new Date(item.newOwners.leaveDate).toLocaleDateString(),
            weight: item.general.weight,
            doctor: item.additional.doctorFullName,
            vaccination: getVaccinationStatus(item.vaccination.type.trim()),
            image: getImage(item.responsible.address, item.record),
        }
    }));
};

export default async function importCron(cron) {
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
    await Ears.bulkCreate<Ears>(await getDirectoryArray(endData, 'general', 'ears', Ears));
    await Kind.bulkCreate<Kind>(await getDirectoryArray(endData, 'general', 'kind', Kind));
    await Tail.bulkCreate<Tail>(await getDirectoryArray(endData, 'general', 'tail', Tail));
    await Sex.bulkCreate<Sex>(await getDirectoryArray(endData, 'general', 'sex', Sex));
    await Breed.bulkCreate<Breed>(await getDirectoryArray(endData, 'general', 'breed', Breed));
    await Color.bulkCreate<Color>(await getDirectoryArray(endData, 'general', 'color', Color));
    await Fur.bulkCreate<Fur>(await getDirectoryArray(endData, 'general', 'fur', Fur));
    await Size.bulkCreate<Size>(await getDirectoryArray(endData, 'general', 'size', Size));
    await Animal.bulkCreate<Size>(await getAnimalsCurrentData(endData));
    fs.unlink(`${__dirname}/../uploads/imports/${filename}`, (err) => { console.log(err) });
    IMPORT_QUEUE.pop();
    cron.start();
}

/*
{
    dls_name: 'value from field'
}
 */
