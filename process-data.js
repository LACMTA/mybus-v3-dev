console.log("running process-data.js");

const fs = require ('fs');
const papa = require('papaparse');
const UPDATES_FILE = 'src/_data/june-2023-translated-final.csv';
const CONTENT_FILE = 'src/_data/june-2023-content.csv';
const OUTPUT_PATH = 'src/data/';
const rs_updates_file = fs.createReadStream(UPDATES_FILE);
const rs_content_file = fs.createReadStream(CONTENT_FILE);

let count = 0;
const langs = ['en', 'es', 'hy', 'ja', 'ko', 'ru', 'vi', 'zh-tw'];
let translation_results = {
    'lines': [],
    'en': {
        'lang': 'en',
        'page': {},
        'updates': {}
    },
    'es': {
        'lang': 'es',
        'page': {},
        'updates': {}
    },
    'hy': {
        'lang': 'hy',
        'page': {},
        'updates': {}
    },
    'ja': {
        'lang': 'ja',
        'page': {},
        'updates': {}
    },
    'ko': {
        'lang': 'ko',
        'page': {},
        'updates': {}
    },
    'ru': {
        'lang': 'ru',
        'page': {},
        'updates': {}
    },
    'vi': {
        'lang': 'vi',
        'page': {},
        'updates': {}
    },
    'zh-tw': {
        'lang': 'zh-tw',
        'page': {},
        'updates': {}
    }
};

papa.parse(rs_updates_file, {
    header: true,
    worker: true,
    encoding: 'utf-8',
    complete: function(results) {
        try {
            results.data.forEach(function(item) {
                let line = item.line;

                if (!translation_results.lines.includes(line)) {
                    translation_results.lines.push(line);
                    langs.forEach(function(lang) {
                        translation_results[lang].updates[line] = [];
                    });
                }
                langs.forEach(function(lang) {
                    let update = {};
                    update['update'] = item[lang + '-update'];
                    update['reason'] = item[lang + '-reason'];
                    update['map'] = item['map'];
                    translation_results[lang].updates[line].push(update);
                });
            });
            // console.log(results);

            papa.parse(rs_content_file, {
                header: true,
                worker: true,
                encoding: 'utf-8',
                complete: function(results) {
                    try {
                        results.data.forEach(function(item) {

                            langs.forEach(function(lang){
                                let content = {};
                                translation_results[lang].page[item.field] = item[lang + '-content'];
                            });

                        });

                        langs.forEach(function(lang) {
                            let jsonOutput = JSON.stringify(translation_results[lang]);
                            let fileName = lang + '-content.json';
                            fs.writeFile(OUTPUT_PATH + fileName, jsonOutput, err => {
                                if (err) {
                                    console.log('Error writing file: ', err);
                                } else {
                                    console.log('Successfully wrote file: ', fileName);
                                }
                            })
                        });

                    } catch (err) {
                        console.log ('Error: ', err);
                    }
                }
            });
        } catch (err) {
            console.log ('Error: ', err);
        }
    }
});