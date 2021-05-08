var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import * as fs from 'fs';
var zipCodeRecords;
var jigyosyoRecords;
function loadData() {
    var data = fs.readFileSync(__dirname + '/zip_codes.csv', 'utf8');
    var lines = data.split('\r\n');
    zipCodeRecords = [];
    lines.forEach(function (line) {
        var parts = line.split(',').map(function (c) { return c.replace(/"/g, ''); });
        var record = {
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
function loadDataJigyosyo() {
    var data = fs.readFileSync(__dirname + '/jigyosyo_zip_codes.csv', 'utf8');
    var lines = data.split('\r\n');
    jigyosyoRecords = [];
    lines.forEach(function (line) {
        var parts = line.split(',').map(function (c) { return c.replace(/"/g, ''); });
        var record = {
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
function lookup(zip) {
    var target = zip.replace(/[^0-9]/g, '');
    if (target.length < 3 || target.length > 7) {
        return [];
    }
    if (!zipCodeRecords) {
        loadData();
    }
    var found = [];
    for (var i = 0; i < zipCodeRecords.length; i++) {
        var r = zipCodeRecords[i];
        if (target.length === 7 && r.zipCode === target) {
            found.push(r);
        }
        else if (target.length < 7 && String(r.zipCode).startsWith(target)) {
            found.push(r);
        }
    }
    return found;
}
;
function lookupJigyosyo(zip) {
    var target = zip.replace(/[^0-9]/g, '');
    if (target.length < 3 || target.length > 7) {
        return [];
    }
    if (!jigyosyoRecords) {
        loadDataJigyosyo();
    }
    var found = [];
    for (var i = 0; i < jigyosyoRecords.length; i++) {
        var r = jigyosyoRecords[i];
        if (target.length === 7 && r.zipCode === target) {
            found.push(r);
        }
        else if (target.length < 7 && String(r.zipCode).startsWith(target)) {
            found.push(r);
        }
    }
    return found;
}
;
function lookupAll(zip) {
    var foundKen = lookup(zip);
    var foundJigyosyo = lookupJigyosyo(zip);
    var ka = foundKen.map(function (r) {
        return __assign(__assign({ type: 'ken_all' }, r), { unit: '', jigyosyoKana: '', jigyosyo: '', office: '', codeType: '', multiCode: '', reviseCode: '' });
    });
    var ja = foundJigyosyo.map(function (r) {
        return __assign(__assign({ type: 'jigyosyo' }, r), { jis: '', oldZipCode: '', zipCode: '', prefKana: '', cityKana: '', townKana: '', multiZipCode: '', koaza: '', block: '', multiTown: '', update: '', reason: '' });
    });
    return __spreadArray(__spreadArray([], ka), ja);
}
;
export { lookup, lookupJigyosyo, lookupAll };
