import { isSlotValid } from 'helpers';

const AmazonHandlers = {
  'AMAZON.CancelIntent': function() {
    this.emit(':tell', 'OK!');
  },
  'AMAZON.HelpIntent': function() {
    this.emit(
      ':ask',
      'I can tell you the hot posts for a subreddit you care about.',
      'Ask me, "What are the hot posts on /r/politics?"'
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
    const slots = request.intent.slots;
    const subreddit = isSlotValid(request, 'subreddit');

    console.log('HotPostsIntent', subreddit);
    this.emit(':tell', `You asked about ${subreddit} -- I'm looking now!`);
  },
  'Unhandled': function() {
    this.emit('AMAZON.HelpIntent');
  }
};

export default AmazonHandlers;
