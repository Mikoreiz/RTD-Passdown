import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import '../log.css'

class Bus extends Component {
    
    render() {
        const {rep} = this.props
        const daysOut = Math.ceil((Math.abs(moment() - moment(rep.date))) / 86400000)
        const noPart = String(rep.noPart).charAt(0).toUpperCase() + String(rep.noPart).slice(1);

        return (
            <Fragment>
                <tr className="busRepair">
                    <td>{moment(rep.date).format('MM/DD/YY')}</td>
                    <td>{rep.type}</td>
                    <td>{rep.number}</td>
                    <td>{noPart}</td>
                    <td>{rep.description}</td>
                    <td>{daysOut}</td>
                    <td><button>Edit</button></td>
                </tr>
            </Fragment>
        )
    }
}

Bus.propTypes = {
    bus: PropTypes.object.isRequired
}

export default Bus