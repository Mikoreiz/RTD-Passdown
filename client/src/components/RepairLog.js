import React, {Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getRepairLog } from '../actions/repairLog'

class RepairLog extends Component {
    componentDidMount() {
        this.props.getRepairLog
    }

    render() {
        const { repair, loading} = this.props.repair
        let repairList

        if ( repair == null || loading ) {
            repairList = <h1> No buses in need of repair </h1>
        } else {
            repairList = repair.data.map((rep, i) => (
                <Bus key={i} rep={rep}/>
            ))
        }
    }

    return (
        
    )
}