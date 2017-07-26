import { fetchPosts, getSubreddit } from 'helpers';
import { STATES } from 'helpers/constants';

export function findHotPosts() {
  const request = this.event.request;
  const { subreddit, query } = getSubreddit(request);

  if (!subreddit) {
    console.error("Couldn't parse subreddit from request:", request);
    return this.emit(
      ':ask',
      "Sorry, I don't know what you mean. I can tell you the hot posts for a subreddit you care about.",
      "Here's an example: ask me, 'What are the hot posts on /r/politics?'"
    );
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
        this.emit(
          ':ask',
          `Looks like nobody has posted on r ${subreddit} yet. Ask me about a different subreddit.`,
          `Ask me about a different subreddit.`
        );
      }
    })
    .catch(error => {
      console.error(error);
      console.error(`Failed to fetch posts for query ${query}, subreddit ${subreddit}`);
      this.emit(':tell', `Sorry, I couldn't find the subreddit ${query}.`);
    });
}
