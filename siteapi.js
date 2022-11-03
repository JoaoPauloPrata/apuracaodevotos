const DatabaseConnector = require('./DatabaseConnector')
const express = require('express')
const app = express();
const cors = require('cors')
app.use(cors())

async function main() {
    var dbContex = new DatabaseConnector();
    app.get('/apuracao', async (req, res) => {
        var results = dbContex.getApuracao()
        results.then(result => { res.send(result[0][0]) })
    })

    app.listen(5000, () =>
        console.log(`Example app listening on port ${5000}!`),
    );
}
main()