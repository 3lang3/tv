
const TOGGLE = 'emoji/TOGGLE';

export const emojiActions = {
  TOGGLE,
};

const emojiToggle = payload => ({
  type: TOGGLE
});

export {
  emojiToggle,
};
