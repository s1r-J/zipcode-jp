import * as fs from 'fs';
import path from 'path';

declare namespace zipcode {
    interface ZipCodeRecord {
        jis: string;
        oldZipCode: string;
        zipCode: string;
        prefKana: string;
        cityKana: string;
        townKana: string;
        pref: string;
        city: string;
        town: string;
        multiZipCode: string;
        koaza: string;
        block: string;
        multiTown: string;
        update: string;
        reason: string;    
    }

    interface JigyosyoRecord {
        jis: string;
        jigyosyoKana: string;
        jigyosyo: string;
        pref: string;
        city: string;
        town: string;
        unit: string;
        zipCode: string;
        oldZipCode: string;
        office: string;
        codeType: string;
        multiCode: string;
        reviseCode: string;       
    }

    type AllRecord = ZipCodeRecord & JigyosyoRecord;
}

let zipCodeRecords: zipcode.ZipCodeRecord[];
let jigyosyoRecords: zipcode.JigyosyoRecord[];

function loadData(): void {
    const data: string = fs.readFileSync(path.resolve(__dirname, '../data/zip_codes.csv'), 'utf8');
    const lines: string[] = data.split('\r\n');

    zipCodeRecords = [];
    lines.forEach(function(line) {
        let parts: string[] = line.split(',').map(c => c.replace(/"/g, ''));
        let record: zipcode.ZipCodeRecord = {
            jis: parts[0],
            oldZipCode: parts[1],
            zipCode: parts[2],
            prefKana: parts[3],
            cityKana: parts[4],
            townKana: parts[5],
            pref: parts[6],
            city: parts[7],
            town: parts[8],
            multiZipCode: parts[9],
            koaza: parts[10],
            block: parts[11],
            multiTown: parts[12],
            update: parts[13],
            reason: parts[14],
        };

        zipCodeRecords.push(record);
    });
}

function loadDataJigyosyo(): void {
    const data: string = fs.readFileSync(path.resolve(__dirname + '../data/jigyosyo_zip_codes.csv'), 'utf8');
    const lines: string[] = data.split('\r\n');

    jigyosyoRecords = [];
    lines.forEach(function(line) {
        let parts: string[] = line.split(',').map(c => c.replace(/"/g, ''));
        let record: zipcode.JigyosyoRecord = {
            jis: parts[0],
            jigyosyoKana: parts[1],
            jigyosyo: parts[2],
            pref: parts[3],
            city: parts[4],
            town: parts[5],
            unit: parts[6],
            zipCode: parts[7],
            oldZipCode: parts[8],
            office: parts[9],
            codeType: parts[10],
            multiCode: parts[11],
            reviseCode: parts[12],
        };

        jigyosyoRecords.push(record);
    });
}

function lookup(zip: string): zipcode.ZipCodeRecord[]  {
    const target: string = zip.replace(/[^0-9]/g, '');
    if (target.length < 3 || target.length > 7) {
        return [];
    }
    
    if (!zipCodeRecords) {
        loadData();
    }
    
    let found: zipcode.ZipCodeRecord[] = [];
    for (let i = 0; i < zipCodeRecords.length; i++) {
        let r = zipCodeRecords[i];
        if (target.length === 7 && r.zipCode === target) {
            found.push(r);
        } else if (target.length < 7 && String(r.zipCode).startsWith(target)) {
            found.push(r);
        }
    }
    
    return found;
};

function lookupJigyosyo(zip: string): zipcode.JigyosyoRecord[] {
    const target: string = zip.replace(/[^0-9]/g, '');
    if (target.length < 3 || target.length > 7) {
        return [];
    }
    
    if (!jigyosyoRecords) {
        loadDataJigyosyo();
    }
    
    let found: zipcode.JigyosyoRecord[] = [];
    for (let i = 0; i < jigyosyoRecords.length; i++) {
        let r: zipcode.JigyosyoRecord = jigyosyoRecords[i];
        if (target.length === 7 && r.zipCode === target) {
            found.push(r);
        } else if (target.length < 7 && String(r.zipCode).startsWith(target)) {
            found.push(r);
        }
    }
    
    return found;
};

function lookupAll(zip: string): zipcode.AllRecord[] {

    let foundKen: zipcode.ZipCodeRecord[] = lookup(zip);
    let foundJigyosyo: zipcode.JigyosyoRecord[] = lookupJigyosyo(zip);

    let ka = foundKen.map(r => {
        return {
            type: 'ken_all',
            ...r,
            unit: '',
            jigyosyoKana: '',
            jigyosyo: '',
            office: '',
            codeType: '',
            multiCode: '',
            reviseCode: '',
        }
    });

    let ja = foundJigyosyo.map(r => {
        return {
            type: 'jigyosyo',
            ...r,
            jis: '',
            oldZipCode: '',
            zipCode: '',
            prefKana: '',
            cityKana: '',
            townKana: '',
            multiZipCode: '',
            koaza: '',
            block: '',
            multiTown: '',
            update: '',
            reason: '',
        }
    });

    return [...ka, ...ja];
};

export {lookup, lookupJigyosyo, lookupAll};
