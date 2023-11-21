const { configureStore } = require("@reduxjs/toolkit");
import user from "./slice";
import propertyDetails from "./propertyData";
export const store = configureStore({
    reducer:
    {
        user,
        propertyDetails
    },
})

