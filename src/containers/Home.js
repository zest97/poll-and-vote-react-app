import React, { Component } from 'react';
import { connect } from 'react-redux'
import ListOfPoll from '../components/ListOfPoll';

class Home extends Component {
    state = {
        isUnaswerTabOpen: true,
        isAswerTabOpen: false
    }
    toggleBtnActive = () => {
        document.getElementById('unasnwer-tab-btn').classList.toggle('active')
        document.getElementById('asnwer-tab-btn').classList.toggle('active')
    }
    openUnasweredQuestions = (e) => {
        e.preventDefault()

        if (this.state.isUnaswerTabOpen) { return false; }

        this.setState(() => ({
            isUnaswerTabOpen: true,
            isAswerTabOpen: false
        }))

        this.toggleBtnActive()
    }
    openAnswerQuestions = (e) => {
        e.preventDefault()

        if (this.state.isAswerTabOpen) { return false; }

        this.setState(() => ({
            isUnaswerTabOpen: false,
            isAswerTabOpen: true
        }))

        this.toggleBtnActive()
    }
    render() {
        const { unanswered, answered } = this.props
        return (
            <div className='container my-5'>
                <div className='row justify-content-center'>
                    <div className='col-6'>
                        <div className='card'>
                            <div className='card-header d-flex p-0'>
                                <button 
                                    id='unasnwer-tab-btn'
                                    className='btn btn-link text-uppercase py-3 text-capitalize flex-w-50 rounded-0 border-end fw-bold card-header-tab-button active'
                                    onClick={this.openUnasweredQuestions}>
                                    Unanswered Questions
                                </button>
                                <button 
                                    id='asnwer-tab-btn'
                                    className='btn btn-link text-uppercase py-3 text-capitalize flex-w-50 rounded-0 fw-bold card-header-tab-button'
                                    onClick={this.openAnswerQuestions}>
                                    Answered Questions
                                </button>
                            </div>
                            <div className='card-body tab-content'>
                                {this.state.isUnaswerTabOpen && (
                                    <ListOfPoll polls={unanswered} />
                                )}

                                {this.state.isAswerTabOpen && (
                                    <ListOfPoll polls={answered} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ authedUser, questions }, props) {
    const answered = Object.keys(questions).filter((qid) => {
        return questions[qid].optionOne.votes.includes(authedUser) || questions[qid].optionTwo.votes.includes(authedUser)
    }).sort((fqid, sqid) => questions[fqid].timestamp - questions[sqid].timestamp)
    const unanswered = Object.keys(questions).filter((qid) => {
        return !(questions[qid].optionOne.votes.includes(authedUser) || questions[qid].optionTwo.votes.includes(authedUser))
    }).sort((fqid, sqid) => questions[sqid].timestamp - questions[fqid].timestamp)
    
    return {
        answered,
        unanswered
    }
}

export default connect(mapStateToProps)(Home);