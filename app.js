const path = require('path')

const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')

const createSessionConfig = require('./config/session')
const addCsrfTokenMiddleware = require('./middlewares/csrf-token')
const errorHandlerMiddleware = require('./middlewares/error-handler')
const checkAuthStatusMiddleware = require('./middlewares/check-auth')
const protectRoutesMiddleware = require('./middlewares/protect-routes')
const notFoundMiddleware = require('./middlewares/not-found')
const authRoutes = require('./routes/auth.routes')
const baseRoutes = require('./routes/base.routes')
const adminRoutes = require('./routes/admin.routes')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(expressSession(createSessionConfig))

app.use(cookieParser())
app.use(addCsrfTokenMiddleware)

app.use(checkAuthStatusMiddleware)

app.use(baseRoutes)
app.use(authRoutes)
app.use(protectRoutesMiddleware, adminRoutes)

app.use(notFoundMiddleware)

app.use(errorHandlerMiddleware)

const PORT = process.env.PORT
app.listen(PORT)
