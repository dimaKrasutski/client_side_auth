import { combineReducers } from 'redux';
import intl from './intl/intl';
import { system } from './system/system';
import blocks from './blocks/blocks';
import delegates from './delegates/delegates';
import dashboard from './dashboard/dashboard';
import { modals } from './modals/modals';
import transactions from './transactions/transactions';
import blockInfo from './block-info/block-info';
import accountInfo from './account-info/account-info';

export default combineReducers({
  intl,
  system,
  blocks,
  blockInfo,
  modals,
  delegates,
  accountInfo,
  transactions,
  dashboard,
});
