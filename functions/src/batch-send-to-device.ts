import * as admin from 'firebase-admin';
import {
  messaging
} from 'firebase-admin';
import MessagingPayload = messaging.MessagingPayload;
import MessagingOptions = messaging.MessagingOptions;
import MessagingDevicesResponse = messaging.MessagingDevicesResponse;

/** 
 * // https://firebase.google.com/docs/cloud-messaging/send-message?hl=ja#send-to-individual-devices
 * divisionUnit=1000
*/
export async function batchSendToDevice(
  fcmTokens: string[],
  divisionUnit: number,
  message: MessagingPayload,
  options: MessagingOptions)
  : Promise<MessagingDevicesResponse[]> {

  const promises = [];
  for (let i = 0; i < fcmTokens.length; i += divisionUnit) {
    const dividedTokens = fcmTokens.slice(i, i + divisionUnit);
    promises.push(admin.messaging().sendToDevice(dividedTokens, message, options));
  }
  return await Promise.all(promises);
}