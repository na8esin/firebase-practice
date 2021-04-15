import * as fs from 'fs';
import * as path from 'path';
import * as parse from 'csv-parse/lib/sync';

// https://github.com/adaltas/node-csv-parse/blob/master/samples/recipe.file.js

(async function () {
  // ファイル読み込み
  const content =
    await fs.promises.readFile(path.join(__dirname, 'sample.csv'));
  // buf -> string
  const input = content.toString();

  // string(csv) -> object
  const records = parse(input, {
    columns: true, // 一行目をフィールドのkeyとして使用する
    skip_empty_lines: true
  });

  records.forEach((element: any) => {
    console.log(element);
    console.log('----');
  });

})();
