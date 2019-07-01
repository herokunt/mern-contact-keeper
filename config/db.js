const mongoose = require('mongoose')
const config = require('config') // the package, not the folder
const db = config.get('mongoURI')
const chalk = require('chalk')

// Using then/catch, could use await but this is fine
const connectDB = () => {
  mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log(chalk.green.bold('MongoDB Connected')))
  .catch(err => {
    console.error(chalk.red.bold(`Error: ${err.message}`))
    process.exit(1)
  })
}

module.exports = connectDB
