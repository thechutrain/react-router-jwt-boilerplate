import React, { Component } from 'react'
import axios from 'axios'

class MakeRequest extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: undefined
		}
	}
	componentDidMount() {
		axios.get('/test').then(response => {
			console.log('made request!')
			this.setState(prevState => {
				return { data: response.data }
			})
		})
	}
	render() {
		return (
			<div className="MakeRequest" style={{ border: '1px dashed pink' }}>
				<p>API data: </p>
				<code>
					<pre>
						{JSON.stringify(this.state.data, null, 4)}

					</pre>
				</code>
			</div>
		)
	}
}

export default MakeRequest
