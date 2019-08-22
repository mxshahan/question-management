import { combineReducers } from 'redux';
import AppReducer from "./AppReducer";
import AuthReducer from './AuthReducer';
import SettingReducer from './SettingReducer';
import QuestionReducer from './QuestionReducer';

export default combineReducers({
    app: AppReducer,
    auth: AuthReducer,
    settings: SettingReducer,
    questions: QuestionReducer
})
