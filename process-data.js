console.log("running process-data.js");

const fs = require ('fs');
const papa = require('papaparse');
const INPUT_FILE = 'src/_data/june-2023-translated.csv';
const OUTPUT_PATH = 'src/data/';
const file = fs.createReadStream(INPUT_FILE);
let count = 0;
const langs = ['en', 'es'];
let translation_results = {
    'lines': [],
    'en': {
        'lang': 'en',
        'updates': {}
    },
    'es': {
        'lang': 'es',
        'updates': {}
    }
};

papa.parse(file, {
    header: true,
    worker: true,
    encoding: 'utf-8',
    complete: function(results) {
        try {
            results.data.forEach(function(item) {
                if (!translation_results.lines.includes(item.line)) {
                    translation_results.lines.push(item.line);
                    langs.forEach(function(lang) {
                        translation_results[lang].updates[item.line] = [];
                    });
                }
                langs.forEach(function(lang) {
                    let update = {};
                    update['update'] = item[lang + '-update'];
                    update['reason'] = item[lang + '-reason'];
                    update['map'] = item['map'];
                    translation_results[lang].updates[item.line].push(update);
                });
            });
            // console.log(results);

            langs.forEach(function(lang) {
                let jsonOutput = JSON.stringify(translation_results[lang]);
                let fileName = lang + '-updates.json';
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
})