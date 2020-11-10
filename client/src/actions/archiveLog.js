import axios from 'axios'
import { GET_ARCHIVE, ARCHIVE_ERROR } from './types'

export const getArchiveLog = () => async dispatch => {
    try {
        const res = await axios.get('http://localhost:3001/archive')
        dispatch({
            type: GET_ARCHIVE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: ARCHIVE_ERROR,
            payload: { msg: 'Error' }
        })
    }
}

export const getArchiveLogFiltered = (number=null, type=null, from=null, to=null) => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:3001/archive/filter?number=${number}&type=${type}&from=${from}&to=${to}`)
        dispatch({
            type: GET_ARCHIVE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: ARCHIVE_ERROR,
            payload: { msg: 'Error' }
        })
    }
}