import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import BusView from './BusView'
import ArchiveFilter from './ArchiveFilter'
import { connect } from 'react-redux'
import { getArchiveLog } from '../actions/archiveLog'
import '../log.css'

const Archive = ({getArchiveLog, archive: {archive, loading}}) => {
    useEffect(() => {
        getArchiveLog()
    }, [getArchiveLog])

        return (
            <Fragment>
                { loading ? (
                    <h1> No buses in the archive </h1>
                ): (
                    <Fragment>
                        <div style={{textAlign: "center"}}>
                            <h1 style={{color: "#800000"}}>BUS REPAIR HISTORY</h1>
                        </div>
                        <ArchiveFilter />
                        <table className="logTable">
                            <tbody>
                                <tr className="tableHeading">
                                    <th>DATE OUT</th>
                                    <th>BUS #</th>
                                    <th>TYPE</th>
                                    <th>NO PART</th>
                                    <th>REASON DOWN</th>
                                    <th>STATUS</th>
                                    <th>DAYS OUT</th>
                                </tr>
                                {archive && !loading ? (archive.data.map(bus => (
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