import express from "express"
import {promises as fs} from "fs"

const PORT = 3_000

const app = express()


const title = {projectTitle: "Exam"}

const admin = JSON.parse(await fs.readFile("./admin.json", "utf8"))
const table = JSON.parse(await fs.readFile("./table.json", "utf8"))

app.use("/js", express.static("js"))
app.use("/img", express.static("img"))
app.use("/css", express.static("css"))
app.use("/libs", express.static("libs"))
app.use("/fonts", express.static("fonts"))

app.set("view engine", "ejs")
app.set("views", "./src/views")

app.get("/", (req,res)=>{
    res.render("index", {title, admin})
})

app.get("/index.html", (req,res)=>{
    res.render("index", {title, admin})
})



app.get("/login.html", (req,res)=>{
    res.render("login", {title})
})
app.get("/profile.html", (req,res)=>{
    res.render("profile", {title, admin})
})
app.get("/reset.html", (req,res)=>{
    res.render("reset", {title})
})
app.get("/signup.html", (req,res)=>{
    res.render("signup", {title})
})

// table with ejs
app.get("/tables.html", (req,res)=>{
    res.render("tables", {title, admin, table})
})

app.use((req,res,next)=>{
    res.render("error", {title})
})

app.listen(PORT)


