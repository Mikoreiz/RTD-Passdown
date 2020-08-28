import React, { Component, Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addBus } from '../actions/repairLog'
import '../log.css'

class AddForm extends Component {
    const onChange = e => setFormData({...FormData, [e.target.name]: e.target.value})

    render() {
        return (
            <Fragment>
                <form method="POST" action="">
                    <div style={{marginTop: "1em"}}>
                        <label>Date: </label>&nbsp;
                        <input type='date' name='date'  placeholder='MM/DD/YY' onChange={onChange} required></input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <label>Type: </label>&nbsp;
                        <select type='text' name='type'  placeholder='' onChange={onChange} required>
                            <option></option>
                            <option>SMA</option>
                            <option>BRT</option>
                            <option>NON-REV</option>
                            <option>EXPRESS</option>
                        </select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <label>Bus Number: </label>&nbsp;
                        <input type='text' name='number'  placeholder='' onChange={onChange} required></input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <label>No Part: </label>&nbsp;
                        <select type='text' name='noPart'  placeholder='' onChange={onChange} required>
                            <option>true</option>
                            <option>false</option>
                        </select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <label>Description: </label>&nbsp;
                        <input type='text' name='description'  placeholder='' onChange={onChange} required></input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button type='submit'>+ Add A Bus</button>
                    </div>
                </form>
            </Fragment>
        )
    }
}

export default AddForm