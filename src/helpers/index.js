export function isSlotValid(request, slotName) {
  const slot = request.intent.slots[slotName];
  if (slot && slot.value) {
    return slot.value.toLowerCase();
  } else {
    return false;
  }
}
