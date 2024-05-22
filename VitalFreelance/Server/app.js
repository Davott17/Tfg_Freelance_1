const express = require("express");
const fileUpload = require('express-fileupload');

const {Server} = require("ws");
const http = require("http")

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Crear servidor
const servidor = http.createServer(app);
const wss = new Server({servidor, port:3878});
const clientes = new Set();
wss.on("connection", (ws)=>{
    clientes.add(ws);
    

    ws.on("close", ()=>{
        clientes.delete(ws);
    })
    ws.onmessage = (mensaje) => {
        console.log(mensaje.data)
    }
})
const broadcast = (mensaje) => {
    for (const cliente of clientes){
        if(cliente.readyState == WebSocket.OPEN){
        cliente.send(mensaje);
    }
    }
}
// app.get("/", async (req,res)=>{
//     broadcast("Cliente conectado al index");
// })

// Cargar rutas
const user_routes = require("./routes/user")
const cors = require("cors");
// Rutas base
app.use(cors());
app.use(fileUpload({
    tempFileDir: '/temp'
}))
app.use("/api", user_routes);


module.exports = app;
