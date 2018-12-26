import { Transactions } from './pages/transactions/transactions';
import { Blocks } from './pages/blocks/blocks';
import { BlockInfo } from './pages/block-info/block-info';
import { Delegates } from './pages/delegates/delegates';
import { Dashboard } from './pages/dashboard/dashboard';
import { UserInfo } from './pages/account-info/account-info';
import { Page404 } from './pages/404/404';
import AppRoot from './app-root';
import withTracker from './hocs/with-tracker';

const langPrefix = path => `/:lang(en-us|ru-ru|zh-cn|ko-ko)?/${path}`;

const routes = [
  {
    component: AppRoot,
    routes: [
      {
        path: langPrefix('blocks'),
        exact: true,
        component: withTracker(Blocks),
      },
      {
        path: langPrefix('transactions'),
        exact: true,
        component: withTracker(Transactions),
      },
      {
        path: langPrefix('delegates'),
        exact: true,
        component: withTracker(Delegates),
      },
      {
        path: langPrefix('block-info/:block'),
        exact: true,
        component: withTracker(BlockInfo),
      },
      {
        path: langPrefix('account-info/:username'),
        exact: true,
        component: withTracker(UserInfo),
      },
      {
        path: langPrefix('404'),
        exact: true,
        component: withTracker(Page404),
      },
      {
        path: langPrefix(''),
        exact: true,
        component: withTracker(Dashboard),
      },
      {
        path: langPrefix('*'),
        exact: true,
        component: withTracker(Page404),
      },
    ],
  },
];

export default routes;
