import { GET_ARCHIVE, ARCHIVE_ERROR } from '../actions/types'

const initialState = {
    archive: [],
    repos: [],
    loading: true,
    erorr: {}
}

export default function(state = initialState, action) {
    const {type, payload} = action

    switch (type) {
        case GET_ARCHIVE:
            return {
                ...state,
                archive: payload,
                loading: false
            }
        case ARCHIVE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state
    }
}