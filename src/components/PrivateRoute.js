import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

class PrivateRoute extends Component {
    render() {
        const { children, ...rest} = this.props
        return (
            <Route {...rest} render={({ location }) => {
                if (this.props.authedUser === null) {
                    return (
                        <Redirect to={{
                            pathname: '/sign-in',
                            state: { from: location }
                        }} />
                    )
                } else {
                    return (
                        children
                    )
                }
            }} />
        )
    }
}

function mapStateToProps({ authedUser }, props) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(PrivateRoute)