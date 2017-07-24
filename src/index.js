import Alexa from 'alexa-sdk';

import NewSessionHandlers from 'handlers/new_session';

export function handler(event, context, callback) {
  const alexa = Alexa.handler(event, context, callback);
  alexa.APP_ID = process.env.APP_ID;
  alexa.registerHandlers(NewSessionHandlers);
  alexa.execute();
}
