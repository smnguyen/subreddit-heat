import fetch from 'node-fetch';

import { getSubreddit } from 'helpers';

const SkillHandlers = {
  'HotPostsIntent': function() {
    const request = this.event.request;
    const subreddit = getSubreddit(request);

    if (!subreddit) {
      console.error("Couldn't parse subreddit from request:", request);
      return;
    }

    fetch(`https://www.reddit.com/r/${subreddit}/hot.json?limit=1`)
      .then(response => response.json())
      .then(json => json.data.children)
      .then(posts => posts.filter(post => !post.data.stickied))
      .then(posts => this.emit(
        ':tell',
        `The hottest post on r ${subreddit} is: "${posts[0].data.title}".`
      ))
      .catch(error => {
        console.error(error);
        console.error(`Failed to fetch posts for subreddit ${subreddit}`);
      });
  }
};

export default SkillHandlers;
