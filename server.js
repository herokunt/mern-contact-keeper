const express = require('express')
const


const app = express()

app.get('/', (req, res, next) => {
  res.json({ msg: 'Welcome to the ContactKeeper API'})
})

app.use('/api/users', require('./routes/users')
app.use('/api/auth', require('./routes/auth')
app.use('/api/contacts', require('./routes/contacts')

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
