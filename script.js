function replaceAccentedCharacters(str) {
    const accentedCharactersMap = {
        'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a', 'å': 'a',
        'ç': 'c',
        'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e',
        'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i',
        'ñ': 'n',
        'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o', 'ø': 'o',
        'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u',
        'ý': 'y', 'ÿ': 'y',
        'À': 'A', 'Á': 'A', 'Â': 'A', 'Ã': 'A', 'Ä': 'A', 'Å': 'A',
        'Ç': 'C',
        'È': 'E', 'É': 'E', 'Ê': 'E', 'Ë': 'E',
        'Ì': 'I', 'Í': 'I', 'Î': 'I', 'Ï': 'I',
        'Ñ': 'N',
        'Ò': 'O', 'Ó': 'O', 'Ô': 'O', 'Õ': 'O', 'Ö': 'O', 'Ø': 'O',
        'Ù': 'U', 'Ú': 'U', 'Û': 'U', 'Ü': 'U',
        'Ý': 'Y'
    };

    return str.split('').map(char => accentedCharactersMap[char] || char).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    console.info("== DOM chargé ==");

    const divMain = document.getElementById('divMain');
    const divChaines = document.getElementById('divChaines');
    const divCarousel = document.getElementById('divCarousel');
    const divHisto = document.getElementById('divHisto');
    const progDetail = document.getElementById('progDetail');

    const ipInput = document.getElementById('ip');
    const codeInput = document.getElementById('code');
    const ip = ipInput.value.trim();
    const code = codeInput.value.trim();

    let currentChannelNb = 180;
    let accesLocal = true;

    const categories = [
        
        {cat:'TNT', lib:'📺TNT',color:'rgb(114, 114, 114)'},
        {cat:'Disc', lib:'✨Découverte',color:'rgb(14, 165, 0)'},
        {cat:'Music', lib:'🎵Musique',color:'rgb(205, 198, 0)'},
        {cat:'Sport', lib:'⚽Sport',color:'rgb(205, 0, 34)'},
        {cat:'Info', lib:'📢Infos',color:'rgb(0, 18, 220)'},
        {cat:'Local', lib:'📰Local',color:'rgb(153, 0, 195)'},
        {cat:'News', lib:'🗽News',color:'rgb(0, 120, 167)'},
        {cat:'Jeune', lib:'🧒Jeunesse',color:'rgb(209, 143, 0)'},
        {cat:'?', lib:'🌍Monde',color:'rgb(218, 0, 134)'},
        {cat:'??', lib:'??',color:'darkred'},
        
    ];

    const chaines = [
        {id:1, lib:'TF1', cat:'TNT'},
        {id:2, lib:'France 2', cat:'TNT'},
        {id:3, lib:'France 3', cat:'TNT'},
        {id:4, lib:'CANAL+', cat:'TNT'},
        {id:5, lib:'France 5', cat:'TNT'},
        {id:6, lib:'M6', cat:'TNT'},
        {id:7, lib:'Arte', cat:'TNT'},
        {id:8, lib:'C8', cat:'TNT'},
        {id:9, lib:'W9', cat:'TNT'},
        {id:10, lib:'TMC', cat:'TNT'},
        {id:11, lib:'TFX', cat:'TNT'},
        {id:12, lib:'NRJ 12', cat:'TNT'},
        {id:13, lib:'LCP', cat:'TNT'},
        {id:14, lib:'France 4', cat:'TNT'},
        {id:15, lib:'BFM TV', cat:'Info'},
        {id:16, lib:'CNEWS', cat:'Info'},
        {id:17, lib:'C STAR', cat:'TNT'},
        {id:18, lib:'Gulli', cat:'TNT'},
        {id:20, lib:'TF1 Séries Films', cat:'TNT'},
        {id:21, lib:'la chaine l’équipe', cat:'TNT'},
        {id:22, lib:'6Ter', cat:'TNT'},
        {id:23, lib:'RMC Story', cat:'TNT'},
        {id:24, lib:'RMC découverte', cat:'TNT'},
        {id:25, lib:'Cherie 25', cat:'TNT'},
        {id:26, lib:'LCI', cat:'Info'},
        {id:27, lib:'FranceInfo', cat:'Info'},
        {id:28, lib:'Paris Première', cat:'TNT'},
        {id:29, lib:'RTL9', cat:'TNT'},
        {id:34, lib:'EUROSPORT 1', cat:'Sport'},
        {id:36, lib:'INFOSPORT+', cat:'Sport'},
        {id:39, lib:'Oqee Ciné'},
        {id:49, lib:'Disney Channel', cat:'Jeune'},
        {id:50, lib:'Game One', cat:'Sport'},
        {id:51, lib:'AB1', cat:'TNT'},
        {id:52, lib:'Paramount Channel', cat:'TNT'},
        {id:53, lib:'Téva', cat:'TNT'},
        {id:54, lib:'TV BREIZH', cat:'TNT'},
        {id:55, lib:'POLAR+', cat:'TNT'},
        {id:56, lib:'SERIE CLUB', cat:'TNT'},
        {id:58, lib:'Novelas TV', cat:'TNT'},
        {id:59, lib:'Planète+', cat:'Disc'},
        {id:60, lib:'Nat Geographic', cat:'Disc'},
        {id:62, lib:'W-Sport', cat:'Sport'},
        {id:63, lib:'Free FOOT', cat:'Sport'},
        {id:64, lib:'TLC', cat:'Sport'},
        {id:67, lib:'Boomerang', cat:'Jeune'},
        {id:70, lib:'TV5', cat:'Disc'},
        {id:71, cat:'Disc'},
        {id:72, cat:'Disc'},
        {id:73, cat:'Disc'},
        {id:79, lib:'Olympia TV', cat:'Disc'},
        {id:80, lib:'COMEDIE +', cat:'Disc'},
        {id:83, lib:'M6 Music', cat:'Music'},
        {id:84, lib:'MTV', cat:'Music'},
        {id:85, lib:'NRJ Hits', cat:'Music'},
        {id:87, lib:'MCM', cat:'Music'},
        {id:88, cat:'Disc'},
        {id:89, lib:'Game One +1', cat:'Jeune'},
        {id:90, lib:'Mangas', cat:'Jeune'},
        {id:91, lib:'MGG TV', cat:'Jeune'},
        {id:94, lib:'GONG', cat:'Jeune'},
        {id:95, lib:'GONG MAX'},
        {id:97, lib:'Comedy Central', cat:'Disc'},
        {id:99, lib:'BET', cat:'Music'},
        {id:122, lib:'Paramount Channel Decale', cat:'TNT'},
        {id:141, cat:'Jeune'},
        {id:142, lib:'TIJI', cat:'Jeune'},
        {id:143, lib:'Piwi', cat:'Jeune'},
        {id:147, lib:'NICKELODEON', cat:'Jeune'},
        {id:148, cat:'Jeune'},
        {id:149, lib:'CANAL J', cat:'Jeune'},
        {id:150, lib:'Télétoon', cat:'Jeune'},
        {id:151, lib:'Télétoon +1', cat:'Jeune'},
        {id:152, cat:'Jeune'},
        {id:156, lib:'Nickelodeon +1', cat:'Jeune'},
        {id:161, lib:'BFM 2', cat:'Info'},
        {id:162, lib:'BFM Business', cat:'Info'},
        {id:163, lib:'B SMART', cat:'Info'},
        {id:164, lib:'Euronews', cat:'Info'},
        {id:165, lib:'Le Média TV', cat:'Info'},
        {id:166, lib:'France 24', cat:'Info'},
        {id:167, lib:'LCP AN 24h/24', cat:'Info'},
        {id:168, lib:'Public Sénat', cat:'Info'},
        {id:176, lib:'Equidia', cat:'Sport'},
        {id:180, lib:'AUTOMOTO', cat:'Sport'},
        {id:187, lib:'Journal du Golf', cat:'Sport'},
        {id:190, lib:'Sport En France', cat:'Sport'},
        {id:200, lib:'Planète+ Crime', cat:'Disc'},
        {id:201, lib:'Planète+ Aventure', cat:'Disc'},
        {id:203, lib:'Le Figaro TV', cat:'Disc'},
        {id:204, lib:'Ushuaïa TV', cat:'Disc'},
        {id:205, lib:'Histoire TV', cat:'Disc'},
        {id:206, lib:'Toute l histoire', cat:'Disc'},
        {id:210, lib:'Imearth', cat:'Disc'},
        {id:211, lib:'Souvenirs from Earth', cat:'Disc'},
        {id:212, lib:'Trotters TV', cat:'Disc'},
        {id:213, lib:'Museum TV', cat:'Disc'},
        {id:218, lib:'Telesud', cat:'Disc'},
        {id:219, lib:'Tahiti Nui TV', cat:'Disc'},
        {id:220, lib:'Esprit Sorcier', cat:'Disc'},
        {id:230, lib:'LA CHAINE METEO', cat:'Info'},
        {id:231, lib:'Tech & Co', cat:'Disc'},
        {id:232, lib:'AutoPlus', cat:'Sport'},
        {id:234, lib:'Marmiton TV', cat:'Disc'},
        {id:235, lib:'Astro Center TV', cat:'Info'},
        {id:236, lib:'Demain !', cat:'Disc'},
        {id:237, lib:'Luxe.TV HD', cat:'Disc'},
        {id:238, lib:'Men s Up', cat:'Disc'},
        {id:239, lib:'Top Santé', cat:'Disc'},
        {id:240, lib:'Maison & Travaux', cat:'Disc'},
        {id:241, lib:'Fashion TV', cat:'Disc'},
        {id:244, lib:'Lucky Jack', cat:'Sport'},
        {id:245, lib:'KTO', cat:'Disc'},
        {id:247, lib:'Sqool TV', cat:'Disc'},
        {id:248, lib:'EVTV', cat:'Disc'},
        {id:249, lib:'EMCI TV', cat:'Disc'},
        {id:259, lib:'CStar Hits', cat:'Music'},
        {id:261, lib:'RFM TV', cat:'Music'},
        {id:271, lib:'MCM Top', cat:'Music'},
        {id:274, lib:'Clubbing TV', cat:'Music'},
        {id:281, lib:'MTV 90’s', cat:'Music'},
        {id:282, lib:'Club MTV', cat:'Music'},
        {id:283, lib:'People 24', cat:'Music'},
        {id:285, lib:'TRACE Urban', cat:'Music'},
        {id:297, lib:'Madras FM TV', cat:'Music'},
        {id:298, lib:'Vibes TV', cat:'Music'},
        {id:300, lib:'Mosaïque France 3'},
        {id:301, lib:'France 3', cat:'Local'},
        {id:302, lib:'France 3 Alpes', cat:'Local'},
        {id:303, lib:'France 3 Alsace', cat:'Local'},
        {id:304, lib:'France 3 Aquitaine', cat:'Local'},
        {id:305, lib:'France 3 Auvergne', cat:'Local'},
        {id:306, lib:'France 3 Normandie', cat:'Local'},
        {id:307, lib:'France 3 Bourgogne', cat:'Local'},
        {id:308, lib:'France 3 Bretagne', cat:'Local'},
        {id:309, lib:'France 3 Centre Val de Loire', cat:'Local'},
        {id:310, lib:'France 3 Champagne-Ardenne', cat:'Local'},
        {id:311, lib:'France 3 Corse Via Stella', cat:'Local'},
        {id:312, lib:'France 3 Côte-d Azur', cat:'Local'},
        {id:313, lib:'France 3 F-Comté', cat:'Local'},
        {id:314, lib:'France 3 Haute-Normandie', cat:'Local'},
        {id:315, lib:'France 3 Languedoc-Roussillon', cat:'Local'},
        {id:316, lib:'France 3 Limousin', cat:'Local'},
        {id:317, lib:'France 3 Lorraine', cat:'Local'},
        {id:318, lib:'France 3 Midi Pyrénnées', cat:'Local'},
        {id:319, lib:'France 3 Nord Pas-de-Calais', cat:'Local'},
        {id:320, lib:'France 3 Paris IdF', cat:'Local'},
        {id:321, lib:'France 3 Pays Loire', cat:'Local'},
        {id:322, lib:'France 3 Picardie', cat:'Local'},
        {id:323, lib:'France 3 Poitou-C.', cat:'Local'},
        {id:324, lib:'France 3 Prov.-Alpes', cat:'Local'},
        {id:325, lib:'France 3 Rhône-Alpes', cat:'Local'},
        {id:326, lib:'France 3 NoA', cat:'Local'},
        {id:327, lib:'BFM Paris île-de-france', cat:'Local'},
        {id:328, lib:'BFM Lyon', cat:'Local'},
        {id:329, lib:'BFM Grand Lille', cat:'Local'},
        {id:330, lib:'BFM Grand Littoral', cat:'Local'},
        {id:331, lib:'BFM Marseille Provence', cat:'Local'},
        {id:332, lib:'BFM Nice Cote d’Azur', cat:'Local'},
        {id:333, lib:'BFM Toulon Var', cat:'Local'},
        {id:334, lib:'BFM DICI Alpes du Sud', cat:'Local'},
        {id:335, lib:'BFM DICI Haute Provence', cat:'Local'},
        {id:336, lib:'BFM ALSACE', cat:'Local'},
        {id:337, lib:'BFM Normandie', cat:'Local'},
        {id:341, lib:'France 24 Anglais', cat:'News'},
        {id:342, lib:'France 24 Arabe'},
        {id:343, lib:'France 24 Español'},
        {id:346, lib:'Euronews Multilingue', cat:'News'},
        {id:352, lib:'BBC NEWS', cat:'News'},
        {id:353, lib:'Sky News Int.', cat:'News'},
        {id:354, lib:'CNN', cat:'News'},
        {id:355, lib:'Fox News', cat:'News'},
        {id:356, lib:'Bloomberg TV', cat:'News'},
        {id:357, lib:'CNBC', cat:'News'},
        {id:358, lib:'Al Jazeera Int.', cat:'News'},
        {id:359, lib:'Africa 24', cat:'News'},
        {id:360, lib:'i24 News', cat:'News'},
        {id:361, lib:'NHK World SD / NHK World HD', cat:'News'},
        {id:428, lib:'Noursat'},
        {id:429, lib:'DayStar'},
        {id:436, lib:'HLIVE'},
        {id:470, lib:'SUD1ere'},
        {id:474, lib:'TeleKreol'},
        {id:475, lib:'Vox Africa - Panafrique'},
        {id:479, lib:'Sharjah TV'},
        {id:480, lib:'Medi1TV'},
        {id:481, lib:'Canal Algérie'},
        {id:482, lib:'Algerie 3'},
        {id:483, lib:'Algerie 5'},
        {id:484, lib:'Tamazight TV4'},
        {id:486, lib:'Beur TV'},
        {id:514, lib:'Arirang'},
        {id:515, lib:'TVRI'},
        {id:531, lib:'Telesur'},
        {id:543, lib:'Rai Uno'},
        {id:544, lib:'Rai Due'},
        {id:545, lib:'Rai Tre'},
        {id:547, lib:'Kuwait TV'},
        {id:549, lib:'AL ARABIYA CHANNEL'},
        {id:551, lib:'Asharq News'},
        {id:552, lib:'Tamazight TV'},
        {id:553, lib:'Almagharibia'},
        {id:554, lib:'Euromed'},
        {id:555, lib:'Dubai TV'},
        {id:556, lib:'Abu Dhabi TV'},
        {id:557, lib:'Ulusal Kanal'},
        {id:558, lib:'Arriyadia'},
        {id:559, lib:'Canal Atlas'},
        {id:560, lib:'Al Araby'},
        {id:561, lib:'Jordan Satellite channel'},
        {id:565, lib:'Al Aoula International'},
        {id:567, lib:'Watania 1'},
        {id:569, lib:'Al Jazeera'},
        {id:586, lib:'TV5 Turkey'},
        {id:587, lib:'PowerTürk TV'},
        {id:588, lib:'Tele 1'},
        {id:589, lib:'TRT World'},
        {id:590, lib:'Ulke'},
        {id:591},
        {id:592, lib:'Haber Turk'},
        {id:593, lib:'TRT Türk'},
        {id:603, lib:'Kanal 24'},
        {id:612, lib:'360 TV'},
        {id:616, lib:'Arte DE'},
        {id:617, lib:'DW-TV'},
        {id:637, lib:'RTPi'},
        {id:700, lib:'Freedom'},
        {id:701, lib:'OstWest 24'},
        {id:719, lib:'Mandarin TV'},
        {id:720, lib:'CGTN Documentary'},
        {id:722, lib:'CGTN news'},
        {id:723, lib:'CGTN-F'},
        {id:750, lib:'Kentron TV'},
        {id:751, lib:'Armenia 1'},
        {id:799, lib:'NTD Television'},
        {id:900, lib:'TV Monaco', cat:'Local'},
        {id:901, lib:'TV7 Bordeaux', cat:'Local'},
        {id:902, lib:'8 Mont-Blanc', cat:'Local'},
        {id:903, lib:'TéléGrenoble', cat:'Local'},
        {id:904, lib:'Le Figaro TV IDF', cat:'Local'},
        {id:906, cat:'Local'},
        {id:907, lib:'TéléNantes', cat:'Local'},
        {id:908, lib:'TV Tours', cat:'Local'},
        {id:909, lib:'MyTV Caraïbes', cat:'Local'},
        {id:910, lib:'20 Minutes IDF', cat:'Local'},
        {id:911, lib:'Canal 31', cat:'Local'},
        {id:912, lib:'Lyon Capitale TV', cat:'Local'},
        {id:913, lib:'TV78', cat:'Local'},
        {id:914, lib:'Wéo TV La voix du Nord', cat:'Local'},
        {id:916, lib:'ETV Guadeloupe', cat:'Local'},
        {id:917, lib:'Canal10 Guadeloupe', cat:'Local'},
        {id:918, lib:'TLC', cat:'Local'},
        {id:919, lib:'TV Sud Nîmes'},
        {id:920, lib:'Moselle TV', cat:'Local'},
        {id:921, lib:'Vosges TV', cat:'Local'},
        {id:922, lib:'TV Sud Montpellier', cat:'Local'},
        {id:923, lib:'Maritima TV', cat:'Local'},
        {id:924, lib:'TV Vendee', cat:'Local'},
        {id:925, lib:'Canal 32', cat:'Local'},
        {id:927, lib:'TVR', cat:'Local'},
        {id:928, lib:'Tébésud', cat:'Local'},
        {id:929, lib:'Tébéo', cat:'Local'},
        {id:932, lib:'TV Antilles', cat:'Local'},
        {id:933, lib:'TL7', cat:'Local'},
        {id:934, lib:'TVPI', cat:'Local'},
        {id:935, lib:'Alpe d Huez TV', cat:'Local'},
        {id:936, lib:'TV Sud Perpignan', cat:'Local'},
        {id:937, lib:'Ma Tele', cat:'Local'},
        {id:938, lib:'Angers TV', cat:'Local'},
        {id:939, lib:'Télé Bocal', cat:'Local'},
        {id:940, lib:'Cannes Lérins TV', cat:'Local'},
        {id:941, lib:'Wéo TV Picardie', cat:'Local'},
        {id:942, lib:'Vià31', cat:'Local'},
        {id:943, lib:'Mosaik Cristal', cat:'Local'},
        {id:944, lib:'ASTV', cat:'Local'},
        {id:945, lib:'Bip TV', cat:'Local'},
        {id:946, lib:'viàTéléPaese', cat:'Local'},
        {id:947, lib:'LMtv Sarthe', cat:'Local'},
        {id:948, lib:'Kanaldude', cat:'Local'},
        {id:949, lib:'Maurienne TV', cat:'Local'},
        {id:950, lib:'La Chaine 32', cat:'Local'},
        {id:951, lib:'7ALimoges', cat:'Local'},
        {id:952, lib:'NA TV', cat:'Local'},
        {id:953, lib:'Puissance TV', cat:'Local'},
    ];


    let defaultSize = 40;
    const commands = [

        { div: 'divHeader', key: 'home', img:'freebox logo', imgW:'150'},
        { div: 'divHeader', key: 'power',  img:'icon power'},

        { div: 'divNumero', key: '1', width:'25'},
        { div: 'divNumero', key: '2', width:'25'},
        { div: 'divNumero', key: '3', width:'25'},
        { div: 'divNumero', key: '4', width:'25'},
        { div: 'divNumero', key: '5', width:'25'},
        { div: 'divNumero', key: '6', width:'25'},
        { div: 'divNumero', key: '7', width:'25'},
        { div: 'divNumero', key: '8', width:'25'},
        { div: 'divNumero', key: '9', width:'25'},
        { div: 'divNumero', key: '0', width:'25'},

        { div: 'divCross', key: ['vol_inc','vol_inc','vol_inc','vol_inc','vol_inc','vol_inc','vol_inc'], lib:'Vol+', css:'classBtnUp'},
        { div: 'divCross', key: 'red', lib:null , img:'icon back red'},
        { div: 'divCross', key: 'up', lib:'⬆', width:'50',css:'classHarrowUp'},
        { div: 'divCross', key: 'blue', lib:null , img:'icon search blue transparent'},
        { div: 'divCross', key: 'prgm_inc', lib:'Prog+', css:'classBtnUp'},

        { div: 'divCross', key: 'mute', lib:'🔇', width:'50'},
        { div: 'divCross', key: 'left', lib:'⬆', width:'50',css:'classHarrowLeft'},
        { div: 'divCross', key: 'ok', lib:null , img:'icon ok black'},
        { div: 'divCross', key: 'right', lib:'⬆', width:'50',css:'classHarrowRight'},
        { div: 'divCross', key: '0', img:'Mosaique chaines', width:80},

        { div: 'divCross', key: ['vol_dec','vol_dec','vol_dec','vol_dec','vol_dec','vol_dec','vol_dec'], lib:'Vol-', css:'classBtnDown'},
        { div: 'divCross', key: 'green', lib:null , img:'icon menu green'},
        { div: 'divCross', key: 'down', lib:'⬆', width:'50',css:'classHarrowDown'},
        { div: 'divCross', key: 'yellow', lib:null , img:'icon info yellow'}, //info
        { div: 'divCross', key: 'prgm_dec', lib:'Prog-', css:'classBtnDown'},

        { div: 'divSpecial', key: ['green','down','down','down','right','ok','ok'], lib:'PIP'},
        { div: 'divSpecial', key: ['green','down','down','down','down','right','down','down','down','ok','ok'], lib:'Back to PIP'},
        { div: 'divSpecial', key: ['green','down','down','down','down','down','down','down','right'], lib:'Langue'},
        { div: 'divSpecial', key: ['green','down','right','down','ok'], lib:'Guide'},

               
        
        { div: 'divMagneto', key: 'bwd', lib:'⏪', width:50},
        { div: 'divMagneto', key: 'play', lib:'▶', width:50},
        { div: 'divMagneto', key: 'rec', lib:'⏺', width:50},
        { div: 'divMagneto', key: 'fwd', lib:'⏩', width:50},

        { div: 'divSources', key: 'tv', lib:'📺TV'},
        { div: 'divSources', key: 'replay', lib:'Replay'},
        { div: 'divSources', key: 'netflix', img:'Netflix', imgW:50},
        { div: 'divSources', key: 'youtube', img:'Youtube', imgW:50},
        { div: 'divSources', key: 'canalvod', img:'Canal VOD logo', imgW:50},

        { div: 'divServices', key: 'records', lib:'📼Enreg.'},
        { div: 'divServices', key: 'media', lib:'📁Expl.'},
        { div: 'divServices', key: 'radios', lib:'📻Radio'},        
        { div: 'divServices', key: 'debug', lib:'👨‍💻debug'}, //info

    ];


    // Fonction pour générer les boutons
    function generateLinks() {


        if (!ip || !code) {
            divMain.innerHTML = '<p style="color: red;">Veuillez entrer une adresse IP et un code valide.</p>';
            return;
        }

        
        commands.forEach(command => {

            const button = document.createElement('button');
            button.classList.add('classBouton');
            if (command.css) {
                button.classList.add(command.css);
            }

            let htmlOut = '';

            if (command.img) {
                let imgW = defaultSize;
                let imgH = defaultSize;
                if (command.imgW) {
                    imgW = command.imgW;
                }
                htmlOut += '<img title="'+command.key+'" src="https://th.bing.com/th?w='+imgW+'&h='+imgH+'&q='+command.img+'">';
                let bWidth = parseInt(imgW)+10;
                button.style.width = bWidth + 'px';
            } else {
                if (command.width) {
                    button.style.fontSize = '30px';
                } else {
                    button.style.fontSize = '16px';
                }
                //button.style.width = command.width + 'px';
                if (command.lib) {
                    htmlOut += command.lib;
                } else {
                    htmlOut += command.key;
                }                
            }
            if (command.div=='divNumero') {
                myWidth = '30px';
                button.style.width = myWidth;
                button.style.minWidth = myWidth;
                button.style.minWidth = myWidth;
                button.style.height = myWidth;
                button.style.minHeight = myWidth;
                button.style.maxHeight = myWidth;
                button.style.fontSize = '16px';
                button.style.margin = '2px';
            }

            button.innerHTML = htmlOut;
            
            button.addEventListener('click', () => {
                button.classList.add('gelatine');
                setTimeout(function(){
                    button.classList.remove('gelatine');
                }, 500);

                if (Array.isArray(command.key)) {
                    console.log('Key est un tableau avec', command.key.length, 'éléments :', command.key);
                    for (let i=0;i<command.key.length;i++) {
                        //console.log(command.key[i]);
                        setTimeout(() => {
                            sendCommand(ip, code, command.key[i]);
                        }, i*200);
                    }
                } else if (typeof command.key === 'string') {
                    console.log('Key est une chaîne de longueur', command.key.length, ':', command.key);
                    if (command.key==='prgm_inc') {                                                
                        const currentIndex = listeChaines.findIndex(item => item.nb === currentChannelNb);
                        const nextChannel = listeChaines[currentIndex + 1];
                        currentChannelNb = nextChannel.nb;
                        fctMajTvPrograms(currentChannelNb,nextChannel.channelId);
                    }
                    if (command.key==='prgm_dec') {
                        const currentIndex = listeChaines.findIndex(item => item.nb === currentChannelNb);
                        if (currentIndex!==0) {
                            const prevChannel = listeChaines[currentIndex - 1];
                            currentChannelNb = prevChannel.nb;
                            fctMajTvPrograms(currentChannelNb,prevChannel.channelId);
                        }                        

                    }
                    sendCommand(ip, code, command.key);
                } else {
                    console.warn('Key a un type inattendu :', command.key);
                }

                
            });

            
            document.getElementById(command.div).appendChild(button);
        });

        
    }


    function fctInitBtnFilters() {
        const divFilters = document.getElementById('divFilters');
        categories.forEach(categorie => {
            const button = document.createElement('button');
            button.classList.add('classBtnFilter');
            button.innerHTML = categorie.lib;
            button.style.backgroundColor = categorie.color;
            
           
            divFilters.appendChild(button);

            button.addEventListener('click', () => {        
                button.classList.add('gelatine');
                setTimeout(function(){
                    button.classList.remove('gelatine');
                }, 500);
                let retour = fctMajChainesListe(categorie.cat);
                divChaines.style.backgroundColor = categorie.color;
                divFilters.style.backgroundColor = categorie.color;
                //console.log(retour);
                fctShowToast(retour +' chaines '+categorie.lib,4000);
            });

        });
        
    }
    fctInitBtnFilters();


    function fctClicVignetteChaine(div,chaine) {
        div.classList.add('gelatine');
        setTimeout(function(){
            div.classList.remove('gelatine');
        }, 500);
        
        let chaineId = Math.abs(chaine).toString();
        for (let i = 0; i < chaineId.length; i++) {
            console.log(`Caractère ${i}:`, chaineId[i]);
            setTimeout(() => {
                sendCommand(ip, code, chaineId[i]);
            }, i*100);
        }

        logIncrementClics(chaine);
    }



    let histoChaines=[];
    let currentPos=0;

    function fctMajHistorique(button,chaine) {
        // HISTORIQUE
        // ajout à faire sur histoChaines=[];
        const histoChaine = histoChaines.find(item => item.nb === chaine.nb);
        if (histoChaine) {
            console.log('chaine déjà présente dans liste)');
            // Trouver le bouton correspondant et le déplacer en première position
            const existingButton = Array.from(divHisto.children).find(button => button.id == 'divHisto'+chaine.nb.toString());
            console.log('divHisto'+chaine.nb.toString(),existingButton,Array.from(divHisto.children))
            if (existingButton) {
                divHisto.insertBefore(existingButton, divHisto.firstChild);
            }
        } else {
            histoChaines.push({nb:chaine.nb,pos:currentPos});
            currentPos++;
            let newButton = button.cloneNode(true);
            newButton.id = 'divHisto'+chaine.nb;
            // Ajouter le nouveau bouton au début de divHisto
            divHisto.insertBefore(newButton, divHisto.firstChild);
            newButton.addEventListener('click', () => {
                fctClicVignetteChaine(newButton,chaine.nb);
                fctMajTvPrograms(chaine.nb,chaine.channelId);                  
            });
        }
    }




    function fctVignetteChaine(chaine,divCible) {

        const button = document.createElement('button');
        button.id = divCible.id+chaine.nb;
        button.classList.add('classBouton');
        button.style.width = '68px';
        button.style.height = '60px';
        button.style.backgroundColor = 'black';
        button.style.opacity = 1;

        const divImg = document.createElement('div');
        divImg.classList.add('classChaineImage');
            const img = document.createElement('img');
            img.title = chaine.name;
            //img.src = 'https://th.bing.com/th?w='+imgW+'&h='+imgH+'&q=logo \''+chaine.lib+'\'';
            img.src = 'http://mafreebox.freebox.fr' + chaine.img;

            divImg.appendChild(img);
        button.appendChild(divImg);
        
        const divNumber = document.createElement('div');
        divNumber.classList.add('classChaineNumber');            
        divNumber.innerHTML = chaine.nb;
        if (!chaine.pub && chaine.abo) {
            divNumber.innerHTML += '💲';
        }
        button.appendChild(divNumber);

        const divTitle = document.createElement('div');
        divTitle.classList.add('classChaineTitle');            
        divTitle.innerHTML = chaine.name;
        button.appendChild(divTitle);

        divCible.appendChild(button);

        button.addEventListener('click', () => {

            fctMajHistorique(button,chaine);

            currentChannelNb = chaine.nb;
            fctClicVignetteChaine(button,chaine.nb);            

            fctMajTvPrograms(chaine.nb,chaine.channelId);            
        });
    }


    function fctMajChainesCarousel() {
        listeChaines.forEach(chaine => {
            if (chaine.nb<300) {
                fctVignetteChaine(chaine,divCarousel);
            }
        });
    }
    
    function fctMajLogChaines() {

        const logListe = logListNbSorted();
        console.log('fctMajLogChaines',logListe);
        logListe.forEach(chaine => {
            const maChaine = listeChaines.find(item => item.nb == chaine);
            histoChaines.push({nb:chaine,pos:0});
            fctVignetteChaine(maChaine,divHisto);
        });
    }
    

    function fctMajChainesListe(filter) {
        console.log('filter',filter);
        divChaines.innerHTML = '';
        let nbTotal = 0;
        listeChaines.forEach(chaine => {
            //if (chaine.cat) {
                if (chaine.cat==filter) {
                    nbTotal++;
                    fctVignetteChaine(chaine,divChaines);
                }
            //}
        });
        return nbTotal;
    }


    // Fonction pour envoyer une commande via le proxy PHP
    async function sendCommand(ip, code, command) {
        if (!accesLocal) {
            fctShowToast('Accès distant ⛔ commandes boquées');
            return;
        }
        const url = `commande.php?ip=${ip}&code=${code}&command=${command}`;
        //console.log('sendCommand via proxy:', url);

        try {
            const response = await fetch(url);
            if (response.ok) {
                console.info(`Commande "${command}" envoyée avec succès.`);
            } else {
                console.error(`Erreur lors de l'envoi de la commande "${command}". Code : ${response.status}`);
            }
        } catch (error) {
            console.error(`Impossible d'envoyer la commande "${command}" via le proxy :`, error);
        }
    }



    async function fetchGetChannelsIds() {
        const url = "GetChannelIds.php"; // Chemin vers le script PHP    
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
            }    
            const retour = await response.json();
            console.log('retour :', retour);
            return retour;
        } catch (error) {
            console.error('Erreur lors de la récupération des chaînes :', error);
            return [];
        }
    }

    async function fetchGetTvProgramsNow() {
        const url = "GetTvProgramsNow.php"; // Chemin vers le script PHP    
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
            }    
            const retour = await response.json();
            console.log('GetTvProgramsNow :', retour);
            return retour;
        } catch (error) {
            console.error('Erreur lors de la récupération des chaînes :', error);
            return [];
        }
    }


    async function fetchFreebox(path) {
        const url = "mafreebox.php?path="+path; // Chemin vers le script PHP    
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
            }    
            const retour = await response.json();
            console.log('retour :',path, retour);
            return retour;
        } catch (error) {
            console.error('Erreur lors de la récupération des chaînes :', error);
            return [];
        }
    }

    async function fetchGetTvPrograms(chaine) {
          
        let chaineFormat = chaine.replace(/\+/g, 'plus');
        chaineFormat = replaceAccentedCharacters(chaineFormat);
        const url = "GetTvPrograms.php?chaine="+chaineFormat; // Chemin vers le script PHP
        console.log('fetchGetTvPrograms :',url);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`fetchGetTvPrograms : ${response.status}`);
            }    
            const retour = await response.json();
            console.log('fetchGetTvPrograms :',chaine, retour);
            return retour;
        } catch (error) {
            console.error('fetchGetTvPrograms :', error);
            return [];
        }
    }


    async function fctMajTvPrograms(nb,chaine) {
        try {
            let programmes = await fetchGetTvPrograms(chaine);
            console.log('fctMajTvPrograms ',programmes);
            fctMajPrograms(nb,programmes);

        } catch (error) {
            console.error('Erreur lors de la récupération des bouquets :', error);
        }
    }

    // Sélectionnez la div où les boutons seront ajoutés
    const divProgramsNowFilter = document.getElementById('divProgramsNowFilter');

    async function fctMajTvProgramsNow() {
        try {
            let programmes = await fetchGetTvProgramsNow();
            console.log('fctMajTvPrograms ',programmes);

            const filteredProgrammes = programmes.filter(programme =>
                listeChaines.some(chaine => chaine.channelId === programme.channelId)
            );

            // Compte le nombre d'éléments par catégorie
            const categoryCounts = filteredProgrammes.reduce((counts, item) => {
                counts[item.category] = (counts[item.category] || 0) + 1;
                return counts;
            }, {});
            console.log('categoryCounts',categoryCounts);
            
            divProgramsNowFilter.innerHTML = '';
            // Création des boutons avec le nombre d'éléments
            Object.entries(categoryCounts).forEach(([category, count]) => {
                const button = document.createElement('button');
                button.textContent = `${category} (${count})`; // Libellé du bouton avec le nombre d'éléments
                button.className = 'category-button'; // Classe CSS

                // Ajoutez un gestionnaire d'événements si nécessaire
                button.addEventListener('click', () => {
                    console.log(`Filtre appliqué : ${category}`);
                    divProgramsNow.innerHTML = '';
                    listeChaines.forEach(chaine => {
                        if (chaine.channelId) {
                            const monProg = filteredProgrammes.find(item => item.channelId === chaine.channelId);
                            if (monProg) {
                                //console.log(category,monProg.category);
                                if (monProg.category === category) {
                                    fctVignetteProgramme(chaine,monProg,divProgramsNow);
                                }
                                                        
                            }                    
                        }                
                    });
                });

                // Ajoutez le bouton à la div
                divProgramsNowFilter.appendChild(button);
            });


            divProgramsNow.innerHTML = '';
            listeChaines.forEach(chaine => {
                if (chaine.channelId) {
                    const monProg = programmes.find(item => item.channelId === chaine.channelId);
                    if (monProg) {
                        fctVignetteProgramme(chaine,monProg,divProgramsNow);                        
                    }                    
                }                
            });


            let maintenant = new Date(); // Date actuelle
            maintenant = maintenant.toLocaleTimeString({ hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
            btnProgramsNow.innerHTML = filteredProgrammes.length + ' programmes à '+maintenant+' 🔍Actualiser';

        } catch (error) {
            console.error('Erreur lors de la récupération des fctMajTvProgramsNow :', error);
        }
    }



    function fctMajListeChaines() {
        // Récupérer la div où ajouter la liste déroulante
        const programsListeDiv = document.getElementById("programsListe");

        label = document.createElement("label");
        label.htmlFor = 'inputChaines';
        label.textContent = 'Chaines : ';
        programsListeDiv.appendChild(label);

        myInput = document.createElement("input");
        myInput.setAttribute("list", "datalistChaines"); // Associe l'input à la datalist
        myInput.id = 'datalistInput';
        myInput.name = 'datalistChaines';
        programsListeDiv.appendChild(myInput);

        datalist = document.createElement("datalist");
        datalist.id = 'datalistChaines';

        listeChaines.forEach(item => {
            const option = document.createElement("option");
            option.value = item.nb + ' - ' + item.name;
            datalist.appendChild(option);
        });

        programsListeDiv.appendChild(datalist);


        // Ajouter un listener sur l'input
        myInput.addEventListener('input', function () {
            const selectedValue = myInput.value;
            console.log(`Valeur sélectionnée : ${selectedValue}`);
            const numberPart = selectedValue.split(" - ")[0]; // Récupère tout avant " - "
            const channelPart = selectedValue.split(" - ")[1];
            
            
            if (numberPart) {
                currentChannelNb = numberPart;
                const maChaine = listeChaines.find(item => item.nb === numberPart);
                let nomChaine;
                if (maChaine) {
                    nomChaine = maChaine.channelId;
                } else {
                    nomChaine = channelPart;
                }
                fctClicVignetteChaine(myInput,parseInt(numberPart));    
                fctMajTvPrograms(numberPart,nomChaine); 
            }

   
        });
    }


    let listeChaines = [];

    async function fctChargeDonnesFreeBox() {
        try {
            const bouquetsList = await fetchFreebox('api/v8/tv/bouquets/');
            console.log('Etape 1 bouquetsList',bouquetsList['result']);
            let bouquetIndex;
            bouquetsList['result'].forEach(bouq => {
                if (bouq.name==='Freebox TV') {
                    bouquetIndex = bouq.id;
                }
            });
            console.log('bouquetIndex', bouquetIndex);
            let channels = await fetchFreebox('api/v6/tv/channels/');
            console.log('Etape 2 channels',channels['result']);
            
            let bouquets = await fetchFreebox('api/v3/tv/bouquets/'+bouquetIndex+'/channels');
            console.log('Etape 3 bouquets',bouquets['result']);

            let channelsIds = await fetchGetChannelsIds();
            console.log('Etape 4 channelsIds',channelsIds);

            const channelsArray = Array.isArray(channels['result'])
            ? channels['result']
            : Object.values(channels['result']);


            bouquets['result'].forEach(chaine => {                
                const channel = channelsArray.find(item => item.uuid === chaine.uuid);
                //console.log(chaine,channel);
                if (chaine.sub_number==0 && chaine.available) {

                    const chanelId = channelsIds.find(item => {
                        const cleanedItemName = item.name.toLowerCase().replace(/[\s']+/g, '');
                        const cleanedShortName = channel.short_name.toLowerCase().replace(/[\s']+/g, '');
                        return cleanedItemName.startsWith(cleanedShortName);
                    });
                    //console.log(chaine.number,channel.short_name,chanelId);
                    let myChannelId=null;
                    if (chanelId) {
                        myChannelId = chanelId.channelId;
                    }

                    const maChaine = chaines.find(item => item.id === chaine.number);
                    let maCat = '?'
                    if (maChaine) {
                        if (maChaine.cat) {
                            maCat = maChaine.cat;
                        }
                    } else {
                        maCat = '??';
                    }

                    //console.log(chaine.number,channel.short_name,maCat,channel.logo_url);
                    
                    listeChaines.push({ nb: chaine.number,
                                        pub: chaine.pub_service,
                                        abo: channel.has_abo,
                                        name: channel.short_name,
                                        channelId: myChannelId,
                                        cat: maCat,
                                        img: channel.logo_url});
                }
            });
            
            listeChaines.sort((a, b) => a.nb - b.nb);
            console.log('Chaînes FINALES :', listeChaines);
            
            saveListeChainesToLocalStorage(listeChaines);

            fctShowToast(listeChaines.length + ' chaines trouvées',2000);

            fctMajChainesListe('TNT');
            fctMajChainesCarousel();
            fctMajListeChaines();
            fctMajLogChaines();
            


        } catch (error) {
            console.error('Erreur lors de la récupération des bouquets :', error);
        }
    }
    
    const locationHref = window.location.href;
    console.log(`locationHref : ${locationHref}`);
    
    if (locationHref.split(".")[0] != 'http://192') {
        fctShowToast('Accès distant ⛔ commandes boquées',2000);
        accesLocal = false;
    }

    



    // Fonction pour sauvegarder dans le localStorage
    function saveListeChainesToLocalStorage(data) {
        const now = new Date().toISOString(); // Date actuelle
        localStorage.setItem('listeChaines', JSON.stringify(data)); // Stocke les données
        localStorage.setItem('lastUpdate', now); // Stocke la date de la dernière mise à jour
    }

    // Fonction pour charger la liste depuis le localStorage
    function getListeChainesFromLocalStorage() {
        const storedData = localStorage.getItem('listeChaines');
        return storedData ? JSON.parse(storedData) : null; // Retourne les données ou null si inexistant
    }

    // Fonction pour vérifier si une semaine s'est écoulée
    function shouldReloadListeChaines() {
        const lastUpdate = localStorage.getItem('lastUpdate');
        if (!lastUpdate) return true; // Si pas de date, on recharge

        const lastUpdateDate = new Date(lastUpdate);
        const now = new Date();

        // Vérifie si la différence entre les deux dates dépasse 7 jours
        const diffInDays = (now - lastUpdateDate) / (1000 * 60 * 60 * 24);
        return diffInDays > 7;
    }


    function initListeChaines() {
        if (shouldReloadListeChaines()) {
            console.log('Chargement des nouvelles données...');
            fctChargeDonnesFreeBox();

        } else {
            console.log('Chargement des données depuis le localStorage...');
            // Charge les données à utiliser
            listeChaines = getListeChainesFromLocalStorage();
            console.log('Données actuelles :', listeChaines);
            fctMajChainesListe('TNT');
            fctMajChainesCarousel();
            fctMajListeChaines();
            fctMajLogChaines();
            fctMajTvPrograms(currentChannelNb,'automoto-89');
        }


    }

    // Appeler la fonction d'initialisation
    initListeChaines();



    
    function logListNbSorted() {
        // Récupérer les statistiques du localStorage
        let statistics = JSON.parse(localStorage.getItem('statistics')) || [];    
        // Trier les statistiques par ordre décroissant de nb
        statistics.sort((a, b) => b.nb - a.nb);    
        // Retourner la liste des nb triés
        return statistics.map(item => item.nb);
    }
    
    function logIncrementClics(nb) {
        // Récupérer les statistiques du localStorage
        let statistics = JSON.parse(localStorage.getItem('statistics')) || [];
    
        // Trouver l'index de l'élément avec le même nb
        const index = statistics.findIndex(item => item.nb === nb);
    
        if (index !== -1) {
            // Si l'élément existe, incrémenter le nombre de clics
            statistics[index].clics += 1;
        } else {
            // Sinon, ajouter un nouvel élément avec 1 clic
            statistics.push({ nb, clics: 1 });
        }
    
        // Sauvegarder les statistiques mises à jour dans le localStorage
        localStorage.setItem('statistics', JSON.stringify(statistics));
    }
    


    function fctVignetteProgramme(chaine,program,container) {

        //console.log(fctVignetteProgramme,chaine,program,program.picture);
        const button = document.createElement('button');
        button.classList.add('classBouton');
        button.style.minWidth = '100px';
        button.style.maxHeight = '100px';
        button.style.width = '100px';
        button.style.height = '100px';
        button.style.backgroundColor = 'black';
        button.style.opacity = 1;

        if (program.picture) {
            const divImg = document.createElement('div');
            divImg.classList.add('classChaineImage');
                const img = document.createElement('img');
                //img.style.maxWidth = '100px';
                //img.style.maxHeight = '100px';
                img.style.width = '100px';
                img.style.height = '100px';
                img.style.objectFit = 'cover';                 
                img.src = program.picture;        
                divImg.appendChild(img);
            button.appendChild(divImg);
        }

        // Conversion en objets Date
        let start = new Date(program.startDateTime);
        let stop = new Date(program.stopDateTime);
        let now = new Date();
        now.setHours(now.getHours() + 1);

        //console.log('Start:', start.toISOString());
        //console.log('Stop:', stop.toISOString());
        //console.log('Now:', now.toISOString());
        // Vérifier si l'heure courante est entre start et stop
        if (now >= start && now <= stop) {
            // Calculer le pourcentage d'avancement
            let totalDuration = stop - start;
            let elapsedDuration = now - start;
            let progressPercentage = (elapsedDuration / totalDuration) * 100;
            //console.log('progressPercentage',progressPercentage);
            const divProgress = document.createElement('div');
            divProgress.classList.add('classChaineNumber'); 
            divProgress.style.backgroundColor = 'green';
            divProgress.style.opacity = .7;
            divProgress.style.top = '80px';
            divProgress.style.width = progressPercentage.toFixed(2) + '%';
            divProgress.style.height = '20px';
            button.appendChild(divProgress);
        }


        // Formatage des heures et minutes
        // Formatage en UTC
        let startTime = start.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
        let stopTime = stop.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
        // Affichage du résultat
        let formatted = `de ${startTime} à ${stopTime}`;

        const divNumber = document.createElement('div');
        divNumber.classList.add('classChaineNumber');
        divNumber.style.fontSize = '12px';
        if (!chaine.pub && chaine.abo) {
            divNumber.innerHTML = '💲'
        }
        divNumber.innerHTML += program.title;

        button.appendChild(divNumber);

        const divTitle = document.createElement('div');
        divTitle.classList.add('classChaineTitle');        
        divTitle.innerHTML = formatted;
        button.appendChild(divTitle);

        container.appendChild(button);    


        button.addEventListener('click', () => {
            // Ajouter les autres informations dans details
            progDetail.innerHTML = '';
            const img = document.createElement('img');
            img.style.maxWidth = '380px';
            img.style.maxHeight = '380px';
            img.style.minWidth = '250px';
            img.style.minHeight = '250px';
            img.style.width = 'auto';
            img.style.height = 'auto';                    
            img.src = program.picture;        
            progDetail.appendChild(img);

            fctVignetteChaine(chaine,progDetail);

            const p = document.createElement('p');
            if (program.title) {                
                p.innerHTML += `<strong>${program.title}</strong><br><br>`;                
            }
            // Conversion en objets Date
            let start = new Date(program.startDateTime);
            let stop = new Date(program.stopDateTime);
            let startTime = start.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
            let stopTime = stop.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
            // Affichage du résultat
            let formatted = `de ${startTime} à ${stopTime}`;
            p.innerHTML += formatted + '<br><br>';


            if (program.year) {                
                p.innerHTML += `<strong>Année : </strong>${program.year}<br><br>`;                
            }
            if (program.category) {
                p.innerHTML += `<strong>Catégorie : </strong>${program.category}<br><br>`;
            }
            if (program.credits) {
                p.innerHTML += `<strong>Crédits : </strong>${program.credits}<br><br>`;
            }
            if (program.starRatings) {
                p.innerHTML += `<strong>Avis : </strong>${program.starRatings}<br><br>`;
            }
            if (program.description) {                
                p.innerHTML += `<strong>Description : </strong>${program.description}<br><br>`;                
            }
            if (program.subtitle) {                
                p.innerHTML += `<strong>Sous-Titre :</strong> ${program.subtitle}<br>`;                
            }
            progDetail.appendChild(p);

            const imgBing = document.createElement('img');                 
            imgBing.src = 'https://th.bing.com/th?w=300&h=300&q='+program.title+' '+chaine.name;
                  
            progDetail.appendChild(imgBing);


            progDetail.style.left = '0px';

        });  
    }

    // Fonction pour afficher les programmes sur la page (par exemple dans une div)
    function fctMajPrograms(nb,programs) {
        console.log('fctMajPrograms',nb,programs,programs.length);
        const container = document.getElementById('programsContainer'); // Une div dans votre HTML
        container.innerHTML = ''; // Nettoyer les anciens résultats

        const maChaine = listeChaines.find(item => item.nb == nb);
        //console.log('fctMajPrograms maChaine',maChaine);
        fctVignetteChaine(maChaine,container);

        if (programs.length==0) {
            const divMessage = document.createElement('div');
            divMessage.style.color = 'white';
            divMessage.innerHTML = 'Aucun programme pour la chaine<br>'+maChaine.name;
            container.appendChild(divMessage);
        }

        programs.forEach((program) => {
            fctVignetteProgramme(maChaine,program,container);           
            
        });
    }


    let letProgramsNow;
    const btnProgramsNow = document.getElementById('btnProgramsNow');
    const divProgramsNow = document.getElementById('divProgramsNow');
    btnProgramsNow.addEventListener('click', () => {
        btnProgramsNow.innerHTML = 'Chargement...';
        letProgramsNow = fctMajTvProgramsNow();

    });


    // Ajouter un écouteur d'événement pour le formulaire
    const formCmdSimple = document.getElementById('formCmdSimple');
    formCmdSimple.addEventListener('submit', (event) => {
        event.preventDefault();
        const inputCmdSimple = document.getElementById('inputCmdSimple').value;
        sendCommand(ip, code, inputCmdSimple);       
    });

    // Ajouter un écouteur d'événement pour le formulaire
    const formCmdSeq = document.getElementById('formCmdSeq');
    formCmdSeq.addEventListener('submit', (event) => {
        event.preventDefault();
        const inputCmdSeq = document.getElementById('inputCmdSeq').value;        
        for (let i = 0; i < inputCmdSeq.length; i++) {
            console.log(`Caractère ${i}:`, inputCmdSeq[i]);
            setTimeout(() => {
                sendCommand(ip, code, inputCmdSeq[i]);
            }, i*100);
        }        
    });

    //=======================================================
    const btnLeft = document.getElementById('btnLeft');
    btnLeft.addEventListener('click', (event) => {
        sendCommand(ip, code, 'left');      
    });
    const btnBack = document.getElementById('btnBack');
    btnBack.addEventListener('click', (event) => {
        sendCommand(ip, code, 'back');      
    });
    const btnDelete = document.getElementById('btnDelete');
    btnDelete.addEventListener('click', (event) => {
        sendCommand(ip, code, 'delete');      
    });
    const btnSpace = document.getElementById('btnSpace');
    btnSpace.addEventListener('click', (event) => {
        sendCommand(ip, code, 'space');      
    });
    const btnRight = document.getElementById('btnRight');
    btnRight.addEventListener('click', (event) => {
        sendCommand(ip, code, 'right');      
    });


    //============================================
    const purgeButton = document.getElementById('purgeButton');
    purgeButton.addEventListener('click', () => {
        // Purger les données du localStorage
        localStorage.clear();
        // Recharger la page
        location.reload();
    });






    progDetail.addEventListener('click', () => {
        //console.log('progDetail');
        progDetail.style.left = '-1000px';
    }); 


    // Générer les boutons initialement
    generateLinks();

    // Regénérer les boutons lorsque les valeurs changent
    ipInput.addEventListener('input', generateLinks);
    codeInput.addEventListener('input', generateLinks);


    //Opacity
    document.getElementById('rngOpacity').addEventListener('change', function() {
        const opac = document.getElementById('rngOpacity').value;
        const boutons = document.querySelectorAll('.classBouton');
        boutons.forEach(bouton => {
            bouton.style.opacity = opac;
        });
    });

    //Full Screen
    document.getElementById('btnFullScreen').addEventListener('click', function() {
        requestFullScreen();
    });

    //================================================================================
    // Passer en mode plein écran
    function requestFullScreen() {
        const elem = document.documentElement; // Ou l'élément spécifique que vous voulez mettre en plein écran
    
        if (!document.fullscreenElement && !document.webkitFullscreenElement) {
            // Passer en plein écran
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.webkitRequestFullscreen) { // Safari/iOS
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) { // IE/Edge
                elem.msRequestFullscreen();
            } else if (elem.webkitEnterFullscreen) {
                elem.webkitEnterFullscreen(); //for iphone this code worked
            }

            fctShowToast('Full Screen Activated 👍',2000);
        } else {
            // Quitter le mode plein écran
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) { // Safari/iOS
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { // IE/Edge
                document.msExitFullscreen();
            }
            fctShowToast('Full Screen Exited',2000);
        }
    }



    function fctShowToast(myText,myTime = 2000) {
        console.info("fctShowToast "+myText);
        var x = document.getElementById("snackbar");
        x.innerHTML = myText;
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, myTime);
    }






});
