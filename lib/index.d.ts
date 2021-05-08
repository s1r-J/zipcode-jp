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
declare function lookup(zip: string): zipcode.ZipCodeRecord[];
declare function lookupJigyosyo(zip: string): zipcode.JigyosyoRecord[];
declare function lookupAll(zip: string): zipcode.AllRecord[];
export { lookup, lookupJigyosyo, lookupAll };
