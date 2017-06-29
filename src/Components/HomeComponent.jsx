import React from 'react'

function HomeComponent(props) {
	return (
		<div className="Home">
			<h4>Welcome to the Home Component</h4>
			<p>Logged in: {JSON.stringify(props.loggedIn)}</p>
			<code>
				Token:
				{JSON.stringify(props.token)}
			</code>
		</div>
	)
}

export default HomeComponent
