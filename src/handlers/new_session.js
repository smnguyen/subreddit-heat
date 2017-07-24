import { fetchPosts, getSubreddit } from 'helpers';
import { INTENTS, STATES } from 'helpers/constants';

const NewSessionHandlers = {
  [INTENTS.AMAZON.CANCEL]: function() {
    this.emit(':tell', 'Goodbye!');
  },
  [INTENTS.AMAZON.STOP]: function() {
    this.emit(INTENTS.AMAZON.CANCEL);
  },
  [INTENTS.AMAZON.HELP]: function() {
    this.emit(
      ':ask',
      'I can tell you the hot posts for a subreddit you care about.',
      "Here's an example: ask me, 'What are the hot posts on /r/politics?'"
    );
  },
  [INTENTS.HOT_POSTS]: function() {
    const request = this.event.request;
    const { subreddit, query } = getSubreddit(request);

    if (!subreddit) {
      console.error("Couldn't parse subreddit from request:", request);
      // TODO Also tell the user Alexa couldn't tell what they meant
      this.emit(INTENTS.AMAZON.HELP);
    }

    fetchPosts(subreddit)
      .then(posts => posts.filter(post => !post.data.stickied))
      .then(posts => {
        if (posts.length) {
          const postData = posts[0].data;
          const { title } = postData;

          this.handler.state = STATES.POST_DETAIL;
          this.attributes.currentPost = postData;
          this.emit(
            ':ask',
            `The hottest post on r ${subreddit} is: "${title}". Do you want to know more?`,
            `Do you want to know more about "${title}"?`
          );
        } else {
          // TODO Ask the user if they want to search again
          this.emit(':tell', `Looks like nobody has posted on r ${subreddit} yet.`);
        }
      })
      .catch(error => {
        console.error(error);
        console.error(`Failed to fetch posts for query ${query}, subreddit ${subreddit}`);
        this.emit(':tell', `Sorry, I couldn't find the subreddit ${query}.`);
      });
  },
  [INTENTS.UNHANDLED]: function() {
    this.emit(INTENTS.AMAZON.HELP);
  }
};

export default NewSessionHandlers;
