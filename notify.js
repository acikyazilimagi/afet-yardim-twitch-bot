const axios = require('axios');
const { config } = require('./config');

const cache = { messageCache: [] }

const notifyAddress = async (data) => {
    cache.messageCache.push(data);
    if (cache.messageCache.length < config.NOTIFY_BATCH_SIZE) {
        return;
    }
    const currentBatch = cache.messageCache;
    cache.messageCache = [];
    try {
        const headers = {
            'Content-Type': 'application/json',
        };
        if (config.NOTIFY_API_KEY) {
            headers['x-api-key'] = config.NOTIFY_API_KEY;
        }
        const res = await axios.post(config.NOTIFY_URL, config.DATA_MAPPER(currentBatch), {
            headers
        });
        console.log(res.data);
    } catch (e) {
        console.error(e.message, currentBatch);
    }
}

module.exports.notifyAddress = notifyAddress;

// notifyAddress("kahramanmaraş onikişubat binevler 5 nisan mahallesi 1009 sokak yemek ve suya ihtiyaçları var 1 tane bebek var");