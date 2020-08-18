import axios from 'axios'
import { GET_BUSES, BUSES_ERROR } from './types'

export const getRepairLog = () => async dispatch => {
    try {
        const res = await axios.get('http://localhost:3001/bus')
        dispatch({
            type: GET_BUSES,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: BUSES_ERROR,
            payload: { msg: 'Error' }
        })
    }
}
