import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleVotingOption } from '../actions/shared'

class PollForm extends Component {
    state = {
        vote: ''
    }
    handleVote = (e) => {
        const vote = e.target.value
        this.setState(() => ({
            vote
        }))
    }
    handleSubmit = (e) => {
        e.preventDefault()

        const { dispatch, question, authedUser } = this.props
        dispatch(handleVotingOption({
            authedUser,
            qid: question.id,
            answer: this.state.vote
        }))
    }
    render() {
        const { question } = this.props
        return (
            <form onSubmit={this.handleSubmit}>
                <div className='d-flex align-items-center mb-2'>
                    <input 
                        onChange={this.handleVote}
                        id='optionOne' name='vote' type='radio' 
                        className='shadow-none form-check-input mt-0 me-2' value='optionOne' />
                    <label htmlFor='optionOne' className='form-radio-label'>{question.optionOne.text}</label>
                </div>
                <div className='d-flex align-items-center mb-4'>
                    <input 
                        onChange={this.handleVote}
                        id="optionTwo" name='vote' type='radio' 
                        className='shadow-none form-check-input mt-0 me-2' value='optionTwo' />
                    <label htmlFor="optionTwo" className='form-radio-label'>{question.optionTwo.text}</label>
                </div>
                <div className='d-grid'>
                    <button type='submit' className='btn btn-primary fw-bold shadow-none'>
                        Submit
                    </button>
                </div>
            </form>
        )
    }
}

function mapStateToProps({ authedUser }) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(PollForm)