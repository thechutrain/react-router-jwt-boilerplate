const express = require('express')
const router = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const os = require('os')
const dns = require('dns')

router.get('/', (req, res) => {
	res.json({ test: '123' })
})
/*  ========== Register Route ===========
*
*/
router.post('/register', (req, res) => {
	// // TODO - check where the req is coming from (should only come from self)
	// console.log('======== REQ Check  ========')
	// console.log(req.headers.host)
	// console.log(req.headers.origin)
	// 1. Get the username and password from registration
	const { username, password } = req.body
	// 2. Search the User database to make sure there isn't already a user with the same username
	User.find({ username }, (err, match) => {
		if (err) {
			return res.json({ error: true, errorMessage: 'Error in finding User' })
		} else if (match.length !== 0) {
			return res.json({
				error: true,
				errorMessage: 'There is already a user with that username'
			})
		}
		// 3. Create the new user!
		const userData = new User({
			username,
			password
		})
		// 4. Save to the database
		userData.save(err => {
			console.log('saving ...')
			if (err) {
				return res.json({ error: true, errorMessage: 'Saving Error' })
			}
			return res.json({ success: true })
		})
	}) // closes User.find()
})

/*  ========== Login Route ===========
*
*/
router.post('/login', (req, res) => {
	// TODO - check where the req is coming from (should only come from self)
	console.log('======== REQ Check  ========')
	console.log(req.headers.host)
	console.log(req.headers.origin)
	console.log('======== Check current OS ========')
	console.log(os.hostname())
	console.log(os.networkInterfaces())
	dns.lookup(os.hostname(), (err, add, fam) => {
		console.log(add)
	})

	// 1. get the username and password from the request
	const { username, password } = req.body
	if (!username || !password) {
		return res.json({
			error: true,
			errorMessage: 'Must provide username & password'
		})
	}
	// 2. Search database to find the user
	User.findOne({ username }, (err, userMatch) => {
		console.log('userMatch: ', userMatch)
		if (err || userMatch === null) {
			return res.json({
				error: true,
				errorMessage: 'No userMatch for that username'
			})
		} else if (!userMatch.checkPassword(password)) {
			return res.json({ error: true, errorMessage: 'Password is incorrect' })
		} else {
			// 3. Valid user ... so let's make a token
			// 3a. make the payload of the JWT (IMPORTANT don't put sensitive data here!! like a password)
			const payload = {
				_id: userMatch._id,
				username: userMatch.username,
				isAdmin: userMatch.isAdmin || false,
				exp: Math.floor(Date.now() / 1000) + 60 * 60 // expires in 1 hour
			}
			// console.dir(payload)

			// 3b. Sign the token with your password (look at the .env file!)
			const token = jwt.sign(payload, process.env.JWT_PASSPHRASE)
			res.json({ token })

			// 4. Make a cookie, and store the token in the cookie so users send it with every request
			// send cookie to user
			// const options = {
			// 	httpOnly: true
			// }
			// res.cookie('token', token, options)
			// res.json({ success: true, msg: 'you are signed in' })
		}
	}) // ends User.findOne query
})

module.exports = router
