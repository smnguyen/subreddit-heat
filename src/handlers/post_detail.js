import Alexa from 'alexa-sdk';

import { INTENTS, STATES } from 'helpers/constants';

const PostDetailHandlers = Alexa.CreateStateHandler(STATES.POST_DETAIL, {
  [INTENTS.AMAZON.CANCEL]: function() {
    this.emit(':tell', 'Goodbye!');
  },
  [INTENTS.AMAZON.STOP]: function() {
    this.emit(INTENTS.AMAZON.CANCEL);
  },
  [INTENTS.AMAZON.NO]: function() {
    this.emit(INTENTS.AMAZON.CANCEL);
  },
  [INTENTS.AMAZON.HELP]: function() {
    const { currentPost } = this.attributes;
    const { title, subreddit } = currentPost;
    this.emit(
      ':ask',
      `Let me know if you want to know more about "${title}" from r ${subreddit}.`,
      `Do you want to know more about "${title}"?`
    );
  },
  [INTENTS.AMAZON.YES]: function() {
    const { currentPost } = this.attributes;
    const { title, subreddit, score, author, domain, is_self, num_comments } = currentPost;

    const messages = [
      `"${title}" on r ${subreddit} has ${score} karma.`,
      `It was posted by ${author}.`,
      is_self ? 'The post was a self post.' : `The post was found on ${domain}.`,
      `It has ${num_comments} comments.`
    ];

    this.emit(':tell', messages.join(' '));
  },
  [INTENTS.UNHANDLED]: function() {
    this.emit(INTENTS.AMAZON.HELP);
  }
});

export default PostDetailHandlers;
