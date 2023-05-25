const express = require("express")
const app = express()
const PORT=process.env.PORT || 5000

require("./db/config")
const User = require("./models/regModel")
const Product = require("./models/productModel")
const AddToCard=require("./models/addToCard")
app.use(express.json())

const cors = require("cors")
app.use(cors())


//get api for products ("http://localhost:5000/products")
app.get("/products", async (r, s) => {
    let products = await Product.find()
    if (products.length > 0) {
        s.send(products)
    } else {
        s.send({ result: "No Product found" })
    }
})

// post api for products ("http://localhost:5000/products")
app.post("/products", async (r, s) => {
    const product = new Product(r.body)
    const result = await product.save()
    s.send(result)
})

// delete api for products ("http://localhost:5000/products/:id")
app.delete("/products/:id", async (r, s) => {
    const result = await Product.deleteOne({ _id: r.params.id })
    s.send(result)
})

// get api for products using id ("http://localhost:5000/products/:id")
app.get("/products/:id", async (r, s) => {
    let result = await Product.findOne({ _id: r.params.id })
    if (result) {
        s.send(result)
    } else {
        s.send({ result: "no record found" })
    }
})

// update api for products ("http://localhost:5000/products/:id")
app.put("/products/:id", async (r, s) => {
    let result = await Product.updateOne({ _id: r.params.id }, { $set: r.body })
    s.send(result)
})

//search api 
app.get("/search/:key", async (r, s) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: r.params.key } },
            { company: { $regex: r.params.key } },
            // { prize: { $regex: r.params.key } }
            { model: { $regex: r.params.key } }
        ]
    })
    s.send(result)
})

// post api for register ("http://localhost:5000/reg")
app.post("/reg", async (r, s) => {
    const user = new User(r.body)
    const result = await user.save()
    s.send(result)
})

// compare api for register ("http://localhost:5000/login")
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

//initial api ("http://localhost:5000/")
app.get("/", (r, s) => {
    s.send("my node working now... ")
})

app.listen(PORT)