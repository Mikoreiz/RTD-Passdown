import { GET_BUSES, BUSES_ERROR, ADD_BUS, ADD_BUS_ERROR } from '../actions/types'

const initialState = {
    repair: [],
    repos: [],
    loading: true,
    erorr: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case GET_BUSES:
            return {
                ...state,
                repair: payload,
                loading: false
            }
        case ADD_BUS:
            return {
                ...state,
                add: payload,
                loading: false
            }
        case BUSES_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case ADD_BUS_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state
    }
}