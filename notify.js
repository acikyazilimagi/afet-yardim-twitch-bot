const axios = require('axios');

const notifyAddress = async (address) => {
    try {
        const res = await axios.post("https://mertcobanov-deprem-ocr-2.hf.space/run/upload-text", {
            data: [ address ]
        });
        console.log(res.data);
    } catch (e) {
        console.log(e.message);
    }
}

notifyAddress("kahramanmaraş onikişubat binevler 5 nisan mahallesi 1009 sokak yemek ve suya ihtiyaçları var 1 tane bebek var");