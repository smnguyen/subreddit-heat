import { fetchPosts, getSubreddit } from 'helpers';

const SkillHandlers = {
  'HotPostsIntent': function() {
    const request = this.event.request;
    const subreddit = getSubreddit(request);

    if (!subreddit) {
      console.error("Couldn't parse subreddit from request:", request);
      return;
    }

    fetchPosts(subreddit)
      .then(posts => posts.filter(post => !post.data.stickied))
      .then(posts => {
        let message;
        if (posts.length) {
          message = `The hottest post on r ${subreddit} is: "${posts[0].data.title}".`;
        } else {
          message = `Looks like nobody has posted on r ${subreddit} yet.`
        }
        this.emit(':tell', message);
      })
      .catch(error => {
        console.error(error);
        console.error(`Failed to fetch posts for subreddit ${subreddit}`);
      });
  }
};

export default SkillHandlers;
