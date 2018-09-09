import { combineReducers } from 'redux';
import {
  DEMO
} from '../../actions/index';

export let initialState = {
  demo: {
    data: 'demo'
  }
}

let reducers = combineReducers({
  demo(state = {}, action) {
    switch (action.type) {
      case DEMO:
        return { ...state, data: action.payload }
      default:
        return state
    }
  }
})

export default reducers