import Home from '../pages/Home';
import NotFound from '../pages/NotFound';

import {
  createBrowserRouter,
} from "react-router-dom";
import TestStripe from '../pages/TestStripe';
import Login from '../pages/login';

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
  },
  {
    path:"/login",
    element:<Login/>
  }
]);

export default router;