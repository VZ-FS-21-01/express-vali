const express = require('express')
const PORT = process.env.PORT || 3000
const app = express()

app.use(express.static('public'))
app.set('view engine', 'ejs')

// Middleware zwischen req & res
// Funktion die dazwischen ausgeführt wird
// Meistens nutzen wir vorgefertigte,

// Wichtig neuer Parameter next
app.use((req, res, next) => {
    // console.log(req.method)
    console.log('My Middleware')
    // Am ende der Middleware next aufrufen!
    next()
})

// Middleware nur für eine bestimmte URL
app.use('/users/:id', (req, res, next) => {
    console.log("Middleware just for users")
    next()
})
app.use('/about', (req, res, next) => {
    console.log('Just About')
    next()
})





app.get('/', (req, res) => {
    res.render('index')
})
app.get('/users/:id', (req, res) => {
    res.render('users', { user: req.params.id })
})


app.listen(PORT, () => console.log(`http://localhost:${PORT}`))