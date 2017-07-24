import { fetchPosts, getSubreddit } from 'helpers';

const NewSessionHandlers = {
  'AMAZON.CancelIntent': function() {
    this.emit(':tell', 'OK!');
  },
  'AMAZON.HelpIntent': function() {
    this.emit(
      ':ask',
      'I can tell you the hot posts for a subreddit you care about.',
      'Here\'s an example: ask me, "What are the hot posts on /r/politics?"'
    );
  },
  'AMAZON.NextIntent': function() {
    this.emit('AMAZON.HelpIntent');
  },
  'AMAZON.PreviousIntent': function() {
    this.emit('AMAZON.HelpIntent');
  },
  'AMAZON.RepeatIntent': function() {
    this.emit('AMAZON.HelpIntent');
  },
  'AMAZON.StopIntent': function() {
    this.emit('AMAZON.CancelIntent');
  },
  'HotPostsIntent': function() {
    const request = this.event.request;
    const { subreddit, query } = getSubreddit(request);

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
        console.error(`Failed to fetch posts for query ${query}, subreddit ${subreddit}`);
      });
  },
  'Unhandled': function() {
    this.emit('AMAZON.HelpIntent');
  }
};

export default NewSessionHandlers;
