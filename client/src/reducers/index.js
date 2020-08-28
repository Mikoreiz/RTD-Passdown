import { combineReducers } from 'redux'
import repair from './repair'
import archive from './archive'

export default combineReducers({
    repair, 
    archive
})