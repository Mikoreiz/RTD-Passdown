import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import BusView from './BusView'
import { connect } from 'react-redux'
import { getRepairLog } from '../actions/repairLog'
import moment from 'moment'
import '../log.css'

const View = ({getRepairLog, bus: {buses, loading}}) => {

    useEffect(() => {
        getRepairLog()
    }, [getRepairLog])

        return (
            <Fragment>
                <meta httpEquiv="refresh" content="600" />
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
                                    <th>DATE</th>
                                    <th>BUS #</th>
                                    <th>TYPE</th>
                                    <th>NO PART</th>
                                    <th>REASON DOWN</th>
                                    <th>STATUS</th>
                                    <th>DAYS OUT</th>
                                </tr>
                                {buses && !loading ? (buses.data.map(bus => (
                                    <BusView key={bus._id} bus={bus}/>
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

View.propTypes = {
    getRepairLog: PropTypes.func.isRequired,
    bus: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    bus: state.bus
})

export default connect(
    mapStateToProps,
    { getRepairLog }
)(View)