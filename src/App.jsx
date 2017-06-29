import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import LoginComponent from './Components/LoginComponent.jsx'
import HomeComponent from './Components/HomeComponent.jsx'
import RegisterForm from './Components/RegisterForm.jsx'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			token: '',
			loggedIn: false
		}
	}
	setToken = token => {
		this.setState(() => {
			return { token, loggedIn: true }
		})
	}
	removeToken = () => {
		this.setState(() => {
			return { token: '', loggedIn: false }
		})
	}
	render() {
		return (
			<div className="App container-fluid">
				<header style={{ textAlign: 'center', padding: '1em' }}>
					{/*  Display Header up here*/}
					<h2>React authenticated SPA </h2>
				</header>

				{/*  Display Navigation here*/}
				<nav className="navbar">
					<ul className="nav">
						<li className="nav-item mr-2">
							<Link to="/">Home</Link>
						</li>
						{this.state.loggedIn
							? <li className="nav-item mr-2">
									<a
										href=""
										onClick={e => {
											e.preventDefault()
											this.removeToken()
										}}
									>
										Log out
									</a>
								</li>
							: <li className="nav-item mr-2">
									<Link to="/login">Login</Link>
								</li>}
						<li className="nav-item mr-2">
							<Link to="/register">Register</Link>
						</li>
					</ul>
				</nav>
				{/*  Routes for the Components*/}
				<div className="container">
					<Route
						path="/login"
						render={() => <LoginComponent setToken={this.setToken} />}
					/>
					<Route path="/register" component={RegisterForm} />
					<Route
						exact
						path="/"
						render={() =>
							<HomeComponent
								loggedIn={this.state.loggedIn}
								token={this.state.token}
							/>}
					/>
					{/* <Route
						exact
						path="/"
						component={HomeComponent}
						loggedIn={this.state.loggedIn}
						token={this.state.token}
					/> */}
				</div>
			</div>
		)
	}
}

export default App
