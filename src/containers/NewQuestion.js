import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleSaveQuestion } from '../actions/shared'

class NewQuestion extends Component {
    state = {
        optionOne: {
            text: '',
            error: ''
        },
        optionTwo: {
            text: '',
            error: ''
        },
        redirect: false
    }
    handleOptionOneText = (e) => {
        this.setState(() => ({
            optionOne: {
                text: e.target.value,
                error: ''
            }
        }))
    }
    handleOptionTwoText = (e) => {
        this.setState(() => ({
            optionTwo: {
                text: e.target.value,
                error: ''
            }
        }))
    }
    setError(option) {
        const error = 'Error: Question must not be empty.'
        this.setState(() => ({
            [option]: {
                error
            }
        }))
    }
    handleAddingNewQuestion = (e) => {
        e.preventDefault();
        const { optionOne, optionTwo } = this.state
        if (optionOne.text === '') {
            this.setError('optionOne')
            return;
        }
        if (optionTwo.text === '') {
            this.setError('optionTwo')
            return;
        }
        const { dispatch, authedUser } = this.props
        dispatch(handleSaveQuestion({
            optionOneText: optionOne.text,
            optionTwoText: optionTwo.text,
            author: authedUser
        }))
        this.resetAndRedirect()
    }
    resetAndRedirect() {
        this.setState(() => ({
            optionOne: {
                text: ''
            },
            optionTwo: {
                text: ''
            },
            redirect: true
        }))
    }
    render() {
        if (this.state.redirect === true) {
            return <Redirect to='/'/>
        }
        
        return (
            <div className='container my-5'>
                <div className='row justify-content-center'>
                    <div className='col-6'>
                        <div className='card new_question_card'>
                            <div className='card-header text-center fw-bold'>
                                Create New Question
                            </div>
                            <div className='card-body'>
                                <p className='label'>Complete the question:</p>
                                <h5 className='fw-bold mb-3'>Would you rather ...</h5>
                                <form onSubmit={this.handleAddingNewQuestion}>
                                    <div className='mb-3'>
                                        <input type='text' className='form-control'
                                            placeholder='Enter option one text here...' onChange={this.handleOptionOneText} />
                                        <p className='error text-danger'>{this.state.optionOne.error}</p>
                                    </div>
                                    <div className='my-3 d-flex justify-content-between align-items-center'>
                                        <div className='w-100 border height-2'></div>
                                        <span className='mx-3'>Or</span>
                                        <div className='w-100 border height-2'></div>
                                    </div>
                                    <div className='mb-3'>
                                        <input type='text' className='form-control'
                                            placeholder='Enter option two text here...' onChange={this.handleOptionTwoText} />
                                            <p className='error text-danger'>{this.state.optionTwo.error}</p>
                                    </div>
                                    <div className='d-grid'>
                                        <button type='submit' className='btn btn-primary'>Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ authedUser }) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(NewQuestion)