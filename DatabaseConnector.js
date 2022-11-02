class DatabaseConnector {
    constructor() {
        this.mySQL = require('mysql2');
        this.con = this.mySQL.createConnection({ host: "54.39.202.210", user: "programa", password: "c63oC3I]L+5woZ" });
        this.con.connect(function (err) {
            if (err) throw err;
            console.log("Connected!");
        });
    }

    insertInResults(candidato1, candidato2, nulos, brancos) {
        var query = `INSERT INTO  programa_trab.votacao (candidato1, candidato2, nulos, brancos) VALUES (${candidato1}, ${candidato2},${nulos},${brancos})`;
        this.con.query(query, function (err, result) {
            if (err) throw err;
        })
    }
}
module.exports = DatabaseConnector;