export function getSubreddit(request) {
  const slot = request.intent.slots.subreddit;
  if (slot && slot.value) {
    return slot.value;
  } else {
    return false;
  }
}
