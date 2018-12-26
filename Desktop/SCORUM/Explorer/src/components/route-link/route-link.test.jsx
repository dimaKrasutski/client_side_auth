
import configureStore from 'redux-mock-store';
import { RouteLink } from './route-link';
import { DEFAULT_LOCALE } from '../../constants';

const mockStore = configureStore({});
const store = mockStore({
  intl: {
    localeFull: DEFAULT_LOCALE,
  },
});

describe('<RouteLink />', () => {
  test('should use state + locale', () => {
    const wrapper = shallow(<RouteLink to="/test" store={store}>Link here!</RouteLink>).dive();
    expect(wrapper).toMatchSnapshot();
  });
});
