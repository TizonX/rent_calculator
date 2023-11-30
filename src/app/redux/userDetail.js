const { createSlice, nanoid } = require("@reduxjs/toolkit");

const initialState = {
    userData: {}
}

const UserInfo = createSlice({
    name: "userDetails",
    initialState,
    reducers: {
        // right function, it is also an action
        // ex: addUser, removeUser, findUser etc.
        addUserDetails: (state, action) => {
            state.userData = action.payload
        }
    }
})

export const { addUserDetails } = UserInfo.actions;
export default UserInfo.reducer