import Alexa from 'alexa-sdk';

import NewSessionHandlers from 'handlers/new_session';
import PostDetailHandlers from 'handlers/post_detail';

export function handler(event, context, callback) {
  const alexa = Alexa.handler(event, context, callback);
  alexa.APP_ID = process.env.APP_ID;
  alexa.registerHandlers(NewSessionHandlers, PostDetailHandlers);
  alexa.execute();
}
