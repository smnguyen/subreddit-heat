import fetch from 'node-fetch';

export function fetchPosts(subreddit, sort = 'hot', limit = 1) {
  return fetch(`https://www.reddit.com/r/${subreddit}/${sort}.json?limit=${limit}`)
    .then(response => response.json())
    .then(json => json.data.children);
}

export function getSubreddit(request) {
  const slot = request.intent.slots.subreddit;
  if (slot && slot.value) {
    return slot.value;
  } else {
    return false;
  }
}
