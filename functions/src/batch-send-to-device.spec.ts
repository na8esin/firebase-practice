import * as admin from 'firebase-admin';
import {
  messaging
} from 'firebase-admin';
import MessagingDevicesResponse = messaging.MessagingDevicesResponse;
import * as sinon from 'sinon';
import { batchSendToDevice } from './batch-send-to-device';

admin.initializeApp();

describe("batchSendToDevice", () => {
  it("Split logic works fine", async () => {
    const sandbox = sinon.createSandbox({});
    const messaging = admin.messaging();

    sandbox.replace(messaging, 'sendToDevice',
      (registrationToken, payload, options) => {

        const response: MessagingDevicesResponse = {
          canonicalRegistrationTokenCount: 1,
          failureCount: 0,
          multicastId: 1,
          results: [],
          successCount: 1
        };

        if (!Array.isArray(registrationToken)) {
          response.multicastId = Number(registrationToken);
          return new Promise((result, reject) => {
            return result(response);
          });
        }

        registrationToken.forEach((e) => {
          response.results.push({ messageId: e });
          return response;
        });
        return new Promise((result, reject) => {
          return result(response);
        });
      });
    const tokens = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
    const ret = await batchSendToDevice(tokens, 5, {}, {});
    console.log(JSON.stringify(ret, null, 2));
  });
});
