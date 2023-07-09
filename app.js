const express = require("express")
const { engine } = require("express-handlebars")
const { Configuration, OpenAIApi} = require("openai")
const config = require("config")

const app = express()
const configuration = new Configuration({
    apiKey: config.get("OPENAI_KEY")
}) 
const openai = new OpenAIApi(configuration)

app.engine("handlebars", engine())
app.set("view engine", "handlebars")

app.use(express.urlencoded({extended: true}))


app.get("/", (req, res) => {
    res.render("index")
})

app.post("/", async (req, res) => {
    const { prompt, number, size } = req.body

    try {
        const response = await openai.createImage({
            prompt,
            n: Number(number),
            size
        })
        console.log(response.data.data)
        res.render("index",{
            images: response.data.data
        })
        
    } catch (err) {
        console.log(err)
        res.render("index", {
            err: "Error with query"
        })
    }
})

app.listen(5000, () => console.log("Running on PORT: 5000"))