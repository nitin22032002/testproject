const checkAuth=(req,res,next)=>{
    let isValid=true;
    if(isValid){
       next()
    }
    else{
        return res.status(401).json({status:false})
    }
}

module.exports={checkAuth}