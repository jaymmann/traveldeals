const {Firestore} = require('@google-cloud/firestore');

// Create a new client
const firestore = new Firestore();

exports.writeSubscriber = async (message, context) => {
  try {
    console.log(`Encoded message: ${message.data}`);

    const incomingMessage = Buffer.from(message.data, 'base64').toString('utf-8');
    const parsedMessage = JSON.parse(incomingMessage);

    console.log(`Decoded message: ${JSON.stringify(parsedMessage)}`);

    // Handling undefined watch_regions
    if (!parsedMessage.watch_regions) {
      console.log('watch_regions is undefined, setting to default value or handling error.');
      // Set to default value, e.g., an empty array, or handle as needed
      parsedMessage.watch_regions = []; // Example default value
    }

    // Now, parsedMessage.watch_regions is guaranteed not to be undefined
    const documentData = {
      email_address: parsedMessage.email_address,
      watch_region: parsedMessage.watch_region
    };

    // Add a new document with a generated ID
    await firestore.collection('subscribers').add(documentData);
    console.log('Document written with specified data');
  } catch (error) {
    console.error(`Error writing document: ${error}`);
  }
};
