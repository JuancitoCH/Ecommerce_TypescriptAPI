import Home from '../pages/Home';
import NotFound from '../pages/NotFound';

import {
  createBrowserRouter,
} from "react-router-dom";
import TestStripe from '../pages/TestStripe';
import TestStripeCart from '../pages/TestStripeCart';
import Login from '../pages/Login';

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
    path: '/stripe/cart',
    element: <TestStripeCart />
  },
  {
    path:"/login",
    element:<Login/>
  }
]);

export default router;