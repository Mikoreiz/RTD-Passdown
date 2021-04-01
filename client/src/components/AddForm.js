import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addBus } from '../actions/repairLog'
import moment from 'moment'
import '../log.css'

const initialState = {
    date : moment().format('YYYY-M-D H:m'),
    type: '',
    number: 0,
    noPart: false,
    description: '',
    status: '',
    rtsDate: moment().format('YYYY-M-D H:m')
}

const AddForm = ({ addBus }) => {   

    const [formData, setFormData] = useState(initialState)
    
    const { 
        date, 
        type, 
        number, 
        noPart, 
        description, 
        status,
        rtsDate 
    } = formData

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        addBus(formData)
    }

    return (
        <Fragment>
            <form className='addForm' onSubmit={onSubmit}>
                <label>Date: </label>
                <input type='date' name='date' value={moment(date).format('yyyy-MM-DD')} placeholder='MM/DD/YY' onChange={onChange} required></input>
                <label>Type: </label>
                <select type='text' name='type' value={type} placeholder='' onChange={onChange} required>
                    <option></option>
                    <option>SMA</option>
                    <option>BRT</option>
                    <option>NON-REV</option>
                    <option>EXPRESS</option>
                </select>
                <label>Bus #: </label>
                <input type='number' name='number' value={number} placeholder='' onChange={onChange} required></input>                   
                <label>No Part: </label>
                <select type='text' name='noPart' value={noPart} placeholder='' onChange={onChange} required>
                    <option>true</option>
                    <option>false</option>
                </select>
                <label>Reason: </label>
                <input type='text' name='description' value={description} placeholder='' onChange={onChange} required></input>
                <label>Status: </label>
                <input type='text' name='status' value={status} placeholder='' onChange={onChange} required></input>
                <label>RTS Date: </label>
                <input type='date' name='rtsDate' value={moment(rtsDate).format('yyyy-MM-DD')} placeholder='MM/DD/YY' onChange={onChange} required></input>
                <button type='submit'>+ Add A Bus</button>
            </form>
        </Fragment>
    )
}

AddForm.propTypes = {
    addBus: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    repair : state.repair,
})

export default connect(
    mapStateToProps,
    { addBus }
)(AddForm)