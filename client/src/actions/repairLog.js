import axios from 'axios'
import { GET_BUSES, BUSES_ERROR, ADD_BUS, ADD_BUS_ERROR } from './types'

// Get repair log
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

// Add bus
export const addBus = formData => async dispatch => {
    try {
        const res = await axios.post('http:localhost:3001/bus/add', formData)
        dispatch({
            type: ADD_BUS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: ADD_BUS_ERROR,
            payload: { msg: 'Error' }
        })
    }
}