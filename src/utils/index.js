const { randomUUID } = require("crypto");
const db = require("./../config/db");

module.exports = (app) => {

    app.post("/newUser", (req, res) => {
        const { name, email, password } = req.body
        const uid = randomUUID();

        const query = "INSERT INTO `userdata` (`uid`, `name`, `email`, `password`) VALUES (?,?,?,?)"

        db.query(query, [uid, name, email, password], (error) => {
            if(error){
                console.error(error)
                return res.status(500).send({
                    error: "true",
                    message: "Erro ao adicionar o usuario",
                    code: "500"
                })
            } else {
                return res.status(200).send({
                    error: "false",
                    message: "Usuario cadastrado com sucesso",
                    uid: uid
                })
            }
        })
    })

    // app.get("/users", (req, res) => {
    //     const query = `SELECT * FROM userdata`;

    //     db.query(query, (error, data) => {
    //         if (error) {
    //             res.status(500).send({
    //                 error: "true",
    //                 message: "Erro ao buscar os dados",
    //                 code: "500"
    //             })
    //             console.error(error)
    //         } else if (data.length <= 0) {
    //             res.status(200).send({
    //                 error: "false",
    //                 message: "Nenhum usuario encotrado",
    //                 code: "200"
    //             })
    //         } else {
    //             res.status(200).send({
    //                 error: "false",
    //                 message: "ok",
    //                 data: data
    //             })
    //         }
    //     })
    // })
}