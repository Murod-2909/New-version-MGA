import React, {lazy, Suspense} from "react";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import ScrollTop from "./hoc/ScrollTop";
import Layout from "./components/Layout/Layout";
import PageLoading from "./components/PageLoading";
import RouteSeo from "./components/Seo/RouteSeo";
import {LANGS, withLang} from "./serves/locale";

const Home = lazy(() => import("./pages/Home/home"));
const About = lazy(() => import("./pages/About/about"));
const catalogBook = lazy(() => import("./pages/CatalogBook"));
const Serves = lazy(() => import("./pages/Serves"));
const Contact = lazy(() => import("./pages/Contact/contact"));
const ServicePage = lazy(() => import("./pages/ServicePage"));
const ProjectsList = lazy(() => import("./pages/Projects/ProjectsList"));
const ProjectDetail = lazy(() => import("./pages/Projects/ProjectDetail"));
const ProductionDetail = lazy(() => import("./pages/ProductionDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));


const routes = [
    {path: "/", element: Home},
    {path: "/catalogBook", element: catalogBook},

    {path: "/about", element: About},
    {path: "/serves", element: Serves},
    {path: "/services/:slug", element: ServicePage},
    {path: "/production/:slug", element: ProductionDetail},
    {path: "/projects", element: ProjectsList},
    {path: "/projects/:slug", element: ProjectDetail},
    {path: "/contact", element: Contact},
    {path: "*", element: NotFound},

];
const RoutesContainer = () => (
    <Router>
        <RouteSeo/>
        <Layout>
            <Suspense fallback={<PageLoading/>}>

                <Routes>
                    {routes.map((route, key) => {
                        const RouteComponent = ScrollTop(route.element);
                        // "*" is the 404 fallback and has no language variants.
                        const paths = route.path === "*" ? ["*"] : LANGS.map((lang) => withLang(route.path, lang));
                        return paths.map((path) => (
                            <Route key={`${key}-${path}`} path={path} element={<RouteComponent/>}/>
                        ));
                    })}
                    {/* The gallery page was retired: its photos live on the projects pages. */}
                    {LANGS.map((lang) => (
                        <Route
                            key={`gallery-${lang}`}
                            path={withLang("/gallery", lang)}
                            element={<Navigate to={withLang("/projects", lang)} replace/>}
                        />
                    ))}
                </Routes>
            </Suspense>
        </Layout>
    </Router>
);

export default RoutesContainer;
