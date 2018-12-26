import { compose, nth, over, lensProp, pick, prop, last, dec, map, reverse } from 'ramda';
import { Subject } from 'rxjs/Subject';
import { getAccountTransactions } from '../api/scorum';

const INITIAL_HISTORY_OFFSET = -1;

export const TRANSACTION_OP_FIELD_NAME = 'op';
export const TRANSACTION_TIMESTAMP_FIELD_NAME = 'timestamp';
export const TRANSACTION_AMOUNT_FIELD_NAME = 'amount';
export const TRANSACTION_FROM_FIELD_NAME = 'from';
export const TRANSACTION_TO_FIELD_NAME = 'to';
export const TRANSACTION_MEMO_FIELD_NAME = 'memo';
export const TRANSACTION_TRX_ID_FIELD_NAME = 'trx_id';
export const TRANSACTION_BLOCK_FIELD_NAME = 'block';

/**
 * Get first transaction from a list and take index property decrementing it
 */
export const getNextOffset = compose(dec, prop('index'), last);

/**
 * @param {[]} transaction - user history transaction
 * @returns {{}} - reduced transaction
 */
export const reduceHistoryTransaction = compose(
  // op field constains transaction type (we don't need) and data object itself.
  over(lensProp(TRANSACTION_OP_FIELD_NAME), nth(1)),
  transaction => ({
    index: transaction[0],
    ...pick([ // spread whitelisted keys object
      TRANSACTION_TIMESTAMP_FIELD_NAME,
      TRANSACTION_BLOCK_FIELD_NAME,
      TRANSACTION_TRX_ID_FIELD_NAME,
      TRANSACTION_OP_FIELD_NAME,
    ], transaction[1]),
  }),
);

/**
 * @param {{}} conversionTransaction - reduced transaction
 * @returns {{}} - reduced conversion
 */
export const reduceConversion = compose(
  // Mapping op property leaving only amount
  over(lensProp(TRANSACTION_OP_FIELD_NAME), pick([TRANSACTION_AMOUNT_FIELD_NAME])),
  reduceHistoryTransaction,
);

/**
 * @param {{}} conversionTransaction - reduced transaction
 * @returns {{}} - reduced conversion
 */
export const reduceTransaction = compose(
  // Mapping op property leaving only amount
  over(
    lensProp(TRANSACTION_OP_FIELD_NAME),
    pick([
      TRANSACTION_AMOUNT_FIELD_NAME,
      TRANSACTION_FROM_FIELD_NAME,
      TRANSACTION_TO_FIELD_NAME,
      TRANSACTION_MEMO_FIELD_NAME,
    ]),
  ),
  reduceHistoryTransaction,
);

/**
 * @param {function} reducer - function to reduce entity items
 * @param {string} username - name of user to fetch history items for
 * @param {number} initialLimit - fetch conversions by portions, sliced with limit
 */
export const createTransactionsFetcher = (reducer, username, initialLimit) => {
  const transactionsSubject = new Subject();
  let offset = INITIAL_HISTORY_OFFSET;
  let limit = initialLimit;
  let isStopped = false;
  let inProgress = false;

  transactionsSubject.isInitial = () => offset === INITIAL_HISTORY_OFFSET;

  transactionsSubject.hasNext = () => !isStopped;

  transactionsSubject.fetchNext = function fetchNext() {
    if (isStopped || inProgress) {
      return null;
    }

    inProgress = true;
    return getAccountTransactions(username, offset, limit)
      .subscribe(compose(
        (fetched) => {
          this.next(fetched);

          offset = getNextOffset(fetched);
          if (limit > offset && offset >= 1) { // Blockchain doesn't allow limit bigger than offset
            limit = offset;
          }
          if (Number.isNaN(offset) || offset < 1) { // When we trap to negative - no more records left
            isStopped = true;
          }
          inProgress = false;
        },
        reverse,
        map(reducer)
      ));
  };

  transactionsSubject.resetAndFetchNext = function resetAndFetchNext() {
    offset = INITIAL_HISTORY_OFFSET;
    limit = initialLimit;
    isStopped = false;
    inProgress = false;
    this.fetchNext();
  };

  return transactionsSubject;
};
