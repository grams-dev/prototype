import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import {
    About,
    Chat,
    Groups,
    Home,
    Marketplace,
    Profile,
    Settings,
    Wallet
} from "../pages";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/about",
        element: <About />
    },
    {
        path: "/chat",
        element: <Chat />
    },
    {
        path: "/groups",
        element: <Groups />
    },
    {
        path: "/marketplace",
        element: <Marketplace />
    },
    {
        path: "/profile",
        element: <Profile />
    },
    {
        path: "/settings",
        element: <Settings />
    },
    {
        path: "/wallet",
        element: <Wallet />
    }
]);

export const Routes = () => {
    return (
        <RouterProvider router={router} />
    );
}
