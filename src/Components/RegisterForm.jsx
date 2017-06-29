import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

class RegisterForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			password1: '',
			password2: '',
			redirectTo: '',
			error: false,
			errorMessage: ''
		}
	}
	handleSubmit = e => {
		e.preventDefault()

		if (this.state.password1 !== this.state.password2) {
			return this.setState(() => ({
				error: true,
				errorMessage: 'Passwords must match'
			}))
		} else if (!this.state.username) {
			return this.setState(() => ({
				error: true,
				errorMessage: 'Must include a username'
			}))
		} else if (this.state.password1.length < 6) {
			return this.setState(() => ({
				error: true,
				errorMessage: 'Password must be at least 6 characters long'
			}))
		} else {
			// ==== ALL VALIDATORS PASSED ====
			axios
				.post('/api/auth/register', {
					username: this.state.username,
					password: this.state.password1
				})
				.then(response => {
					if (response.data.success) {
						this.setState(() => ({ redirectTo: '/login' }))
					} else {
						this.setState(() => ({
							error: true,
							errorMessage: response.data.errorMessage
						}))
					}
				})
				.catch(err => {
					console.log(err)
				})
		}
	}
	handleChange = (inputKey, e) => {
		e.preventDefault()
		const newValue = e.target.value
		this.setState(() => {
			return { [inputKey]: newValue }
		})
	}
	dismissAlert = () => {
		this.setState(() => ({
			error: false,
			errorMessage: ''
		}))
	}
	render() {
		return (
			<div className="RegisterForm">
				{/*  Handle the Redirect*/}
				{this.state.redirectTo
					? <Redirect to={{ pathname: this.state.redirectTo }} />
					: <div />}
				{/*  Alert Errors here */}
				{this.state.error
					? <div className="alert alert-danger">
							<button className="close" onClick={this.dismissAlert}>
								<span>&times;</span>
							</button>
							{this.state.errorMessage}
						</div>
					: <div />}
				<form onSubmit={this.handleSubmit}>
					<div className="form-group">
						<label htmlFor="username">
							Username:
							<input
								type="text"
								name="username"
								className="form-control"
								value={this.state.username}
								onChange={this.handleChange.bind(this, 'username')}
							/>
						</label>
					</div>
					<div className="form-group">
						<label htmlFor="password1">
							Password:
							<input
								type="password"
								name="password1"
								className="form-control"
								value={this.state.password1}
								onChange={this.handleChange.bind(this, 'password1')}
							/>
						</label>
					</div>
					<div className="form-group">
						<label htmlFor="password2">
							Confirm password:
							<input
								type="password"
								name="password2"
								className="form-control"
								value={this.state.password2}
								onChange={this.handleChange.bind(this, 'password2')}
							/>
						</label>
					</div>
					<button type="submit" className="btn btn-info">Submit</button>
				</form>
			</div>
		)
	}
}

export default RegisterForm
