import { ofType } from 'redux-observable';
import { mergeMap } from 'rxjs/operators/mergeMap';
import { map } from 'rxjs/operators/map';
import { compose, pick, zip, lensProp, over, prop } from 'ramda';
import { preloadBlock, setBlock } from '../../actions/block-info';
import { getBlock } from '../../api/scorum';
import { catchGlobalErrorWith } from '../common-operators';
import { UNDEFINED_ERROR_ID } from '../../constants';
import { redirectTo404 } from '../../actions/system';

export const TRANSACTION_TIMESTAMP_FIELD_NAME = 'timestamp';
export const TRANSACTION_BLOCK_ID_FIELD_NAME = 'block_id';
export const TRANSACTIONS_FIELD_NAME = 'transactions';
export const TRANSACTION_IDS_FIELD_NAME = 'transaction_ids';

const reduceBlock = compose(
  pick([
    TRANSACTION_BLOCK_ID_FIELD_NAME,
    TRANSACTION_TIMESTAMP_FIELD_NAME,
    TRANSACTIONS_FIELD_NAME,
  ]),
  block => (
    over(lensProp(TRANSACTIONS_FIELD_NAME), zip(prop(TRANSACTION_IDS_FIELD_NAME, block)), block)
  )
);

export const preloadBlockEpic = action$ => action$.pipe(
  ofType(preloadBlock),
  mergeMap(({ payload: blockNumber }) => getBlock(blockNumber)),
  map((response) => {
    if (!response) return redirectTo404();
    return compose(setBlock, reduceBlock)(response);
  }),
  catchGlobalErrorWith(UNDEFINED_ERROR_ID),
);
