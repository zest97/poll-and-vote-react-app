import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PollForm from './PollForm'
import Result from './Result'

class PollDetail extends Component {
    isVoted = (option, author) => {
        return option.votes.includes(author)
    }
    hasVoted = (question, user) => {
        return this.isVoted(question.optionOne, user) || this.isVoted(question.optionTwo, user)
    }
    render() {
        const { users, questions, authedUser } = this.props
        const questionId = this.props.match.params.question_id
        const question = questions[questionId]
        const author = users[question.author]
        const totalVote = question.optionOne.votes.length + question.optionTwo.votes.length;
        return (
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-5'>
                        <div className='card poll-card mt-5'>
                            <div className='card-header fw-bold'>
                                <span className='text-capitalize'>{author.name}</span> asks:
                            </div>
                            <div className='card-body d-flex'>
                                <img src={author.avatarURL} className='avatar-detail-img mx-3' alt='Avatar'/>
                                <div className='border me-4'></div>
                                <div className='poll-box w-100'>
                                    <p className='fw-bold text-dark-red'>Would you rather ...</p>
                                    {this.hasVoted(question, authedUser)
                                        ?   (
                                                <div>
                                                    <Result 
                                                        option={question.optionOne} 
                                                        total={totalVote} 
                                                        voted={this.isVoted(question.optionOne, authedUser)} />
                                                    <Result 
                                                        option={question.optionTwo} 
                                                        total={totalVote} 
                                                        voted={this.isVoted(question.optionTwo, authedUser)} />
                                                </div>
                                            )
                                        :   <PollForm question={question} />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ users, questions, authedUser }) {
    return {
        users,
        questions,
        authedUser
    }
}

export default connect(mapStateToProps)(withRouter(PollDetail))