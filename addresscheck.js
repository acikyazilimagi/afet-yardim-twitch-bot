const Fuse = require('fuse.js');
const { normalizeSync } = require('normalize-diacritics');
const { districts } = require("./cities");
const { keywords } = require("./keywords");

const cities = [
    "Kahramanmaraş", "Adıyaman", "Kilis", "Şanlıurfa", "Diyarbakır", "Adana", "Osmaniye", "Gaziantep", "Malatya", "Hatay", 'Antakya', "iskenderun", "urfa", "islahiye"
].map(city => normalizeSync(city));

const fuseOptsKW = {
    threshold: 0.2,
    ignoreLocation: false,
    includeScore: true,
}

const fuseIndexKeywords = Fuse.createIndex([], keywords)

const fuseKeywords = new Fuse(keywords, fuseOptsKW, fuseIndexKeywords);



const fuseOptsCities = {
    threshold: 0.2,
    includeScore: true,
    ignoreLocation: false,
};

const fuseIndexCities = Fuse.createIndex([], cities)

const fuseCities = new Fuse(cities, fuseOptsCities, fuseIndexCities);

const fuseOptsDistrict = {
    threshold: 0.2,
    includeScore: true,
    ignoreLocation: false,
    keys: ['il_adi', 'ilce_adi']
}

const fuseIndex = Fuse.createIndex(fuseOptsDistrict.keys, districts)

const fuseDistrict = new Fuse(districts, fuseOptsDistrict, fuseIndex);

const DEBUG = false;
const debugLog = (...args) => DEBUG ? console.log(...args) : undefined;

const isPossiblyAddress = (msg) => {

    msg = normalizeSync(msg);
    // fuseKeywords.search(msg).forEach((result) => {
    //     console.log(result);
    // });
    // fuseDistrict.search(msg).forEach((result) => {
    //     console.log(result);
    // });

    const chunks = msg.split(/\W+/);

    let kwscore = 0;
    let cityscore = 0;




    chunks.forEach((chunk) => {
        if (chunk.length < 3) {
            return;
        }

        debugLog();
        debugLog('chunk', chunk)

        debugLog('kw search')
        const topKeywordMatches = fuseKeywords.search(chunk);//.slice(0, 3);
        debugLog(topKeywordMatches);
        if (topKeywordMatches.length > 0) {
            kwscore += 1;
        }

        // debugLog('district search')
        // const maxMatchDistrict = fuseDistrict.search(chunk);//[0];
        // debugLog(maxMatchDistrict);

        // debugLog('city search')
        const maxMatchCity = fuseCities.search(chunk);//[0];
        if (maxMatchCity.length > 0) {
            cityscore += 1;
        }
        debugLog(maxMatchCity);
    });

    if (kwscore > 0 && cityscore > 0) {
        return true;
    }
}

module.exports.isPossiblyAddress = isPossiblyAddress;

// isPossiblyAddress(`Arkadaşımızın ailesi göçük altında henüz Arama Kurtarma Ekipleri yönlendirilmemiş. Kahramanmaraş Hayrullah mahalesi sandalzade bulvarı no:25  #Kahramanmaras #deprem Adem Bayır, Ayşe Bayır, Emre Bayır, Eren Bayır`);

isPossiblyAddress('https://twitter.com/aycakrbb/status/1622891447572733952?s=46&t=MLnWM5sDRFqUHu2hOL2Mxw');