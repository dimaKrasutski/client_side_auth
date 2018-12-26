import configureStore from 'redux-mock-store';
import { ChangeRoute } from './change-route';
import { DEFAULT_LOCALE } from '../../constants';

const mockStore = configureStore({});
const store = mockStore({
  intl: {
    localeFull: DEFAULT_LOCALE,
  },
});

describe('<RouteLink />', () => {
  test('should use state + locale', () => {
    const wrapper = shallow(<ChangeRoute to="/test" store={store}>Link here!</ChangeRoute>).dive();
    expect(wrapper).toMatchSnapshot();
  });

  describe('when static to is called', () => {
    test('should create component and render', () => {
      const Component = ChangeRoute.to('/another/');
      const wrapper = shallow(<Component store={store} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
