import Home from '../pages/Home';
import NotFound from '../pages/NotFound';

import {
  Outlet,
  createBrowserRouter,
} from "react-router-dom";
import TestStripe from '../pages/TestStripe';
import TestStripeCart from '../pages/TestStripeCart';
import Login from '../pages/Login';
import NavMenu from '../components/NavMenu';

const AppLayout=()=>(
  <>
    <NavMenu/>
    <Outlet/>
  </>
)

const router = createBrowserRouter([
  {
    element:<AppLayout/>,
    children:[
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
    ]
  }
  
]);

export default router;