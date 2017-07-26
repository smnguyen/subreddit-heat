export const INTENTS = {
  AMAZON: {
    CANCEL: 'AMAZON.CancelIntent',
    HELP: 'AMAZON.HelpIntent',
    NEXT: 'AMAZON.NextIntent',
    PREVIOUS: 'AMAZON.PreviousIntent',
    REPEAT: 'AMAZON.RepeatIntent',
    STOP: 'AMAZON.StopIntent',
    YES: 'AMAZON.YesIntent',
    NO: 'AMAZON.NoIntent'
  },
  HOT_POSTS: 'HotPostsIntent',
  POST_DETAILS: 'PostDetailsIntent',
  POST_TITLE: 'PostTitleIntent',
  UNHANDLED: 'Unhandled'
};

export const STATES = {
  POST_DETAIL: 'POST_DETAIL',
  HOT_POSTS: 'HOT_POSTS'
};
