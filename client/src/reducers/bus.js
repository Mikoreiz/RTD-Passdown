import { GET_BUSES, 
    BUSES_ERROR, 
    GET_BUS, 
    GET_BUS_ERROR, 
    UPDATE_BUS,
    UPDATE_ERROR
} from '../actions/types'

const initialState = {
    buses: [],
    bus: null,
    loading: true,
    submitted: false,
    erorr: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case GET_BUSES:
            return {
                ...state,
                buses: payload,
                loading: false,
                submitted: false
            }
        case GET_BUS:
            return {
                ...state,
                bus: payload,
                loading: false,
            }
        case BUSES_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case GET_BUS_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case UPDATE_BUS:
            return {
                ...state,
                submitted: true,
                loading: false
            }
        case UPDATE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state
    }
}