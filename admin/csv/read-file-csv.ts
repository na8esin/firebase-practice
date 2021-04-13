import * as fs from 'fs';
import * as path from 'path';
import * as parse from 'csv-parse/lib/sync';

// https://github.com/adaltas/node-csv-parse/blob/master/samples/recipe.file.js

(async function () {
  const content =
    await fs.promises.readFile(path.join(__dirname, './sample.csv'));
  const input = content.toString();

  const records = parse(input, {
    columns: true,
    skip_empty_lines: true
  })
  console.log(records);
})();