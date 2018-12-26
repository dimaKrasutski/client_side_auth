import api from '@scorum/scorum-js/lib/api';
import config from '@scorum/scorum-js/lib/config';

let initialized = false;

export const initializeConfig = () => {
  api.setOptions({ url: process.env.RPC_URL });
  config.set('address_prefix', 'SCR');
  config.set('chain_id', process.env.CHAIN_ID);
  initialized = true;
};

export const isInitialized = () => initialized;
