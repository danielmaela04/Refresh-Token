module.exports = (app) => {
    app.get("/", (req, res) => {
        res.status(200).send({
            error: "false",
            message: "No body returned",
            code: "200"
        })
    })

    app.get("/*", (req, res) => {
        res.status(404).send({
            error: "true",
            message: "Page not found",
            code: "404"
        })
    })
}