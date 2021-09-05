import { 
    getInitialData, 
    saveQuestionAnswer,
    saveQuestion
} from '../utils/api'
import { formatQuestion } from '../utils/_DATA'
import { receiveUsers, saveUserAnswer, updateUserQuestionActionCreator } from './users'
import { receiveQuestions, giveVoting, saveQuestionActionCreator } from './questions'

export function handleInitialData() {
    return (dispatch) => {
        return getInitialData()
                .then(({users, questions}) => {
                    dispatch(receiveUsers(users))
                    dispatch(receiveQuestions(questions))
                })
    }
}

export function handleVotingOption(info) {
    return (dispatch) => {
        dispatch(giveVoting(info))
        dispatch(saveUserAnswer(info))
        return saveQuestionAnswer(info)
            .catch(e => {
                alert('Error: Fail to vote the poll.')
            })
    }
}

export function handleSaveQuestion(question) {
    return (dispatch) => {
        const formattedQuestion = formatQuestion(question)
        dispatch(saveQuestionActionCreator(formattedQuestion))
        dispatch(updateUserQuestionActionCreator(formattedQuestion))
        return saveQuestion(formattedQuestion)
            .catch(e => {
                // remove question from user
                // remove question from list
                alert('Error: Fail to create new question')
            })
    }
}