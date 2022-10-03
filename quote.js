const { randomUUID } = require("crypto");
const db = require("./../config/db");

module.exports = (app) => {
    app.post('/quotes', (req, res) => {
        const { quote, author } = req.body;
        const uid = randomUUID()

        const query = "INSERT INTO `quote` (`uid`, `quote`, `author`) VALUES (?,?,?)"
        return db.query(query, [uid, quote, author], (error) => {
            if (error) {
                console.error(error);
                return res.status(500).send({
                    error: 'true',
                    message: 'Erro interno do servidor',
                    code: '500'
                })
            } else {
                res.status(200).send({
                    error: 'false',
                    message: 'quote send on successfull',
                    uid: uid
                })
            }
        })
    })

    app.get('/all', (req, res) => {
        const query = `SELECT * FROM quote`

        db.query(query, (error, data) => {
            if (error) {
                console.error(error);
                res.status(500).send({
                    error: 'true',
                    message: 'Erro interno do servidor',
                    code: '500'
                })
            } else if (data.length <= 0) {
                res.status(200).send({
                    error: 'false',
                    message: 'ok',
                    data: "Sem dados para mostar"
                })
            } else {
                res.status(200).send({
                    error: 'false',
                    message: 'ok',
                    data: data
                })
            }
        })
    })

    app.delete('/all/:uid', (req, res) => {
        const { uid } = req.params;

        const query = "DELETE FROM `quote` WHERE uid = (?)"

        db.query(query, [uid], (error) => {
            if (error) {
                console.error(error);
                return res.status(500).send({
                    error: 'true',
                    message: 'Erro ao eliminar a citação',
                    code: '500'
                })
            } else {
                res.status(200).send({
                    error: 'false',
                    message: 'Quote deleted in successfull',
                    code: '200'
                })
            }
        })
    })

    // app.put('/all/:uid', (req, res) => {
    //     const { quote, author } = req.body;

    //     const query = `UPDATE 'quote' SET 'quote'=(${quote}),'author'=('?') WHERE uid = uid`

    //     return db.query(query, [quote, author], (error) => {
    //         if (error) {
    //             console.error(error);
    //             return res.status(500).send({
    //                 error: 'true',
    //                 message: 'Erro ao eliminar a citação',
    //                 code: '500'
    //             })
    //         } else {
    //             res.status(200).send({
    //                 error: 'false',
    //                 message: 'Quote deleted in successfull',
    //                 code: '200'
    //             })
    //         }
    //     })
    // })
}