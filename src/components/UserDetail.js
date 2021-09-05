import React, { Component } from 'react'
import Score from './Score'
import PropType from 'prop-types'

class UserDetail extends Component {
    render() {
        const { user } = this.props
        return (
            <div className='card user-card mb-3'>
                <div className='card-body d-flex justify-content-between'>
                    <img src={user.avatarURL} className='avatar-img' alt='Avatar'/>
                    <div className='border'></div>
                    <div className='user-detail d-flex flex-column justify-content-between'>
                        <p className='user-name mb-0 fw-bold'>{user.name}:</p>
                        <table className='table table-borderless mb-0 user-info-table'>
                            <tbody>
                                <tr className='border-bottom'>
                                    <td>Answered questions</td>
                                    <td>{Object.keys(user.answers).length}</td>
                                </tr>
                                <tr>
                                    <td>Created questions</td>
                                    <td>{Object.keys(user.questions).length}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='border'></div>
                    <Score point={user.score} />
                </div>
            </div>
        )
    }
}

UserDetail.propTypes = {
    user: PropType.object.isRequired
}

export default UserDetail