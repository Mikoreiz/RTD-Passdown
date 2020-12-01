import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import moment from 'moment'
import '../log.css'

const Bus = ({ bus: { 
        _id,
        date,
        type,
        number,
        noPart,
        description,
        status
 }}) => {


    const daysOut = Math.ceil((Math.abs(moment() - moment(date))) / 86400000)
    const noPartStr = String(noPart).charAt(0).toUpperCase() + String(noPart).slice(1);

    return (
        <Fragment>
            <tr className="busRepair">
                <td>{moment(date).format('MM/DD/YY')}</td>
                <td>{number}</td>
                <td>{type}</td>
                <td>{noPartStr}</td>
                <td>{description}</td>
                <td>{status}</td>
                <td>{daysOut}</td>
                <td>
                    <button><Link to={`update/${_id}`}>Edit</Link></button>
                </td>
            </tr>
        </Fragment>
    )
}

Bus.propTypes = {
    bus: PropTypes.object.isRequired
}

export default Bus