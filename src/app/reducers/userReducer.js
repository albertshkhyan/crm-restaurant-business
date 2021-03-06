import { USER_ACTIONS } from "configs/types";
import createReducer from "helpers/createReducer";

const initialState = {
    data: {}//info of user
}

//this reducer also for  register 
const userReducer = createReducer(initialState, {//create reducer which initial state is firt argument
    [USER_ACTIONS.SET_USER_DATA](state, { payload }) {//this function will call inside createReducer, if match action type
        return {
            ...state,
            data: { ...payload }
        }
    }
});

//action creators
export const setUserData = (payload) => {
    return ({
        type: USER_ACTIONS.SET_USER_DATA,
        payload
    })
}

export default userReducer;