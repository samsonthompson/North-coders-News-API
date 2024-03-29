const fs = require('fs/promises')


const fetchApiJSON = () => {
        return fs.readFile(`endpoints.json`, 'utf-8')
        .then((data) => {
            return JSON.parse(data)
        })
    }
    

module.exports = { fetchApiJSON }