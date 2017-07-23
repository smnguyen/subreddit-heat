import { isSlotValid } from 'helpers';

const SkillHandlers = {
  'HotPostsIntent': function() {
    const request = this.event.request;
    const slots = request.intent.slots;
    const subreddit = isSlotValid(request, 'subreddit');

    console.log('HotPostsIntent', subreddit);
    this.emit(':tell', `You asked about ${subreddit} -- I'm looking now!`);
  }
};

export default SkillHandlers;
