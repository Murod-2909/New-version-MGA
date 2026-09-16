import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// react-router v6 doesn't pass a `match` prop to route elements (that was v5),
// so scrolling had to switch to useLocation() — this also makes it work
// correctly for param routes like /services/:slug, where the same component
// stays mounted across param changes instead of unmounting/remounting.
const ScrollTop = (Component) => {
    const Wrapped = (props) => {
        const location = useLocation();

        useEffect(() => {
            window.scrollTo({ left: 0, top: 0, behavior: "auto" });
        }, [location.pathname]);

        return <Component {...props} />;
    };

    return Wrapped;
};

export default ScrollTop;
