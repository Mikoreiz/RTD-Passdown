import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ArchView from './ArchView'
import { connect } from 'react-redux'
import { getArchiveLog } from '../actions/archiveLog'
import moment from 'moment'
import '../log.css'

const initialState = {
    number: 0,
    type: '',
    from: moment('2020/01/01').format('YYYY-M-D H:m'),
    to: moment().format('YYYY-M-D H:m')
}

const Archive = ({getArchiveLog, archive: {archive, loading}}) => {
    useEffect(() => {
        getArchiveLog()
    }, [getArchiveLog])

    const [formData, setFormData] = useState(initialState)

    const {number, type, from, to} = formData

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault()
        getArchiveLog(number, type, from, to)
        console.log(type)
    }

        return (
            <Fragment>
                { loading ? (
                    <h1> No buses in the archive </h1>
                ): (
                    <Fragment>
                        <div style={{textAlign: "center"}}>
                            <h1 style={{color: "#800000"}}>BUS REPAIR HISTORY</h1>
                        </div>
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
                        <table className="logTable">
                            <tbody>
                                <tr className="tableHeading">
                                    <th>DATE OUT</th>
                                    <th>DATE FIXED</th>
                                    <th>BUS #</th>
                                    <th>TYPE</th>
                                    <th>NO PART</th>
                                    <th>REASON DOWN</th>
                                    <th>STATUS</th>
                                    <th>DAYS OUT</th>
                                </tr>
                                {archive && !loading ? (archive.data.map(bus => (
                                    <ArchView key={bus._id} bus={bus}/>
                                ))): (
                                    <h1>No buses found</h1>
                                )}
                            </tbody>
                        </table>
                    </Fragment>
                )}
            </Fragment>
        )
}

Archive.propTypes = {
    getArchiveLog: PropTypes.func.isRequired,
    archive: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    archive: state.archive
})

export default connect(
    mapStateToProps,
    { getArchiveLog }
)(Archive)