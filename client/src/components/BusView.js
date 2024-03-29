import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import '../log.css'

const BusView = ({ bus: { 
        date,
        type,
        number,
        noPart,
        description,
        status,
        rtsDate
 }}) => {


    const daysOut = Math.ceil((Math.abs(moment() - moment(date))) / 86400000)
    const noPartStr = String(noPart).charAt(0).toUpperCase() + String(noPart).slice(1);

    return (
        <Fragment>
            <tr className="busRepair">
                <td>{number}</td>
                <td>{type}</td>
                <td>{moment(date).format('MM/DD/YY')}</td>
                <td>{noPartStr}</td>
                <td>{description}</td>
                <td>{status}</td>
                <td>{moment(rtsDate).format('MM/DD/YY')}</td>
                <td>{daysOut}</td>
            </tr>
        </Fragment>
    )
}

BusView.propTypes = {
    bus: PropTypes.object.isRequired
}

export default BusView