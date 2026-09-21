import React, {lazy, Suspense} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ScrollTop from "./hoc/ScrollTop";
import Layout from "./components/Layout/Layout";
import Spinner from "./components/Spinner";
import RouteSeo from "./components/Seo/RouteSeo";

const Home = lazy(() => import("./pages/Home/home"));
const About = lazy(() => import("./pages/About/about"));
const catalogBook = lazy(() => import("./pages/CatalogBook"));
const Serves = lazy(() => import("./pages/Serves"));
const Gallery = lazy(() => import("./pages/Gallery/gallery"));
const Contact = lazy(() => import("./pages/Contact/contact"));
const ServicePage = lazy(() => import("./pages/ServicePage"));
const ProjectsList = lazy(() => import("./pages/Projects/ProjectsList"));
const ProjectDetail = lazy(() => import("./pages/Projects/ProjectDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));


const routes = [
    {path: "/", element: Home},
    {path: "/catalogBook", element: catalogBook},

    {path: "/about", element: About},
    {path: "/serves", element: Serves},
    {path: "/services/:slug", element: ServicePage},
    {path: "/gallery", element: Gallery},
    {path: "/projects", element: ProjectsList},
    {path: "/projects/:slug", element: ProjectDetail},
    {path: "/contact", element: Contact},
    {path: "*", element: NotFound},

];
const RoutesContainer = () => (
    <Router>
        <RouteSeo/>
        <Layout>
            <Suspense fallback={<Spinner position="full"/>}>

                <Routes>
                    {routes.map((route, key) => {
                        const RouteComponent = ScrollTop(route.element);
                        return (
                            <Route key={key} path={route.path} element={<RouteComponent/>}/>
                        );
                    })}
                </Routes>
            </Suspense>
        </Layout>
    </Router>
);

export default RoutesContainer;
