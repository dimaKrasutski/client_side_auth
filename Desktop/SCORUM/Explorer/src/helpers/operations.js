import { compose, last, dec, head, reverse } from 'ramda';
import { Subject } from 'rxjs/Subject';
import { getTransfersHistory, getOpsHistory } from '../api/scorum';

const DEFAULT_PAGE_LIMIT = 20;
const DEFAULT_OFFSET = -1;

/**
 * Get first transaction from a list and take index property decrementing it
 */
export const getNextOffset = compose(dec, head, last);

export const createTransactionsFetcher = (offset, setOffset) => {
  const transactionsSubject = new Subject();
  let currentOffset = offset || DEFAULT_OFFSET;
  let isStopped = Number.isNaN(currentOffset) || currentOffset === 0;
  let inProgress = false;
  let limit = DEFAULT_PAGE_LIMIT > offset && offset > 0 ? offset : DEFAULT_PAGE_LIMIT;

  transactionsSubject.hasNext = () => !isStopped;

  transactionsSubject.fetchNext = function fetchNext() {
    if (isStopped || inProgress) {
      return null;
    }

    const getBlocks = getTransfersHistory(currentOffset, limit);
    inProgress = true;
    getBlocks.subscribe(compose(
      (fetched) => {
        this.next(fetched);
        currentOffset = getNextOffset(fetched);
        setOffset(currentOffset);
        if (limit > currentOffset && currentOffset >= 1) {
          limit = currentOffset;
        }
        if (Number.isNaN(currentOffset) || currentOffset <= 0) {
          isStopped = true;
        }
        inProgress = false;
      },
      reverse,
    ));

    return null;
  };

  return transactionsSubject;
};

export const createTransactionsAllFetcher = (offset, setOffset) => {
  const transactionsSubject = new Subject();
  let currentOffset = offset || DEFAULT_OFFSET;
  let isStopped = Number.isNaN(currentOffset) || currentOffset === 0;
  let inProgress = false;
  let limit = DEFAULT_PAGE_LIMIT;

  transactionsSubject.hasNext = () => !isStopped;

  transactionsSubject.fetchNext = function fetchNext() {
    if (isStopped || inProgress) {
      return null;
    }

    const getBlocks = getOpsHistory(currentOffset, limit);
    inProgress = true;
    getBlocks.subscribe(compose(
      (fetched) => {
        this.next(fetched);
        currentOffset = getNextOffset(fetched);
        setOffset(currentOffset);
        if (limit > currentOffset && currentOffset >= 1) {
          limit = currentOffset;
        }
        if (Number.isNaN(currentOffset) || currentOffset <= 0) {
          isStopped = true;
        }
        inProgress = false;
      },
      reverse,
    ));

    return null;
  };

  return transactionsSubject;
};
