const { createSlice } = require("@reduxjs/toolkit");
const initialState = {
    property: []
}


const Property = createSlice({
    name: "propertyDetails",
    initialState,
    reducers: {
        addProperty: (state, action) => {
            state.property = action.payload;
        }
    }
})

export const { addProperty } = Property.actions;
export default Property.reducer