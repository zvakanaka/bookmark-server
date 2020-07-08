function logger (req, res, next) {
  console.log(`${req.method.padEnd('CONNECT'.length, ' ')} ${req.path.padEnd(32, ' ')} ${new Date().toString()}`)
  next()
}

module.exports = logger
