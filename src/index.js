import Alexa from 'alexa-sdk';

import amazonHandlers from 'handlers/amazon';

const handlers = {

};

export function handler(event, context, callback) {
  const alexa = Alexa.handler(event, context, callback);
  alexa.APP_ID = process.env.APP_ID;
  alexa.registerHandlers(amazonHandlers, handlers);
  alexa.execute();
};
