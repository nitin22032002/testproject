const socket=io()
const textarea=document.getElementById("main-box")

const isChange=true
const handleChange=(e)=>{
    let val=e.target.value
    socket.emit("changecontent",{data:val})
}

socket.on("setContent",(data)=>{
    textarea.value=data
})
textarea.addEventListener("keyup",handleChange)
username=prompt("Enter Your Name")

socket.emit("adduser",({name:username}))

