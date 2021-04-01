import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import '../log.css'

const ArchView = ({ bus: { 
        date,
        dateFixed,
        type,
        number,
        noPart,
        description,
        status
 }}) => {


    const daysOut = Math.ceil((Math.abs(moment(dateFixed) - moment(date))) / 86400000)
    const noPartStr = String(noPart).charAt(0).toUpperCase() + String(noPart).slice(1);

    return (
        <Fragment>
            <tr className="busRepair">
                <td>{moment(date).format('MM/DD/YY')}</td>
                <td>{moment(dateFixed).format('MM/DD/YY')}</td>
                <td>{number}</td>
                <td>{type}</td>
                <td>{noPartStr}</td>
                <td>{description}</td>
                <td>{status}</td>
                <td>{daysOut}</td>
            </tr>
        </Fragment>
    )
}

ArchView.propTypes = {
    bus: PropTypes.object.isRequired
}

export default ArchView