import fetch from 'node-fetch';

import { isSlotValid } from 'helpers';

const SkillHandlers = {
  'HotPostsIntent': function() {
    const request = this.event.request;
    const slots = request.intent.slots;
    const subreddit = isSlotValid(request, 'subreddit');

    fetch(`https://www.reddit.com/r/${subreddit}.json?limit=1`)
      .then(response => response.json())
      .then(json => json.data.children)
      .then(posts => posts.filter(post => !post.data.stickied))
      .then(posts => this.emit(
        ':tell',
        `The hottest post on r ${subreddit} is: "${posts[0].data.title}".`
      ));
  }
};

export default SkillHandlers;
