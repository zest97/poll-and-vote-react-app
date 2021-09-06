import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { removeAuthedUser } from '../actions/authUser'

class Nav extends Component {
    logout = (e) => {
        e.preventDefault()
        const { dispatch } = this.props
        dispatch(removeAuthedUser())
    }
    render() {
        const { location, authedUser, users } = this.props
        return (
            <div className='border'>
                <nav className='d-flex justify-content-between container'>
                    <ul className='nav'>
                        <li className='nav-item'>
                            <Link to='/' className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}>Home</Link>
                        </li>
                        <li className='nav-item'>
                            <Link 
                                to='/add' 
                                className={location.pathname === '/add' ? 'nav-link active' : 'nav-link'}>New Question</Link>
                        </li>
                        <li className='nav-item'>
                            <Link 
                                to='/leaderboard' 
                                className={location.pathname === '/leaderboard' ? 'nav-link active' : 'nav-link'}>
                                Leader Board
                            </Link>
                        </li>
                    </ul>
                    {this.props.authedUser !== null
                        && (
                        <ul className='nav'>
                            <li>
                                <div className='nav-link'>
                                    Hello,
                                    <span className='pe-4'>{users[authedUser].name}</span>
                                    <img src={users[authedUser].avatarURL} className='user-thumbnail' alt='User-Thumbnail' />
                                </div>
                            </li>
                            <li className='nav-item'>
                                <a href='/#/' onClick={this.logout} className='nav-link'>Logout</a>
                            </li>
                        </ul>
                        )}
                </nav>
            </div>
        )
    }
}

function mapStateToProps({ authedUser, users }, props) {
    return {
        users,
        authedUser
    }
}

export default connect(mapStateToProps)(withRouter(Nav));