import Root from 'src/routes/root.jsx'
import ErrorPage from 'src/routes/error/index.jsx'
import Home from 'src/routes/home/index.jsx';
import Test from 'src/routes/test/index.jsx'

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

const browserRouter = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "test",
                element: <Test />,
            },
        ]
    }
    
  ]);

const Router = ()=><RouterProvider router={browserRouter}/>

export default Router;