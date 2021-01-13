const express = require('express')
const fs = require('fs')

const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/update/*', (req, res) => {
    const id = req.params[0]
    const [team, action] = id.split('-')

    console.log(team, action)
    res.send('ok')
    const state = JSON.parse(fs.readFileSync('public/state.json', 'utf-8'))
    
    state[team+'Score'] = parseInt(state[team+'Score']) + (action === 'add' ? 1 : -1)

    fs.writeFileSync('public/state.json', JSON.stringify(state))

    console.log(state)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))