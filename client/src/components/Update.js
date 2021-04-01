import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { getBusById, updateBus, deleteBus } from '../actions/repairLog'
import moment from 'moment'
import '../log.css'

const initialState = {
    _id: 0,
    date : moment().format('YYYY-M-D'),
    type: '',
    number: 0,
    noPart: false,
    description: '',
    status: '',
    rtsDate: moment().format('YYYY-M-D'),
    fixed: false,
    dateFixed: moment().format('YYYY-M-D')
}

const Update = ({getBusById, bus: {bus, loading, submitted }, updateBus, deleteBus, match}) => {
    
    useEffect(() => { 
        if (!bus) {
            getBusById(match.params._id)
        } else if (bus.data[0]._id !== match.params._id || submitted) {
            getBusById(match.params._id)
        }

        if (!loading && bus) {
            const busData = { ...initialState }
            for (const key in bus.data[0]) {
                if (key in busData) {
                    busData[key] = bus.data[0][key]
                }
            }
            setFormData(busData)
        }
    }, [getBusById, loading, bus, match.params._id, submitted])

    const [formData, setFormData] = useState(initialState)

    const {
        _id,
        date,
        type,
        number,
        noPart,
        description,
        status,
        rtsDate,
        fixed,
        dateFixed
    } = formData

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault()
        updateBus(match.params._id, formData)
    }

    if (submitted) {
        return <Redirect to="/" />
    }

    return (
        <Fragment>
            { loading ? (
                <h1> Loading form </h1>
            ) : (
                bus ? (
                <div>
                    <Link to='/'>
                        <button className='goBack'>Go Back</button>
                    </Link>
                    <form className='updateForm' onSubmit={onSubmit}>
                    <h1 className='updateHeader'>Edit Bus Information</h1>
                    <div className='updateFormInput'>
                        <label>Date: </label>
                        <input type='date' name='date' value={moment(date).format('yyyy-MM-DD')} onChange={onChange} required></input>
                        <label>Type: </label>
                        <select type='text' name='type' value={type}  onChange={onChange} required>
                            <option></option>
                            <option>SMA</option>
                            <option>BRT</option>
                            <option>NON-REV</option>
                            <option>EXPRESS</option>
                        </select>
                        <label>Number: </label>
                        <input type='number' name='number' value={number} onChange={onChange} required></input>
                        <label>No Part: </label>
                        <select type='text' name='noPart' value={noPart} onChange={onChange} required>
                            <option>true</option>
                            <option>false</option>
                        </select>
                        <label>Reason Down: </label>
                        <input type='text' name='description' value={description} onChange={onChange} required></input>
                        <label>Bus Fixed: </label>
                        <select type='text' name='fixed' value={fixed} onChange={onChange} required>
                            <option>true</option>
                            <option>false</option>
                        </select>
                        <label>Status: </label>
                        <input type='text' name='status' value={status} onChange={onChange} required></input>
                        <label>Date Fixed: </label>
                        <input type='date' name='dateFixed' value={moment(dateFixed).format('yyyy-MM-DD')} onChange={onChange}></input>
                        <label>RTS Date: </label>
                        <input type='date' name='RTSdate' value={moment(rtsDate).format('yyyy-MM-DD')} onChange={onChange}></input>
                    </div>
                    <div>
                        <button type='submit'>Update</button>
                        <Link to='/'>
                            <button className='deleteButton' onClick={() => deleteBus(_id)}>Delete</button>
                        </Link>
                    </div>
                </form>
                </div>
                ) : (
                    <h1>Loading data</h1>
                )            
            )}
        </Fragment>
        )
}

Update.propTypes = {
    getBusById: PropTypes.func.isRequired,
    updateBus: PropTypes.func.isRequired,
    deleteBus: PropTypes.func.isRequired,
    bus: PropTypes.object.isRequired,
    submitted: PropTypes.bool
}

const mapStateToProps = state => ({
    bus: state.bus,
    submitted: state.submitted
})

export default connect(
    mapStateToProps, 
    { getBusById, updateBus, deleteBus }
)(Update)