import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addBus } from '../actions/repairLog'
import moment from 'moment'
import '../log.css'

const initialState = {
    date : Date(),
    type: '',
    number: 0,
    noPart: false,
    description: '',
}

const AddForm = ({ addBus }) => {   

    const [formData, setFormData] = useState(initialState)
    
    const { date, type, number, noPart, description } = formData

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault()
        addBus(formData)
    }


    return (
        <Fragment>
            <form className='addForm' onSubmit={onSubmit}>
                <div style={{marginTop: "1em"}}>
                    <label>Date: </label>&nbsp;
                    <input type='date' name='date' value={moment(date).format('yyyy-MM-DD')} placeholder='MM/DD/YY' onChange={onChange} required></input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <label>Type: </label>&nbsp;
                    <select type='text' name='type' value={type} placeholder='' onChange={onChange} required>
                        <option></option>
                        <option>SMA</option>
                        <option>BRT</option>
                        <option>NON-REV</option>
                        <option>EXPRESS</option>
                    </select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <label>Bus Number: </label>&nbsp;
                <input type='number' name='number' value={number} placeholder='' onChange={onChange} required></input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                        
                    <label>No Part: </label>&nbsp;
                    <select type='text' name='noPart' value={noPart} placeholder='' onChange={onChange} required>
                        <option>true</option>
                        <option>false</option>
                    </select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <label>Description: </label>&nbsp;
                    <input type='text' name='description' value={description} placeholder='' onChange={onChange} required></input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input onClick={() => window.location.reload(false)} type='submit' value='+ Add A Bus' />
                </div>
            </form>
        </Fragment>
    )
}

AddForm.propTypes = {
    addBus: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    repair : state.repair
})

export default connect(mapStateToProps, { addBus })(AddForm)