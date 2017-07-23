import Alexa from 'alexa-sdk';

import AmazonHandlers from 'handlers/amazon';

export function handler(event, context, callback) {
  const alexa = Alexa.handler(event, context, callback);
  alexa.APP_ID = process.env.APP_ID;
  alexa.registerHandlers(AmazonHandlers);
  alexa.execute();
}
