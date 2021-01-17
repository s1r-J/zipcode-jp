const fs = require('fs');

let zipCodeRecords;

function loadData() {
    let data = fs.readFileSync(__dirname + '/zip_codes.csv', 'utf8');
    const lines = data.split('\r\n');

    zipCodeRecords = [];
    lines.forEach(function(line) {
        let parts = line.split(',').map(c => c.replace(/"/g, ''));
        let record = {
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

exports.lookup = function(zip) {
    const target = zip.replace(/[^0-9]/g, '');
    if (target.length < 3 || target.length > 7) {
        return [];
    }
    
    if (!zipCodeRecords) {
        loadData();
    }
    
    let found = [];
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
