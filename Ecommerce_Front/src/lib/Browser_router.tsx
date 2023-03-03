import Home from '../pages/Home';
import NotFound from '../pages/NotFound';

import {
  createBrowserRouter,
} from "react-router-dom";
import TestStripe from '../pages/TestStripe';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: '*',
    element: <NotFound />
  },
  {
    path: '/stripe',
    element: <TestStripe />
  }
]);

export default router;