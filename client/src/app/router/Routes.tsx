import { createBrowserRouter } from "react-router";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import GigDashboard from "../../features/gigs/Dashboard/GigDashboard";
import GigForm from "../../features/gigs/form/GigForm";
import GigDetails from "../../features/gigs/details/GigDetails";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children:[
            { path: '', element:<HomePage/> },
            { path: 'gigs', element:<GigDashboard/> },
            { path: 'createGig', element:<GigForm key='create'/> },
            { path: 'manage/:id', element:<GigForm key='edit'/> },
            { path: 'gigs/:id', element:<GigDetails/> },
        ]
    }
])