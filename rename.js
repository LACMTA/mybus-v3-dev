const { join } = require ('path');
const { readdirSync, renameSync } = require('fs');

const dir = 'src/files/schedules/';

const files = readdirSync(dir);

files.forEach(file => {
	let newFileName = '';

	let match = file.match(/^([0-9]*)( |_|-)*([0-9]*)( |_|-)*(TT)( |_|-)*([0-9]*)( |_|-)*([0-9]*)( |_|-)*([0-9]*)( |_|-)*.pdf$/);
	
	if (match[3] == '') {
		newFileName = `${match[1]}_TT_${match[7]}-${match[9]}-${match[11]}.pdf`;
	} else {
		newFileName = `${match[1]}-${match[3]}_TT_${match[7]}-${match[9]}-${match[11]}.pdf`;
	}

	if (file != newFileName) {
		renameSync(join(dir, file), join(dir, newFileName));
		console.log(`Renamed:\n${file}\nto\n${newFileName}\n`);
	}
});