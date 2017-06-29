const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3001
const app = express()

// ======= MIDDLEWARE =======
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// ======= DEVELOPMENT BUILD =======
if (process.env.NODE_ENV === 'DEV') {
	require('dotenv').load()
	console.log('======== DEVELOPMENT ENVIRONMENT!!!! ========')
}

// ======= PRODUCTION BUILD =========
if (process.env.NODE_ENV === 'PROD') {
	console.log('======== PRODUCTION ENVIRONMENT!!!! ========')
	app.use(express.static(path.join(__dirname, '../', 'build')))
	// QUESTION: should this be * or / ???
	app.get('/', (req, res) => {
		res.sendFile(path.join(__dirname, '../', '/build/index.html'))
	})
}

// ======= API Routes =========
app.get('/test', (req, res) => {
	res.json({ test: 'hi' })
})

app.use('/api/auth', require('./controllers/authRouter.js'))

// Start Server && Connect to Mongo DB
if (process.env.NODE_ENV !== 'testing') {
	require('./models')
		.connect(process.env.MONGODB_URI)
		.then(() => {
			console.log(`Connected to the database: ${process.env.MONGODB_URI}`)
			app.listen(PORT, () => {
				console.log(`Listening on port: ${PORT}`)
			})
		})
		.catch(err => {
			console.log(`Error connecting to MongoDB @ ${process.env.MONGODB_URI}`)
		})
}

module.exports = app // for testing :)
