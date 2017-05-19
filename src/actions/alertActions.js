const OPEN = 'ALERT/OPEN';

export const alertActions = {
    OPEN: OPEN
}

const alertOpen = (payload) => ({
  type: OPEN,
  payload
});

export {
    alertOpen
}
