import fetch from 'node-fetch';

export function fetchPosts(subreddit, sort = 'hot', limit = 5) {
  const subredditPath = subreddit ? `/r/${subreddit}` : '';
  return fetch(`https://www.reddit.com${subredditPath}/${sort}.json?limit=${limit}`)
    .then(response => response.json())
    .then(json => json.data.children);
}

export function getSubreddit(request) {
  const slot = request.intent.slots.subreddit;
  if (slot && slot.value) {
    const subreddit = queryToSubreddit(slot.value);
    console.log('Query: ', slot.value, 'Subreddit: ', subreddit);

    // Search on the front page if the user said 'reddit'.
    if (subreddit !== 'reddit') {
      return { subreddit, query: slot.value };
    }
  }

  return {};
}

export function getCurrentPost({ posts, rank }) {
  return posts[rank - 1].data;
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
  return `${query.toLowerCase().replace(/\W/g, '')}`;
}

export function rankToOrdinal(rank) {
  switch (rank) {
    case 1: return '';
    case 2: return '2nd';
    case 3: return '3rd';
    default: return `${rank}th`;
  }
}
