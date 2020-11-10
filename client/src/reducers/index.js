import { combineReducers } from 'redux'
import bus from './bus'
import archive from './archive'

export default combineReducers({
    bus, 
    archive
})