import * as fs from 'fs';
import * as path from 'path';

(async function(){
  const content = await fs.promises.readFile(path.join(__dirname,'./sample.csv'));
  console.log(content.toString());
})();

