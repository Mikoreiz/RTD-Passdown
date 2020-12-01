import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { getArchiveLog } from '../actions/archiveLog'
import moment from 'moment'
import '../log.css'

const initialState = {
    number: null,
    type: null,
    from: null,
    to: null
}

const ArchiveFilter = () => {

    const [formData, setFormData] = useState(initialState)

    const {number, type, from, to} = formData

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault()
        getArchiveLog(number, type, from, to)
    }

    return(
        <Fragment>
            <div>
                <form className='filterForm' onSubmit={onSubmit}>
                    <label>Bus Number:</label>&nbsp;
                    <input type='number' name='number' value={number} onChange={onChange}></input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <label>Type: </label>&nbsp;
                    <select type='text' name='type' value={type} onChange={onChange}>
                        <option></option>
                        <option>SMA</option>
                        <option>BRT</option>
                        <option>NON-REV</option>
                        <option>EXPRESS</option>
                    </select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <label>From: </label>&nbsp;
                    <input type='date' name='from' value={moment(from).format('yyyy-MM-DD')} onChange={onChange}></input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <label>To: </label>&nbsp;
                    <input type='date' name='to' value={moment(to).format('yyyy-MM-DD')} onChange={onChange}></input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button type='submit'>Filter Results</button>
                 </form>
            </div>
        </Fragment>
    )
}

ArchiveFilter.propTypes = {
    getArchiveLog: PropTypes.func.isRequired,
    archive: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    archive: state.archive
})

export default connect(
    mapStateToProps, 
    {getArchiveLog}
)(ArchiveFilter)