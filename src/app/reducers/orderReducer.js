import { ORDER_ACTIONS } from "configs/types";
import createReducer from "helpers/createReducer";

const initialState = {
    // date: null,
    // order: null,//id order
    // userId: null,
    list: [],//{name, quantity, cost},
    totalPrice: 0,
    isOpendSnackbar: false,
    orderMessage: "",
    isOpenEnqueSnackBar: false,
}

/**   
 * ADD_ORDER 
 * REMOVE_ORDER
 * CLEAR_ORDER
 */

const orderReducer = createReducer(initialState, {
    [ORDER_ACTIONS.ADD_ORDER](state, { payload, quantity }) {
        const candiate = state.list.find(position => position._id === payload._id);
        if (candiate) {
            const copyCandidate = { ...candiate }
            copyCandidate.quantity += quantity;
            return {
                ...state,
                list: state.list.map(item => item._id === payload._id ?
                    { ...item, ...copyCandidate } : item),
                isOpenEnqueSnackBar: true

            }
        }
        else {
            const copyPayload = { ...payload };
            copyPayload.quantity = quantity;
            return {
                ...state,
                list: [...state.list, copyPayload],
                isOpenEnqueSnackBar: true

            }
        }
    },
    [ORDER_ACTIONS.REMOVE_ORDER](state, { payload }) {
        if (payload.quantity > 1) {
            return {
                ...state,
                list: state.list.map(item => item._id === payload._id ?
                    { ...item, quantity: item.quantity - 1 } : item),
                isOpenEnqueSnackBar: false

            }
        } else {
            return {
                ...state,
                list: [
                    ...state.list.filter((item) => item._id !== payload._id)
                ],
                isOpenEnqueSnackBar: false

            }
        }
    },
    [ORDER_ACTIONS.SET_ORDER_TOTAL_PRICE](state) {
        return {
            ...state,
            totalPrice: state.list.reduce((sum, item) => sum + (item.cost * item.quantity), 0)
        }
    },
    [ORDER_ACTIONS.CLEAR_ORDER](state) {
        return {
            ...state,
            list: [],
            totalPrice: 0
        }
    },

});

export const addOrder = (payload, quantity) => ({ type: ORDER_ACTIONS.ADD_ORDER, payload, quantity });
export const removeOrder = (payload) => ({ type: ORDER_ACTIONS.REMOVE_ORDER, payload });
export const setOrderTotalPrice = () => ({ type: ORDER_ACTIONS.SET_ORDER_TOTAL_PRICE });
export const clearOrder = () => ({ type: ORDER_ACTIONS.CLEAR_ORDER });
// export const openEnqueSnackBar = () => ({ type: ORDER_ACTIONS.OPEN_ENQUE_SNACK_BAR });

export default orderReducer;