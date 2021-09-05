import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropType from 'prop-types'

class Poll extends Component {
    getQuestionPrefix = () => {
        const { optionOne, optionTwo } = this.props.question
        const optionOneText = optionOne.text.split(' ')
        const optionTwoText = optionTwo.text.split(' ')
        let filter = true
        let questionPrefix = optionOneText.filter((word, id) => {
            if (filter) {
                if (word === optionTwoText[id]) {
                    return true
                }
                filter = false 
            } else {
                return filter
            }
            return filter
        })

        if (questionPrefix.length === 0) {
            return optionOne.text
        }
        return questionPrefix.join(" ")
    }
    render() {
        const { user, question } = this.props
        return (
            <div className='card mb-4 poll-card'>
                <div className='card-header fw-bold'>
                    <span className='text-capitalize'>{user.name}</span> asks:
                </div>
                <div className='card-body d-flex'>
                    <img src={user.avatarURL} className='avatar-img mx-5' alt='Avatar'/>
                    <div className='border me-4'></div>
                    <div className='poll-box w-100'>
                        <p className='fw-bold'>Would you rather</p>
                        <p className='question-prefix'>
                            ...{this.getQuestionPrefix()}...
                        </p>
                        <div className='d-grid'>
                            <Link to={`/questions/${question.id}`} className='btn btn-outline-primary btn-sm'>
                                View Poll
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ users, questions }, props) {
    const question = questions[props.id]
    const user = users[question.author]
    return {
        user,
        question
    }
}

Poll.propTypes = {
    id: PropType.string.isRequired
}

export default connect(mapStateToProps)(Poll)