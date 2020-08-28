import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import '../log.css'

class AddForm extends Component {
    render() {
        return (
            <Fragment>
                <form method="POST" action="">
                    <div style={{marginTop: "1em"}}>
                        <label>Date: </label>&nbsp;
                        <input type='date' name=''  placeholder='MM/DD/YY' required></input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <label>Type: </label>&nbsp;
                        <select type='text' name=''  placeholder='' required>
                            <option></option>
                            <option>SMA</option>
                            <option>BRT</option>
                            <option>NON-REV</option>
                            <option>EXPRESS</option>
                        </select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <label>Bus Number: </label>&nbsp;
                        <input type='text' name=''  placeholder='' required></input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <label>No Part: </label>&nbsp;
                        <select type='text' name=''  placeholder='' required>
                            <option>true</option>
                            <option>false</option>
                        </select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <label>Description: </label>&nbsp;
                        <input type='text' name=''  placeholder='' required></input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button>+ Add A Bus</button>
                    </div>
                </form>
            </Fragment>
        )
    }
}

export default AddForm