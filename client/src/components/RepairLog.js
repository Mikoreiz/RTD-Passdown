import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import Bus from './Bus'
import AddForm from './AddForm'
import { connect } from 'react-redux'
import { getRepairLog } from '../actions/repairLog'
import moment from 'moment'
import '../log.css'

const RepairLog = ({getRepairLog, bus: {buses, loading}}) => {
    useEffect(() => {
        getRepairLog()
    }, [getRepairLog])
    console.log(buses)

        return (
            <Fragment>
                { loading ? (
                    <h1> No buses in need of repair </h1>
                ): (
                    <Fragment>
                        <div style={{textAlign: "center"}}>
                            <h1 style={{color: "#800000"}}>PASSDOWN</h1>
                            <h2>{moment().format('MMMM Do YYYY')}</h2>
                        </div>
                        <table className="logTable">
                            <tbody>
                                <tr className="tableHeading">
                                    <th>BUS #</th>
                                    <th>TYPE</th>
                                    <th>DATE</th>
                                    <th>NO PART</th>
                                    <th>REASON DOWN</th>
                                    <th>STATUS</th>
                                    <th>RTS DATE</th>
                                    <th>DAYS OUT</th>
                                    <th>UPDATE</th>
                                </tr>
                                {buses && !loading ? (buses.data.map(bus => (
                                    <Bus key={bus._id} bus={bus}/>
                                ))): (
                                    <h1>No buses found</h1>
                                )}
                            </tbody>
                        </table>
                        <AddForm/>
                    </Fragment>
                )}
            </Fragment>
        )
}

RepairLog.propTypes = {
    getRepairLog: PropTypes.func.isRequired,
    bus: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    bus: state.bus
})

export default connect(
    mapStateToProps,
    { getRepairLog }
)(RepairLog)