import React from 'react'
import ReactDOM from 'react-dom/client'
import router from './lib/Browser_router'
import './static/css/index.css'
import {RouterProvider} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
