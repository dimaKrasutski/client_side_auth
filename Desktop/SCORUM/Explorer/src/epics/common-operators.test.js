import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators/map';
import { catchGlobalErrorWith } from './common-operators';
import { globalError } from '../actions/system';

const errorMessage = 'Super error';

jest.mock('../actions/system');
const throwOperator = map(() => {
  throw new Error(errorMessage);
});

describe('Common epic operators', () => {
  describe('#catchGlobalErrorWith', () => {
    test('should call globalError action with message', async () => {
      const what = 'what?';
      of('nevermind').pipe(throwOperator, catchGlobalErrorWith(what)).subscribe(() => {
        expect(globalError).toHaveBeenCalledWith(what, new Error(errorMessage), undefined);
      });
      expect.assertions(1);
    });
  });
});
