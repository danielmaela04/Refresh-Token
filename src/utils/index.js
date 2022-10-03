const { randomUUID } = require("crypto");
const db = require("./../config/db");

module.exports = (app) => {
    app.get("/users", (req, res) => {
        const query = `SELECT * FROM userdata`;

    db.query(query, (error, data) => {
            if (error) {
                res.status(500).send({
                    error: "true",
                    message: "Erro ao buscar os dados",
                    code: "500"
                })
                console.error(error)
            } else if(data.length <= 0) {
                res.status(200).send({
                    error: "false",
                    message: "Nenhum usuario encotrado",
                    code: "200"
                })
            } else {
                res.status(200).send({
                    error: "false",
                    message: "ok",
                    data: data
                })
            }
        })
    })
}