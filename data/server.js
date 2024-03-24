import express from "express"
import productsManager from "./fs/ProductsManager.fs.js"
//server
const server = express()
const port = 8080
const ready = ()=> console.log("server ready on port "+port)
server.listen(port, ready)

//middlewares
server.use(express.urlencoded({ extended: true}))

//router

server.get("/",async(requerimientos, respuesta)=>{
    try{
        return respuesta.status(200).json({
            response: "Coder Api",
            success: true
        })
    } catch (error){
        console.log(error)
        return respuesta.status(500).json({
            response: "Coder Api Error",
            success: false
        })
    }
})

// create a product
server.get("/api/products/:photo/:title/:category/:price/:stock",async(req,res)=>{
    try {
        const { photo, title, category, price, stock } = req.params
        const data = { photo, title, category, price, stock}
        const created = await productsManager.create(data)
        return res.status(201).json({
            response: created,
            success: true
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            response: "error",
            success: false
        })
    }
})

//read all products
/*
server.get("/api/products", async(req, res)=>{
    try {
        const all = await productsManager.read()
        return res.status(200).json({
            response:all,
            success: true
        })
        } catch (error) {
            return res.status(500).json({
                response: "error",
                success: false
        })
    }
})
*/
// Filter by category
server.get("/api/products", async(req, res)=>{
    try {
        const { category } = req.query
        const all = await productsManager.read(category)
        if (all){
            return res.status(200).json({
                response:all,
                category,
                success: true
            })
        } else {
            const error = new Error("Not Found")
            error.statusCode = 404
            throw error
        }

        } catch (error) {
            return res.status(error.status).json({
                response: error.message,
                success: false
        })
    }
})
/*
server.get("/api/products", async(req, res)=>{
    try {
        const { id } = req.query
        const all = await productsManager.readOne(id)
        return res.status(200).json({
            response: all,
            id,
            success: true
        })
        } catch (error) {
            return res.status(404).json({
                response: "error al buscar id",
                success: false
        })
    }
})
*/