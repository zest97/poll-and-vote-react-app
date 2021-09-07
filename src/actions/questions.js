export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTION'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_ANSWER = 'ADD_ANSWER'

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}