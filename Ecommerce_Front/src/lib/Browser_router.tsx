import Home from '../pages/Home';
import NotFound from '../pages/NotFound';

import {
  createBrowserRouter,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: '*',
    element: <NotFound />
  }
]);

export default router;