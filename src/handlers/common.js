import { fetchPosts, getSubreddit } from 'helpers';
import { INTENTS, STATES } from 'helpers/constants';

export function withHandlerLogging(handlers) {
  Object.keys(handlers).forEach(intent => {
    const rawHandler = handlers[intent];
    handlers[intent] = function() {
      const request = this.event.request;
      const requestType = request.type;
      const requestIntent = requestType === 'IntentRequest' ? request.intent.name : '';
      const state = this.handler.state;

      console.log(
        `[request type] ${requestType}, [request intent] ${requestIntent},
        [intent] ${intent}, [state] ${state}`
      );

      try {
        rawHandler.call(this);
      } catch (e) {
        console.error(`Error handling intent ${intent} with state ${state}`, e);
      }
    };
  });
  return handlers;
}

export function findHotPosts() {
  const request = this.event.request;
  const { subreddit, query } = getSubreddit(request);

  fetchPosts(subreddit)
    .then(posts => posts.filter(post => !post.data.stickied))
    .then(posts => {
      if (posts.length) {
        this.handler.state = STATES.HOT_POSTS;
        this.attributes.subreddit = subreddit ? `r ${subreddit}` : 'the front page';
        this.attributes.posts = posts;
        this.attributes.rank = 1;
        this.emitWithState(INTENTS.POST_TITLE);
      } else {
        this.handler.state = '';
        this.emit(
          ':ask',
          `Looks like nobody has posted on ${subreddit} yet. Ask me about a different subreddit.`,
          'Ask me about a different subreddit.'
        );
      }
    })
    .catch(error => {
      console.error(error);
      console.error(`Failed to fetch posts for query ${query}, subreddit ${subreddit}`);
      this.emit(':ask', `Sorry, I couldn't find the subreddit ${query}. Ask me about a different subreddit.`);
    });
}
