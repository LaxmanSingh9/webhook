// functions/webhook.js

const admin = require('firebase-admin');

// Use a service account
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: '"https://polar-city-332413-default-rtdb.firebaseio.com",'
});

const db = admin.database();

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const data = JSON.parse(event.body);

  // Get a reference to the database
  const ref = db.ref('webhook_data');

  // Push data to the database
  await ref.push(data);

  return {
    statusCode: 200,
    body: 'OK'
  };
};