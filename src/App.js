import {
    createBrowserRouter,
    Link,
    RouterProvider,
} from "react-router-dom";
import './App.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import {HomePage} from "./pages/homePage";
import {Info} from "./pages/info";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <div>
                <HomePage/>
                <Link to="info">Tabs</Link>
            </div>
        ),
    },
    {
        path: "/info",
        element: <Info />,
    },
]);

function App() {
    return <RouterProvider router={router}/>
}

export default App;
