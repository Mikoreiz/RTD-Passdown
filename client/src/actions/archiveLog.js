import axios from 'axios'
import { GET_ARCHIVE, ARCHIVE_ERROR } from './types'
import moment from 'moment'

export const getArchiveLog = (number=0, type='', from=moment('2020/01/01').format('YYYY-M-D H:m'), to=moment().format('YYYY-M-D H:m')) => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:3001/archive?number=${number}&type=${type}&from=${from}&to=${to}`)
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
