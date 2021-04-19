//import { admin } from "firebase-admin";
import admin from 'firebase-admin';

admin.initializeApp();

admin.auth().listUsers()
  .then(function (getUsersResult) {
    console.log('Successfully fetched user data:');
    getUsersResult.users.forEach((userRecord) => {
      console.log(userRecord);
    });

    console.log('Unable to find users corresponding to these identifiers:');
    getUsersResult.notFound.forEach((userIdentifier) => {
      console.log(userIdentifier);
    });
  })
  .catch(function (error) {
    console.log('Error fetching user data:', error);
  });