import { findHotPosts } from 'handlers/common';
import { INTENTS } from 'helpers/constants';

const NewSessionHandlers = {
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
    this.emit(
      ':ask',
      'Hello! On Subreddit Heat, I can tell you the hot posts for a subreddit you care about.',
      "Here's an example: ask me, 'What are the hot posts on /r/politics?'"
    );
  },
  [INTENTS.HOT_POSTS]: findHotPosts,
  [INTENTS.UNHANDLED]: function() {
    this.emit(INTENTS.AMAZON.HELP);
  }
};

export default NewSessionHandlers;
