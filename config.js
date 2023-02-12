const envVarBool = (envVar, defaultValue=false) => {
    if (typeof envVar === 'boolean') {
        return envVar;
    }
    if (typeof envVar === 'string') {
        if (!envVar) {
            return false;
        }
        if (envVar.toLowerCase() === 'true') {
            return true;
        }
        if (envVar.toLowerCase() === 'false') {
            return false;
        }
        if (`${parseInt(envVar)}` === envVar) {
            // is a number
            envVar = parseInt(envVar);
        }
    }
    if (typeof envVar === 'number') {
        return envVar !== 0;
    }
    return defaultValue;
}

const envVarInt = (envVar, defaultValue=0) => {
    if (typeof envVar ==='string') {
        if (!envVar) {
            return defaultValue;
        }
        if (`${parseInt(envVar)}` === envVar) {
            // is a number
            envVar = parseInt(envVar);
        }
    }
    if (typeof envVar === 'number') {
        return envVar;
    }
    return defaultValue;
}

const envVarArrWords = (envVar, defaultValue=[]) => {
    if (typeof envVar ==='string') {
        if (!envVar) {
            return defaultValue;
        }
        try {
            envVar = JSON.parse(envVar);
        } catch (e) { 
            envVar = envVar.split(/\W+/g).filter(s => s);
        }
    }
    if (Array.isArray(envVar)) {
        return envVar;
    }
    return defaultValue;
}

module.exports.config = {
    // WHICH CHANNELS TO LISTEN TO
    CHANNELS: envVarArrWords(process.env.TWITCH_BOT_CHANNELS, ["kendinemuzisyen", "jahrein", "levo", "haskologlu", "wtcn", "surhaybakis", "hasanabi", "elraenn", "haruncan", "hype", 
    "hazretiyasuo", "toqtir", "htalks", "tugaygok", "tolunayoren", "evrimagaci", "baran"]),

    // WHETHER TO APPLY FILTERING FOR KEYWORDS (USES FUZZY SEARCH NOT EXACT MATCH)
    KEYWORD_MATCH: envVarBool(process.env.TWITCH_BOT_FILTER_KEYWORD_MATCH, true),

    // WHETHER TO APPLY FILTERING FOR CITY NAMES (USES FUZZY SEARCH NOT EXACT MATCH)
    CITY_MATCH: envVarBool(process.env.TWITCH_BOT_FILTER_CITY_MATCH, true),

    // NOTIFY SERVICE URL
    NOTIFY_URL: process.env.BACKEND_GO_API_URL || 'https://dweet.io/dweet/for/twitch-deprem-adres-test',
    // NOTE THAT THE REQUEST METHOD IS POST
    NOTIFY_API_KEY: process.env.BACKEND_GO_API_KEY,
    // IT WILL SEND IT AS A HEADER WITH THE NAME "x-api-key"

    // HOW TO MAP THE DATA TO THE NOTIFICATION SERVICE
    // THIS IS A FUNCTION THAT TAKES AN ARRAY OF DATA AND RETURNS AN OBJECT CORRESPONDING TO REQUEST BODY
    // NOTE THAT THE OBJECTS IN THE DATA ARRAY FORMAT IS DESCRIBED IN README.md
    DATA_MAPPER: (dataArray) => ({ feeds: dataArray }),

    // HOW MANY MESSAGES TO COLLECT BEFORE SENDING A NOTIFICATION
    NOTIFY_BATCH_SIZE: envVarInt(process.env.TWITCH_BOT_BATCH_SIZE, 5),

    // WHETHER WE SHOULD LOG CHATS TO STDOUT
    LOG_CHAT: envVarBool(process.env.TWITCH_BOT_LOG_CHAT, true),
}

