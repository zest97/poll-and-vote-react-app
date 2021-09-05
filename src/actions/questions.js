export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTION'
export const ADD_QUESTION = 'ADD_QUESTION'
export const GIVE_VOTE = 'GIVE_VOTE'

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

export function giveVoting({ authedUser, qid, answer }) {
    return {
        type: GIVE_VOTE,
        authedUser,
        qid,
        answer
    }
}

export function saveQuestionActionCreator(question) {
    return {
        type: ADD_QUESTION,
        question
    }
}