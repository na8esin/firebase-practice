// https://github.com/firebase/functions-samples/blob/d3cbed16f2bcdf087fc7109e037c48459d30b425/quickstarts/thumbnails/functions/index.js#L19-L25

import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';
import * as parse from 'csv-parse/lib/sync';
import { getRepository } from 'fireorm';
import { Book } from '../book/book';

export class ImporterService {
  // main的な関数
  static async import(metadata: functions.storage.ObjectMetadata) {
    const tempFilePath = await ImporterService.download(metadata);
    if (!tempFilePath) {
      functions.logger.log('tempFilePath empty.');
      return
    }

    const entities = await ImporterService.csvToObject(tempFilePath);


    // ファイル削除
    fs.unlinkSync(tempFilePath);
  }

  // TODO: 戻り値の型が限定的と言うか一時的
  static async csvToObject(filePath: string)
    : Promise<Partial<Book>[]> {
    const content =
      await fs.promises.readFile(filePath);
    // buf -> string
    const input = content.toString();

    // string(csv) -> object
    return parse(input, {
      columns: true, // 一行目をフィールドのkeyとして使用する
      skip_empty_lines: true,
      cast: (value, context) => value === '' ? null : value
    });
  }

  // storageからtmp領域にダウンロード
  static async download(metadata: functions.storage.ObjectMetadata) {
    if (!metadata.name) {
      functions.logger.log('storage file name empty.');
      return;
    }
    const filePath = path.basename(metadata.name);
    const bucket = admin.storage().bucket();
    const tempFilePath = path.join(os.tmpdir(), filePath);
    await bucket.file(filePath).download({ destination: tempFilePath });
    // 非同期で削除されてればいい
    bucket.file(filePath).delete().then();
    return tempFilePath;
  }
}