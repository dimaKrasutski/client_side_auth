import { compose, last, dec, head, reverse } from 'ramda';
import { Subject } from 'rxjs/Subject';
import { getBlocksHistory } from '../api/scorum';

/**
 * Get first transaction from a list and take index property decrementing it
 */
export const getNextOffset = compose(dec, head, last);

/**
 * @param {function} reducer - function to reduce entity items
 * @param {number} blockNumber - block number
 * @param {function} setCurrentBlock - set current block
 */
export const createBlocksFetcher = (reducer, blockNumber, setCurrentBlock) => {
  const transactionsSubject = new Subject();
  let blockNum = blockNumber;
  let isStopped = false;
  let inProgress = false;

  transactionsSubject.hasNext = () => !isStopped;

  transactionsSubject.fetchNext = function fetchNext() {
    if (isStopped || inProgress) {
      return null;
    }

    const getBlocks = getBlocksHistory(blockNum);
    inProgress = true;
    getBlocks.subscribe(compose(
      (fetched) => {
        this.next(fetched);
        blockNum = getNextOffset(fetched);
        setCurrentBlock(blockNum);
        if (Number.isNaN(blockNum) || blockNum < 0) { // When we trap to negative - no more records left
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
