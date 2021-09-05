import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserDetail from '../components/UserDetail'

class LeaderBoard extends Component {
    render() {
        const { users } = this.props
        return (
            <div className='container my-5'>
                <div className='row justify-content-center'>
                    <div className='col-6'>
                        <div className='card'>
                            <div className='card-header fw-bold'>LeaderBoard</div>
                            <div className='card-body'>
                                {users.map(user => (
                                    <UserDetail user={user} key={user.id} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ users, questions }) {
    // list of users sorted by score
    let usersWithScore = Object.keys(users).map((userId) => {
        let user = users[userId]
        let score = Object.keys(user.answers).length + Object.keys(user.questions).length
        return {
            ...user,
            score
        }
    }).sort((first, second) => second.score - first.score)

    return {
        users: usersWithScore
    }
}

export default connect(mapStateToProps)(LeaderBoard)