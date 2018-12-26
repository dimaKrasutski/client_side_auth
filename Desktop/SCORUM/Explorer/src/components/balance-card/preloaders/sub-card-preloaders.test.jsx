import { SubCardPreloader } from './sub-card-preloaders';

describe('<SubCardPreloader />', () => {
  test('should match snapshot', () => {
    const wrapper = shallow(<SubCardPreloader />);
    expect(wrapper).toMatchSnapshot();
  });
});
