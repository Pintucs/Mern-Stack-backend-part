const express = require("express")
const app = express()

require("./db/config")
const User = require("./models/regModel")
app.use(express.json())

const cors = require("cors")
app.use(cors())

// post api for register ("http://localhost:5000/reg")
app.post("/reg", async (r, s) => {
    const user = new User(r.body)
    const result = await user.save()
    s.send(result)
})

// post api for register ("http://localhost:5000/login")
app.post("/login", async (r, s) => {
    
    if (r.body.email && r.body.password) {
        
        let user = await User.findOne(r.body).select("-password")
        if (user) {
            s.send(user)
        } else {
            s.send({ result: "user not found" })
        }
    } else {
        s.send({ result: "email or password not found" })
    }
})

app.get("/", (r, s) => {
    s.send("my node working now... ")
})


app.listen(5000)
