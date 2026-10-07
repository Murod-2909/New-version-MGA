import React, {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import Routes from './routes';
import {Provider} from "react-redux";

// Self-hosted fonts (Latin, Latin-Ext and Cyrillic subsets load only when a page needs them).
import "@fontsource-variable/rubik/wght.css";
import "@fontsource-variable/montserrat/wght.css";
import "./assests/style/global.scss";
import "./assests/style/header.scss"
import "./assests/style/footer.scss"
import store from "./reduxToolkit/store";
import {I18nextProvider} from "react-i18next";
import i18n from "./serves/in18";
import GrayContextProvider from "./context/GrayContext";
import "aos/dist/aos.css";
import AOS from "aos";
AOS.init();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <I18nextProvider i18n={i18n}>
        <GrayContextProvider>
            <Suspense fallback="">
                <Provider store={store}>
                    <Routes/>
                </Provider>
            </Suspense>
        </GrayContextProvider>
    </I18nextProvider>
);


