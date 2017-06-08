const CHANGE = 'BANNER/CHANGE';
const INIT = 'BANNER/INIT';

export const bannerActions = {
    CHANGE: CHANGE,
    INIT: INIT
}

const initBanner = (payload) => ({
  type: INIT,
  payload
});

const changeBanner = (payload) => ({
  type: CHANGE,
  payload
});

export {
    changeBanner,
    initBanner,
}
