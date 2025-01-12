import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Navbar from './Navbar';
import Home from './Home';
import Paste from './Paste';
import ViewPaste from './ViewPaste';

function App() {

  const router = createBrowserRouter(
    [

      {
        path:"/",
        element:
        <div>
          <Navbar />
          <Home />
        </div>
      },

      {
        path:"/pastes",
        element:
        <div>
          <Navbar />
          <Paste />
        </div>
      },

      {
        path:"/pastes/:id",
        element:
        <div>
          <Navbar />
          <ViewPaste />
        </div>
      }

    ]
  );

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
