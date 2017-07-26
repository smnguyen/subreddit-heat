import Alexa from 'alexa-sdk';

import { findHotPosts, withHandlerLogging } from 'handlers/common';
import { getCurrentPost } from 'helpers';
import { INTENTS, STATES } from 'helpers/constants';

const PostDetailHandlers = Alexa.CreateStateHandler(STATES.POST_DETAIL, withHandlerLogging({
  [INTENTS.AMAZON.CANCEL]: function() {
    this.emit(':tell', 'Goodbye!');
  },
  [INTENTS.AMAZON.STOP]: function() {
    this.emitWithState(INTENTS.AMAZON.CANCEL);
  },
  [INTENTS.AMAZON.HELP]: function() {
    const { subreddit } = this.attributes;
    const { title } = getCurrentPost(this.attributes);
    this.emit(
      ':ask',
      `Let me know if you want to know more about "${title}" from r ${subreddit}.`,
      `Do you want to know more about "${title}"?`
    );
  },
  [INTENTS.POST_DETAILS]: function() {
    const { subreddit } = this.attributes;
    const { title, score, author, domain, is_self, num_comments } = getCurrentPost(this.attributes);

    const messages = [
      `"${title}" on r ${subreddit} has ${score} karma.`,
      `It was posted by ${author}.`,
      is_self ? 'The post was a self post.' : `The post was found on ${domain}.`,
      `It has ${num_comments} comments.`,
      "That's all I have on this post! Say 'next' to continue."
    ];

    this.handler.state = STATES.HOT_POSTS;
    this.emit(':ask', messages.join(' '), 'Say "next" to continue.');
  },
  [INTENTS.HOT_POSTS]: findHotPosts,
  [INTENTS.UNHANDLED]: function() {
    this.emitWithState(INTENTS.AMAZON.HELP);
  }
}));

export default PostDetailHandlers;
