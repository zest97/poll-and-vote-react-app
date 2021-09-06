import { 
    getInitialData, 
    saveQuestionAnswer,
    saveQuestion
} from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
import { receiveUsers, saveUserAnswer, updateUserQuestionActionCreator } from './users'
import { receiveQuestions, giveVoting, saveQuestionActionCreator } from './questions'

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
                dispatch(giveVoting(info))
                dispatch(saveUserAnswer(info))
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
                dispatch(updateUserQuestionActionCreator(formattedQuestion))
                dispatch(hideLoading())
            })
            .catch(e => {
                alert('Error: Fail to create new question')
            })
    }
}