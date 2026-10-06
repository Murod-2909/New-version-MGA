import React, {lazy, Suspense, useEffect} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ScrollTop from "./hoc/ScrollTop";
import Layout from "./components/Layout/Layout";
import Spinner from "./components/Spinner";
import RouteSeo from "./components/Seo/RouteSeo";
import {LANGS, withLang} from "./serves/locale";

const Home = lazy(() => import("./pages/Home/home"));
const About = lazy(() => import("./pages/About/about"));
const catalogBook = lazy(() => import("./pages/CatalogBook"));
const Serves = lazy(() => import("./pages/Serves"));
const Gallery = lazy(() => import("./pages/Gallery/gallery"));
const Contact = lazy(() => import("./pages/Contact/contact"));
const ServicePage = lazy(() => import("./pages/ServicePage"));
const ProjectsList = lazy(() => import("./pages/Projects/ProjectsList"));
const ProjectDetail = lazy(() => import("./pages/Projects/ProjectDetail"));
const ProductionDetail = lazy(() => import("./pages/ProductionDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));


// On a pre-rendered page the browser shows the static HTML before React has loaded.
// Keep that markup as the Suspense fallback for the first page, so the content
// doesn't disappear and re-appear (a big layout shift) while the lazy chunk loads.
let prerenderedMain =
    typeof document !== "undefined" ? document.getElementById("main")?.innerHTML || "" : "";

const PageFallback = () => {
    useEffect(() => () => {
        prerenderedMain = "";
    }, []);
    return (
        <>
            {prerenderedMain && <div dangerouslySetInnerHTML={{__html: prerenderedMain}}/>}
            <Spinner position="full"/>
        </>
    );
};

const routes = [
    {path: "/", element: Home},
    {path: "/catalogBook", element: catalogBook},

    {path: "/about", element: About},
    {path: "/serves", element: Serves},
    {path: "/services/:slug", element: ServicePage},
    {path: "/production/:slug", element: ProductionDetail},
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
            <Suspense fallback={<PageFallback/>}>

                <Routes>
                    {routes.map((route, key) => {
                        const RouteComponent = ScrollTop(route.element);
                        // "*" is the 404 fallback and has no language variants.
                        const paths = route.path === "*" ? ["*"] : LANGS.map((lang) => withLang(route.path, lang));
                        return paths.map((path) => (
                            <Route key={`${key}-${path}`} path={path} element={<RouteComponent/>}/>
                        ));
                    })}
                </Routes>
            </Suspense>
        </Layout>
    </Router>
);

export default RoutesContainer;
