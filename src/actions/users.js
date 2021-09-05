export const RECEIVE_USERS = 'RECEIVE_USERS'
export const SAVE_USER_ANSWER = 'SAVE_USER_ANSWER'
export const UPDATE_USER_QUESTION = 'UPDATE_USER_QUESTION'

export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users
    }
}

export function saveUserAnswer({ authedUser, qid, answer }) {
    return {
        type: SAVE_USER_ANSWER,
        authedUser,
        qid,
        answer
    }
}

export function updateUserQuestionActionCreator({ id, author }) {
    return {
        type: UPDATE_USER_QUESTION,
        id,
        author
    }
}