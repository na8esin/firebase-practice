import * as admin from 'firebase-admin';
import { messaging } from 'firebase-admin';
import { getInitializeAppOptions } from './getInitializeAppOptions';

admin.initializeApp(getInitializeAppOptions());

// This registration token comes from the client FCM SDKs.
const registrationToken = 'dbeERohHQ42kEGMk7zxeiH:APA91bHYmXB_NfCVP32wEL_FFeeBq9K_ZXQqeNl0hx8m7Fx2IF7Z-sECpQTg9BKDelJjaSpR7gx5_LQDCelxoFFpTGcpVhqbwKwE9BE8smCuUh03nKpIm_eJkCK0VwtLT9v1Y4r_YdFr';

const payload: messaging.MessagingPayload = {
  data: {
    score: '850',
    time: '2:45'
  }
}

const options = {
  priority: 'high',
  timeToLive: 60 * 60 * 24
};

function main() {
  // Send a message to the device corresponding to the provided
  // registration token.
  admin.messaging().sendToDevice(registrationToken, payload, options)
    .then((response) => {
      // Response is a message ID string.
      console.log('Successfully sent message:', response);
    })
    .catch((error) => {
      console.log('Error sending message:', error);
    })
    .finally(() => process.exit(0));
}

main();