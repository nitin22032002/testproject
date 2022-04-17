const express=require("express")
const http=require("http")
const app=express()
const path=require("path")
const server=http.createServer(app)
const {Server}=require("socket.io")
const { checkAuth } = require("./middleware/checkAuth")
const io=new Server(server)
app.use(express.json())

app.use("/public",checkAuth,express.static(path.join(__dirname,"public")))
let users=[]
let currentData={data:""}
io.on("connection",(socket)=>{
    socket.on("adduser",(user)=>{
        users.push({"socket":socket,username:user.name})
        users.map((item)=>{
            item.socket.emit("setContent",currentData.data)
        })
    })
    socket.on("changecontent",(data)=>{
        currentData.data=data.data
        users.map((item)=>{
            item.socket.emit("setContent",currentData.data)
        })
    })
    socket.on("disconnect",()=>{
        console.log("Disconnect")
        users=users.filter((item)=>{
            return item.socket.id!==socket.id
        })
        // console.log(users)
        
    })
})

app.use("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"public/test.html"))
})
 
server.listen(process.env.PORT?process.env.PORT:3000,()=>{
    console.log("Server Listining at http://localhost:3000")
})