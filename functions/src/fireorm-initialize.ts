import * as fireorm from 'fireorm';
import { getInitializeAppOptions } from './initialize-app';

export function fireormInitialize() {
  const firestore = getInitializeAppOptions().firestore();
  fireorm.initialize(firestore);
}