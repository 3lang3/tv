const express = require('express')
const app = express()
const router = express.Router()
const history = require('connect-history-api-fallback')

const indexRoute = router.get('/', (req, res) => {
  res.status(200).render('index', {
    title: '首页'
  })
})

app.use(history({
	index: './index.html',
  rewrites: [
    { from: /.*/, to: '/' }
  ]
}))

app.get('/', indexRoute)

app.use((req, res) => {
  res.status(404).send('File not found!')
})

app.listen(9090, '127.0.0.1', () => {
  console.log('ther server is running at port ' + 600232)
})


