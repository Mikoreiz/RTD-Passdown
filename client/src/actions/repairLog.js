import axios from 'axios'
import { GET_BUSES, BUSES_ERROR, UPDATE_ERROR, DELETE_ERROR, GET_BUS, GET_BUS_ERROR, UPDATE_BUS } from './types'

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

// Get bus by id
export const getBusById = busId => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:3001/bus/${busId}`)
        dispatch({
            type: GET_BUS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_BUS_ERROR,
            payload: { msg: 'Error' }
        })
    }
}

// Add bus
export const addBus = formData => async dispatch => {
    try {
        await axios.post('http://localhost:3001/bus/add', formData)

    } catch (err) {
        dispatch({
            type: BUSES_ERROR,
            payload: { msg: 'Error' }
        })
    }
}

export const updateBus = (busId, newData) => async dispatch => {
    try {
        await axios.put(`http://localhost:3001/bus/update/${busId}`, newData)
        dispatch({
            type: UPDATE_BUS
        })
    } catch (err) {
        dispatch({
            type: UPDATE_ERROR,
            payload: { msg: 'Error' }
        })
    }
}

export const deleteBus = busId => async dispatch => {
    try {
        await axios.delete(`http://localhost:3001/bus/delete/${busId}`)
    } catch (err) {
        dispatch({
            type: DELETE_ERROR,
            payload: { msg: 'Error' }
        })
    }
}