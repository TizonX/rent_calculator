const { configureStore } = require("@reduxjs/toolkit");
import UserDetail from "./userDetail"
export const store = configureStore({
    reducer: {
        UserDetail
    }
})

