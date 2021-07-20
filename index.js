const express = require('express')
const PORT = process.env.PORT || 3000
const app = express()
const { body, validationResult } = require('express-validator');
// https://express-validator.github.io/docs/

app.use(express.static('public'))
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))



app.get('/', (req, res) => {
    res.render('index')
})
app.post('/add',
    // body => req.body
    // 'mail' => der name aus dem HTML
    // isEmail() Funktion die wir auf diesen Input anwenden wollen
    body('mail').isEmail(),
    body('user').isLength({ min: 3, max: 5 }),
    (req, res) => {
        // Mögliche Fehler werden so gespeicher
        const errors = validationResult(req);
        console.log(errors)
        // Überprüft ob das Fehler - Array leer ist
        console.log(errors.isEmpty())
        // console.log(req.body)
        if (!errors.isEmpty()) {
            console.log("Fehler")
            res.render('index', { err: errors })
        } else {
            console.log("Keine Fehler")
            res.render('added', { user: req.body.user })
        }
    })



app.listen(PORT, () => console.log(`http://localhost:${PORT}`))