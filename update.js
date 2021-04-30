const admZip = require('adm-zip');
const https = require('https');
const fs = require('fs');
const moment = require('moment');
const iconv = require('iconv-lite');
const writer = require('csv-writer').createObjectCsvWriter;

console.log('Start KEN_ALL...');

const file_url = 'https://www.post.japanpost.jp/zipcode/dl/kogaki/zip/ken_all.zip';
const csvFileName = 'KEN_ALL.CSV';

https.get(file_url, function(res) {
    let data = [], dataLen = 0; 

    res.on('data', function(chunk) {
        data.push(chunk);
        dataLen += chunk.length;
    }).on('end', function() {
        const buf = Buffer.alloc(dataLen);
        for (let i = 0, len = data.length, pos = 0; i < len; i++) { 
            data[i].copy(buf, pos); 
            pos += data[i].length; 
        } 

        console.log('Download KEN_ALL zip file.');
        const zip = new admZip(buf);
        zip.extractAllTo('./', true);

        makeZipCodesCsv();
    });
});

function makeZipCodesCsv() {

    const file = fs.readFileSync('./' + csvFileName);
    const text = iconv.decode(Buffer.from(file), 'Shift_JIS');

    let tmpLines = [];
    let csv = [];
    const lines = text.split('\r\n');
    lines.forEach((line, idx) => {
        if (line.length === 0) {
            return;
        }
        let parts = line.split(',').map(c => c.replace(/"/g, ''));
        let jis = '', oldZipCode = '', zipCode = '', prefKana = '', cityKana = '', townKana = '', pref = '', city = '', town = '', multiZipCode = '', koaza = '', block = '', multiTown = '', update = '', reason = '';
        if (tmpLines.length === 0) {
            jis = parts[0];
            oldZipCode = parts[1];
            zipCode = parts[2];
            prefKana = parts[3];
            cityKana = parts[4];
            townKana = parts[5].replace('ｲｶﾆｹｲｻｲｶﾞﾅｲﾊﾞｱｲ', '');
            pref = parts[6];
            city = parts[7];
            town = parts[8].replace('以下に掲載がない場合', '');
            multiZipCode = parts[9];
            koaza = parts[10];
            block = parts[11];
            multiTown = parts[12];
            update = parts[13];
            reason = parts[14];
            if (parts[8].includes('（') && !parts[8].includes('）')) {
                tmpLines.push(parts);
            } else {
                let record = {
                    jis: jis,
                    oldZipCode: oldZipCode,
                    zipCode: zipCode,
                    prefKana: prefKana,
                    cityKana: cityKana,
                    townKana: townKana,
                    pref: pref,
                    city: city,
                    town: town,
                    multiZipCode: multiZipCode,
                    koaza: koaza,
                    block: block,
                    multiTown: multiTown,
                    update: update,
                    reason: reason,
                };
                csv.push(record);
            }
        } else {
            tmpLines.push(parts);
            if (parts[8].includes('）')) {
                tmpLines.forEach((t) => {
                    jis += t[0];
                    oldZipCode += t[1];
                    zipCode += t[2];
                    prefKana += t[3];
                    cityKana += t[4]
                    townKana += t[5].replace('ｲｶﾆｹｲｻｲｶﾞﾅｲﾊﾞｱｲ', '');;
                    pref += t[6];
                    city += t[7];
                    town += t[8].replace('以下に掲載がない場合', '');
                    multiZipCode = t[9];
                    koaza = t[10];
                    block = t[11];
                    multiTown = t[12];
                    update = t[13];
                    reason = t[14];
                });

                let record = {
                    jis: jis,
                    oldZipCode: oldZipCode,
                    zipCode: zipCode,
                    prefKana: prefKana,
                    cityKana: cityKana,
                    townKana: townKana,
                    pref: pref,
                    city: city,
                    town: town,
                    multiZipCode: multiZipCode,
                    koaza: koaza,
                    block: block,
                    multiTown: multiTown,
                    update: update,
                    reason: reason,
                };
                csv.push(record);
                tmpLines = [];
            }
        }
    });

    console.log(`Records: ${csv.length}`);

    const csvWriter = writer({
        path: './zip_codes.csv',
        header: [
            {
                id: 'jis',
                title: 'JIS'
            },
            {
                id: 'oldZipCode',
                title: 'OldZipCode'
            },
            {
                id: 'zipCode',
                title: 'ZipCode'
            },
            {
                id: 'prefKana',
                title: 'PrefKana'
            },
            {
                id: 'cityKana',
                title: 'CityKana'
            },
            {
                id: 'townKana',
                title: 'TownKana'
            },
            {
                id: 'pref',
                title: 'Pref'
            },
            {
                id: 'city',
                title: 'City'
            },
            {
                id: 'town',
                title: 'Town'
            },
            {
                id: 'multiZipCode',
                title: 'MultiZipCode'
            },
            {
                id: 'koaza',
                title: 'Koaza'
            },
            {
                id: 'block',
                title: 'Block'
            },
            {
                id: 'multiTown',
                title: 'MultiTown'
            },
            {
                id: 'update',
                title: 'Update'
            },
            {
                id: 'reason',
                title: 'Reason'
            },
        ],
        encoding: 'utf8',
        append: false,
        recordDelimiter: '\r\n',
        alwaysQuote: true
    });

    csvWriter.writeRecords(csv)
        .then(() => {
            fs.unlinkSync(csvFileName);

            let json = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
            const version = json.version.substring(0, 6).concat(`${moment().format('YYYYMMDD')}`);
            json.version = version;
            fs.writeFileSync('./package.json', JSON.stringify(json, null, 2));

            console.log(`...Done: version is ${version}`);
    });
}

console.log('Start JIGYOSYO...');

const jigyosyo_file_url = 'https://www.post.japanpost.jp/zipcode/dl/jigyosyo/zip/jigyosyo.zip';
const jigyosyoCsvFileName = 'JIGYOSYO.CSV';

https.get(jigyosyo_file_url, function(res) {
    let data = [], dataLen = 0; 

    res.on('data', function(chunk) {
        data.push(chunk);
        dataLen += chunk.length;
    }).on('end', function() {
        const buf = Buffer.alloc(dataLen);
        for (let i = 0, len = data.length, pos = 0; i < len; i++) { 
            data[i].copy(buf, pos); 
            pos += data[i].length; 
        } 

        console.log('Download JISGYOSYO zip file.');
        const zip = new admZip(buf);
        zip.extractAllTo('./', true);

        makeJigyosyoZipCodesCsv();
    });
});

function makeJigyosyoZipCodesCsv() {

    const file = fs.readFileSync('./' + jigyosyoCsvFileName);
    const text = iconv.decode(Buffer.from(file), 'Shift_JIS');

    let csv = [];
    const lines = text.split('\r\n');
    lines.forEach((line, idx) => {
        if (line.length === 0) {
            return;
        }
        let parts = line.split(',').map(c => c.replace(/"/g, ''));
        let record = {
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
        csv.push(record);
    });

    console.log(`Records: ${csv.length}`);

    const csvWriter = writer({
        path: './jigyosyo_zip_codes.csv',
        header: [
            {
                id: 'jis',
                title: 'JIS'
            },
            {
                id: 'jigyosyoKana',
                title: 'JigyosyoKana'
            },
            {
                id: 'jigyosyo',
                title: 'Jigyosyo'
            },
            {
                id: 'pref',
                title: 'Pref'
            },
            {
                id: 'city',
                title: 'City'
            },
            {
                id: 'town',
                title: 'Town'
            },
            {
                id: 'unit',
                title: 'Unit'
            },
            {
                id: 'zipCode',
                title: 'ZipCode'
            },
            {
                id: 'oldZipCode',
                title: 'OldZipCode'
            },
            {
                id: 'office',
                title: 'Office'
            },
            {
                id: 'codeType',
                title: 'CodeType'
            },
            {
                id: 'multiCode',
                title: 'MultiCode'
            },
            {
                id: 'reviceCode',
                title: 'ReviseCode'
            },
        ],
        encoding: 'utf8',
        append: false,
        recordDelimiter: '\r\n',
        alwaysQuote: true
    });

    csvWriter.writeRecords(csv)
        .then(() => {
            fs.unlinkSync(jigyosyoCsvFileName);

            let json = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
            const version = json.version.substring(0, 6).concat(`${moment().format('YYYYMMDD')}`);
            json.version = version;
            fs.writeFileSync('./package.json', JSON.stringify(json, null, 2));

            console.log(`...Done: version is ${version}`);
    });
}