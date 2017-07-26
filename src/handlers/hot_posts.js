import Alexa from 'alexa-sdk';

import { findHotPosts } from 'handlers/common';
import { getCurrentPost, rankToOrdinal } from 'helpers';
import { INTENTS, STATES } from 'helpers/constants';

const HotPostsHandlers = Alexa.CreateStateHandler(STATES.HOT_POSTS, {
  [INTENTS.AMAZON.CANCEL]: function() {
    this.emit(':tell', 'Goodbye!');
  },
  [INTENTS.AMAZON.STOP]: function() {
    this.emitWithState(INTENTS.AMAZON.CANCEL);
  },
  [INTENTS.AMAZON.HELP]: function() {
    const { subreddit } = this.attributes;
    this.emit(
      ':ask',
      `I can tell you about the hottest posts on r ${subreddit}.
      You can say "next", "previous", or "say that again" to hear more.`
    );
  },
  [INTENTS.POST_TITLE]: function() {
    const { subreddit, rank } = this.attributes;
    const { title } = getCurrentPost(this.attributes);

    this.emit(
      ':ask',
      `The ${rankToOrdinal(rank)} hottest post on r ${subreddit} is: "${title}".
      Do you want to know more?`
    );
  },
  [INTENTS.POST_DETAILS]: function() {
    this.handler.state = STATES.POST_DETAIL;
    this.emitWithState(INTENTS.POST_DETAILS);
  },
  [INTENTS.AMAZON.REPEAT]: function() {
    this.emitWithState(INTENTS.POST_TITLE);
  },
  [INTENTS.AMAZON.YES]: function() {
    this.emitWithState(INTENTS.POST_DETAILS);
  },
  [INTENTS.AMAZON.NO]: function() {
    const { posts, rank } = this.attributes;
    if (rank === posts.length) {
      this.emitWithState(INTENTS.AMAZON.CANCEL);
    } else {
      this.emitWithState(INTENTS.AMAZON.NEXT);
    }
  },
  [INTENTS.AMAZON.PREVIOUS]: function() {
    const { subreddit, rank } = this.attributes;

    if (rank === 1) {
      const { title } = getCurrentPost(this.attributes);
      this.emit(
        ':ask',
        `Sorry, you're already on the top post for r ${subreddit}.
        Do you want to know more about "${title}"?`
      );
    } else {
      this.attributes.rank = rank - 1;
      this.emitWithState(INTENTS.POST_TITLE);
    }
  },
  [INTENTS.AMAZON.NEXT]: function() {
    const { subreddit, posts, rank } = this.attributes;

    if (rank === posts.length) {
      const { title } = getCurrentPost(this.attributes);
      this.emit(
        ':ask',
        `Sorry, that's all I have for you on r ${subreddit}.
        Do you want to know more about "${title}"?`
      );
    } else {
      this.attributes.rank = rank + 1;
      this.emitWithState(INTENTS.POST_TITLE);
    }
  },
  [INTENTS.HOT_POSTS]: findHotPosts,
  [INTENTS.UNHANDLED]: function() {
    this.emitWithState(INTENTS.AMAZON.HELP);
  }
});

export default HotPostsHandlers;
