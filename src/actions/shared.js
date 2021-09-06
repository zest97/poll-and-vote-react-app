import { 
    getInitialData, 
    saveQuestionAnswer,
    saveQuestion
} from '../utils/api'
import { formatQuestion } from '../utils/_DATA'
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
        dispatch(giveVoting(info))
        dispatch(saveUserAnswer(info))
        return saveQuestionAnswer(info)
            .then(() => dispatch(hideLoading()))
            .catch(e => {
                alert('Error: Fail to vote the poll.')
            })
    }
}

export function handleSaveQuestion(question) {
    return (dispatch) => {
        dispatch(showLoading())
        const formattedQuestion = formatQuestion(question)
        dispatch(saveQuestionActionCreator(formattedQuestion))
        dispatch(updateUserQuestionActionCreator(formattedQuestion))
        return saveQuestion(formattedQuestion)
            .then(() => dispatch(hideLoading()))
            .catch(e => {
                // remove question from user
                // remove question from list
                alert('Error: Fail to create new question')
            })
    }
}