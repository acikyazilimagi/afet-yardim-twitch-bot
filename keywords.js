const { normalizeSync } = require('normalize-diacritics')

module.exports.keywords = [
'ulaşamıyoruz',
'göçük altındalar',
'göçük',
'gocuk',
'haber',
'alamıyoruz',
'yıkılmış',
'bina',
'enkaz',
'yardım edin',
'yardım',
'apartmanı',
'apartman',
'haber alınamıyor',
'sokak',
'1.kat',
'2.kat',
'3.kat',
'4.kat',
'5.kat',
'6.kat',
'7.kat',
'8.kat',
'9.kat',
'10.kat',
'11.kat',
'dedem',
'annem',
'babam',
'eşim',
'kardeşim',
'akraba',
'akrabam',
'akrabalarım',
'bulvar',
'mahallesi',
'deprem',
'depremoldu',
'altında kalmış',
'yıkık',
'mahsur',
'birincikat',
'ikincikat',
'üçüncükat',
'dördüncükat',
'beşincikat',
'altıncıkat',
'yedincikat',
'sekizincikat',
'dokuzuncukat',
'onuncukat',
'onbirincikat',
'* / 1',
'*/ 2',
'* / 3',
'*/ 4',
'* / 5',
'*/ 6',
'*/ 7',
'*/ 8',
'*/ 9',
'* / 10',
'*/ 11',
'*/ 12',
'haber alamıyoruz',
'no:',
'daire:',
'çaprazı',
'ölüyorum',
'adres:',
'karşısı',
'göcük',
'acil yardım',
'afad',
'ekip',
'çağrı',
'ekipler',
'Yangın',
'Sıkıştım',
'Sıkıstım',
'Help me',
'Masur',
'Mahsur',
'Üşüyorum',
'Konuşamıyorum',
'Sesimi duyan var mı',
'Kötü durumdayım',
'Çıkamıyorum',
'Kanamam var',
'Donuyorum',
'Donuyoruz',
'Çok soğuk',
'yardim',
'mahsur',
'lutfen',
'help',
'altında kaldık',
'apartman',
'imdat',
'yaralıyım',
'cad',
'mh.',
'acil',
'hastane',
'yolu',
'paylaşın',
'afad gitmemiş',
'ekip gitmemiş',
'ulaşamamış',
'enkaz altında',
'yardım istedi',
'anam',
'anneannem',
'ananem',
'nenem',
'zemin',
'çarprazı',
'kırık',
'boşluk',
'baygın',
'nefes',
'hava',
'oksijen',
'yengem',
'enistem',
'amcam',
'antakya',
'afadbaskanlik',
'gaziantep',
'blok',
'adıyaman',
'nolur',
'caddesi',
'cadde',
'haluklevent',
'ahbap',
'mügeanli',
'mugeanlı',
'Soğuk',
'destek',
'kimse ',
'battaniye',
'aile'
].map((kw) => normalizeSync(kw))