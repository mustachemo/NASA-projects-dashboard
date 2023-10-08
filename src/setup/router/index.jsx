import Root from 'src/routes/root.jsx';
import ErrorPage from 'src/routes/error';
import Home from 'src/routes/home';
import Test from 'src/routes/test';
import Search from 'src/routes/search'
import Profile from 'src/routes/profile';
import Create from 'src/routes/create';
import Chats from 'src/routes/chats';
import Chat from 'src/routes/chats/chat';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';


const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'test',
        element: <Test />,
      },
      {
        path: 'create',
        element: <Create />,
      },
      {
        path: 'chats',
        element: <Chats />,
        children: [
          {
            path: '/chats/:chatid',
            element: <Chat />,
          },
        ]
      },
      {
        path: 'search',
        element: <Search />,
      },
      {
        path: 'profile/:userid',
        element: <Profile />,
      },
    ],
  },
]);

const Router = () => <RouterProvider router={browserRouter} />;

export default Router;
