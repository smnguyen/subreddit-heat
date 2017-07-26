import Alexa from 'alexa-sdk';

import NewSessionHandlers from 'handlers/new_session';
import HotPostsHandlers from 'handlers/hot_posts';
import PostDetailHandlers from 'handlers/post_detail';

export function handler(event, context, callback) {
  const alexa = Alexa.handler(event, context, callback);
  alexa.appId = process.env.APP_ID;
  alexa.registerHandlers(
    NewSessionHandlers,
    HotPostsHandlers,
    PostDetailHandlers
  );
  alexa.execute();
}
