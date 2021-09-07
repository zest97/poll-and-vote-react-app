import { 
    getInitialData, 
    saveQuestionAnswer,
    saveQuestion
} from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
import { receiveUsers } from './users'
import { receiveQuestions, ADD_ANSWER, ADD_QUESTION } from './questions'

function addAnswerActionCreator(info) {
    return {
        type: ADD_ANSWER,
        info
    }
}

function saveQuestionActionCreator(question) {
    return {
        type: ADD_QUESTION,
        question
    }
}

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
                .then(({users, questions}) => {
                    dispatch(receiveUsers(users))
                    dispatch(receiveQuestions(questions))
                    dispatch(hideLoading())
                })
    }
}

export function handleVotingOption(info) {
    return (dispatch) => {
        dispatch(showLoading())
        return saveQuestionAnswer(info)
            .then(() => {
                dispatch(addAnswerActionCreator(info))
                dispatch(hideLoading())
            })
            .catch(e => {
                alert('Error: Fail to vote the poll.')
            })
    }
}

export function handleSaveQuestion(question) {
    return (dispatch) => {
        dispatch(showLoading())
        return saveQuestion(question)
            .then((formattedQuestion) => {
                dispatch(saveQuestionActionCreator(formattedQuestion))
                dispatch(hideLoading())
            })
            .catch(e => {
                alert('Error: Fail to create new question')
            })
    }
}