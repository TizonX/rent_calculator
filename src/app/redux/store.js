const { configureStore } = require("@reduxjs/toolkit");
import {reducer} from "./slice"
export const store = configureStore({
    // reducername(key): reducer-function(value)
    // ex: reducer1: counterProgram
    reducer
    

})

