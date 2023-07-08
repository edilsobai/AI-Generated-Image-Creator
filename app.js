const express = require("express")
const { engine } = require("express-handlebars")
const openai = require("openai")
const config = require("config")

const app = express()

const configuration = new openai.Configuration({
    apiKey: config.get("OPENAI_KEY")
}) 

app.engine("handlebars", engine())
app.set("view engine", "handlebars")

app.use(express.urlencoded({extended: true}))


app.get("/", (req, res) => {
    res.render("index")
})

app.post("/", (req, res) => {
    const { prompt, number, size } = req.body
    console.log(prompt,number,size)
    res.render("index")
})

app.listen(5000, () => console.log("Running on PORT: 5000"))