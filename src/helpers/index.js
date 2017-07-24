import fetch from 'node-fetch';

export function fetchPosts(subreddit, sort = 'hot', limit = 1) {
  return fetch(`https://www.reddit.com/r/${subreddit}/${sort}.json?limit=${limit}&raw_json=1`)
    .then(response => response.json())
    .then(json => json.data.children);
}

export function getSubreddit(request) {
  const slot = request.intent.slots.subreddit;
  if (slot && slot.value) {
    return { subreddit: queryToSubreddit(slot.value), query: slot.value };
  } else {
    return {};
  }
}

// Convert a query to a valid subreddit name. The generated name may or may not
// be an actual subreddit.
//
// Valid subreddit names are:
//  * Composed only of alphanumeric characters and underscores
//  * No leading underscores
//  * 2 to 21 characters long
//
// Source: https://github.com/reddit/reddit/blob/master/r2/r2/models/subreddit.py
//   See the subreddit regexes and `Subreddit.is_valid_name`.
export function queryToSubreddit(query) {
  return query.replace(/\W/g, '');
}
