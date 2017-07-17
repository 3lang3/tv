
const OPEN = 'layouts/OPEN';
const WIDTH = 'layouts/WIDTH';
const CHAT = 'layouts/CHAT';

export const layoutsActions = {
  OPEN,
  WIDTH,
  CHAT,
};

const layoutsOpen = payload => ({
  type: OPEN,
  payload,
});

const layoutsWidth = payload => ({
  type: WIDTH,
  payload,
});

const layoutsChat = payload => ({
  type: CHAT,
  payload,
});


export {
  layoutsOpen,
  layoutsWidth,
  layoutsChat,
};
