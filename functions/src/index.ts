import * as functions from "firebase-functions";
import { ImporterService } from './importer/importer.service';

// 個人的なプロジェクトではBlazeじゃないのでデプロイはしたことがないが、
// ほぼ同等のコードを業務でデプロイしたことがある

export const csvImport
  = functions.storage.object().onFinalize(async (metadata) => {
    ImporterService.import(metadata);
  });