import { canUseDOM } from './general';

const event = ({ category = '', action = '', fbCategory = '' }) => {
  if (canUseDOM) {
    if (window.GoogleAnalyticsObject) {
      const gobj = window[window.GoogleAnalyticsObject];
      gobj('send', 'event', category, action);
    }

    if (window.fbq) {
      window.fbq('trackCustom', fbCategory || `${category}_${action}`.replace(/ /ig, '_'));
    }

    if (process.env.PROJECT_ENV !== 'production') {
      console.log('Analytics:', 'event', category, action);
    }
  }
};

const trackPage = (page) => {
  if (canUseDOM && window.GoogleAnalyticsObject) {
    const gobj = window[window.GoogleAnalyticsObject];
    gobj('set', 'page', page);
    gobj('send', 'pageview');

    if (process.env.PROJECT_ENV !== 'production') {
      console.log('Analytics:', 'pageview', page);
    }
  }
};

export default {
  event,
  trackPage,
};
