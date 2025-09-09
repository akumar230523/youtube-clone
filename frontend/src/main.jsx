import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'

import App from './App.jsx';
import Home from './pages/Home.jsx';
import Profile from './pages/Profile.jsx';
import Channel from './pages/Channel.jsx';
import VideoPlayer from './pages/VideoPlayer.jsx';
import SignIn from './features/SignIn.jsx';
import SignUp from './features/SignUp.jsx';
import CreateChannel from './features/CreateChannel.jsx';
import EditChannel from './features/EditChannel.jsx';
import UploadVideo from './features/UploadVideo.jsx';
import UpdateVideo from './features/UpdateVideo.jsx';
import NotFound from './pages/NotFound.jsx';


const approuter = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '/', element: <Home /> },
            { path: 'signin', element: <SignIn /> },
            { path: 'signup', element: <SignUp /> },
            { path: 'profile', element: <Profile /> },
            { path: 'channel/:channelId', element: <Channel /> },
            { path: 'video/:videoId', element: <VideoPlayer /> },
            { path: 'create-channel', element: <CreateChannel /> },
            { path: 'update-channel/:channelId', element: <EditChannel /> },
            { path: 'upload-video', element: <UploadVideo /> },
            { path: 'update-video/:videoId', element: <UpdateVideo /> },
        ],
        errorElement: <NotFound />,
    },
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={approuter} />
    </StrictMode>,
)