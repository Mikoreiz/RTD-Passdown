import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { addBus } from '../actions/repairLog'
import moment from 'moment'
import '../log.css'

class AddForm extends Component {   

    constructor(props) {
        super(props)
        console.log(this.props)
        this.state = {
            date : Date(),
            type: '',
            number: 0,
            noPart: false,
            description: ''
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(e) {
        e.preventDefault()

        const formData = {
            date: this.state.date,
            type: this.state.type,
            number: this.state.number,
            noPart: this.state.noPart,
            description: this.state.description
        }

        this.props.addBus(formData)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        return (
            <Fragment>
                <form onSubmit={this.onSubmit}>
                    <div style={{marginTop: "1em"}}>
                        <label>Date: </label>&nbsp;
                        <input type='date' name='date' value={moment(this.state.date).format('yyyy-MM-DD')} placeholder='MM/DD/YY' onChange={this.onChange} required></input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <label>Type: </label>&nbsp;
                        <select type='text' name='type' value={this.state.type} placeholder='' onChange={this.onChange} required>
                            <option></option>
                            <option>SMA</option>
                            <option>BRT</option>
                            <option>NON-REV</option>
                            <option>EXPRESS</option>
                        </select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <label>Bus Number: </label>&nbsp;
                        <input type='number' name='number' value={this.state.number} placeholder='' onChange={this.onChange} required></input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <label>No Part: </label>&nbsp;
                        <select type='text' name='noPart' value={this.state.noPart} placeholder='' onChange={this.onChange} required>
                            <option>true</option>
                            <option>false</option>
                        </select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <label>Description: </label>&nbsp;
                        <input type='text' name='description' value={this.state.description} placeholder='' onChange={this.onChange} required></input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input onClick={() => window.location.reload(false)} type='submit' value='+ Add A Bus' />
                    </div>
                </form>
            </Fragment>
        )
    }
}

AddForm.propTypes = {
    repair: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    repair : state.repair
})

export default connect(mapStateToProps, { addBus })(withRouter(AddForm))