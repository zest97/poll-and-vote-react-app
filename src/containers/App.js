import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux'
import Nav from '../components/Nav'
import { handleInitialData } from '../actions/shared'
import Home from './Home'
import LeaderBoard from './Leaderboard'
import NewQuestion from './NewQuestion'
import PollDetail from '../components/PollDetail';
import SignIn from './SignIn'
import PrivateRoute from '../components/PrivateRoute'

class App extends Component {
	componentDidMount() {
		this.props.dispatch(handleInitialData())
	}
	render() {
		return (
			<Router>
				<Fragment>
					<p className='text-center bg-dark text-white py-2 text-capitalize mb-0'>React App</p>
					<Nav />
					<PrivateRoute exact path='/'>
						<Home />
					</PrivateRoute>
					<PrivateRoute path='/questions/:question_id'>
						<PollDetail />
					</PrivateRoute>
					<PrivateRoute path='/leader-board'>
						<LeaderBoard />
					</PrivateRoute>
					<PrivateRoute path='/new/question'>
						<NewQuestion />
					</PrivateRoute>
					<Route path='/sign-in' component={SignIn} />
				</Fragment>
			</Router>
		)
	}
}

function mapStateToProps({ authedUser }, props) {
	return {
		authedUser
	}
}

export default connect(mapStateToProps)(App)