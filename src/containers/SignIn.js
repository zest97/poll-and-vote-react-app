import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { setAuthedUser } from '../actions/authUser'

class SignIn extends Component {
    state = {
        user: '',
        redirectToHome: false
    }
    signIn = (e) => {
        e.preventDefault()
        const { dispatch } = this.props
        dispatch(setAuthedUser(this.state.user))
        this.setState(() => ({
            user: '',
            redirectToHome: true
        }))
    }
    setUserName = (e) => {
        this.setState(() => ({
            user: e.target.value
        }))
    }
    render() {
        const { users } = this.props
        if (this.state.redirectToHome) {
            return <Redirect to='/' />
        }
        return (
            <div className='d-flex justify-content-center vh-90 align-items-center my-4'>
                <div className='card sign-in-card'>
                    <div className='card-header px-5 text-center'>
                        <p className='title fw-bold'>Welcome to the Would You Rather App!</p>
                        <p className='label mb-0 text-grey'>Please sign in to continue</p>
                    </div>
                    <div className='card-body bg-dark'>
                        <img src='./logo192.png' className='mx-auto d-block' alt='Logo'/>
                        <form onSubmit={this.signIn}>
                            <select className='form-control my-2' onChange={this.setUserName}>
                                <option>-</option>
                                {Object.keys(users).map(userId => (
                                    <option value={userId} key={userId}>{users[userId].name}</option>
                                ))}
                            </select>
                            <div className='d-grid'>
                                <button type='submit' className='btn btn-primary'>
                                    Sign In
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ users }) {
    return {
        users
    }
}

export default connect(mapStateToProps)(SignIn)