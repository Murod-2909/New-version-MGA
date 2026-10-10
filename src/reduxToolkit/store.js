import { configureStore } from "@reduxjs/toolkit";
import language from "./languageSlice";
import servicesSlider from "./servesSlice/servicesSlider";
import partnerSlice from "./partnerSlice/partnerSlice";
import  sendQuestion from "./messageSlice/messageSlice";
import projectsSlice from "./projectsSlice/projectsSlice";
const store = configureStore({
    reducer: {
        language,
        servicesSlider,
        partnerSlice,
        sendQuestion,

        projectsSlice,


    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})
export default  store;
