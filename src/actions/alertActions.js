const OPEN = 'ALERT/OPEN';

export const alertActions = {
  OPEN,
};

const alertOpen = payload => ({
  type: OPEN,
  payload,
});

export {
    alertOpen,
};
