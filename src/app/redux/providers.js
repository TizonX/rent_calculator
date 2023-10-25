import { store } from "./store";

const { Provider } = require("react-redux");

export function Providers({Children})
{
    return <Provider store={store}>{Children}</Provider>
}