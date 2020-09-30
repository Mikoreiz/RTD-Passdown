import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Bus from './Bus'
import AddForm from './AddForm'
import { connect } from 'react-redux'
import { getRepairLog } from '../actions/repairLog'
import moment from 'moment'
import '../log.css'

class RepairLog extends Component {
    componentDidMount() {
        this.props.getRepairLog()
    }

    render() {
        const {repair, loading} = this.props.repair
        let repairList

        if (repair === null || loading) {
            repairList = <h1> No buses in need of repair </h1>
        } else {
            repairList = repair.data.map((rep, i) => (
                <Bus key={i} rep={rep}/>
            ))
        }

        return (
            <div>
                <div style={{textAlign: "center"}}>
                    <h1 style={{color: "#800000"}}>PASSDOWN</h1>
                    <h2>{moment().format('MMMM Do YYYY')}</h2>
                </div>
                <table className="logTable">
                    <tbody>
                        <tr className="tableHeading">
                            <th>DATE</th>
                            <th>TYPE</th>
                            <th>BUS #</th>
                            <th>NO PART</th>
                            <th>DESCRIPTION</th>
                            <th>DAYS OUT</th>
                            <th>UPDATE</th>

                        </tr>
                        {repairList}
                    </tbody>
                </table>
                <AddForm/>
            </div>
        )
    }
}

RepairLog.propTypes = {
    getRepairLog: PropTypes.func.isRequired,
    repair: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    repair: state.repair
})

export default connect(
    mapStateToProps,
    { getRepairLog }
)(RepairLog)