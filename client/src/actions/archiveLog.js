import axios from 'axios'
import { GET_ARCHIVE, ARCHIVE_ERROR } from './types'

export const getArchiveLog = () => async dispatch => {
    try {
        const res = await axios.get('http://localhost:3001/bus/archive')
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