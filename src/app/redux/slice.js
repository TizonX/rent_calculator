const { createSlice, nanoid } = require("@reduxjs/toolkit");

const initialState = {
    // statename: type
    //ex: users: []
    users: []
}

const Slice = createSlice({
    name:"addUsersSlice",
    initialState,
    reducers:{
        // right function, it is also an action
        // ex: addUser, removeUser, findUser etc.
        addUser: (state, action)=>
        {
            const data = {
                id: nanoid(),
                name: action.payload,
            }
            state.users.push(data);
        }
    }
})

export const {addUser} = Slice.actions;
export default Slice.reducer;