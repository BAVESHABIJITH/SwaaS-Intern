const bcrypt = require("bcrypt");
const prisma = require("../config/prisma");
const{generateAccessToken,generateRefreshToken,verifyToken} = require("../utils/token.utils");
// const { use } = require("react"); 
const register = async (req,res)=>{
    
    try {
        const{name,email,password,role
        } = req.body;
        
    const existingUser = await prisma.user.findUnique
    ({where:{email}});
    if(existingUser){
        return res.status(400).json({
            success:false,
            message:"User already exists"
        })
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const user = await prisma.user.create({
        data:{name,email,password:hashedPassword,role},
        select:{id:true,name:true,email:true,role:true,createdAt:true
        }
    })
    const payload = {
        id:user.id,
        name:user.name,
        email:user.email,
        role: user.role,
        createdAt:user.createdAt,
    }
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    res.status(200).json({
        success:true,
        message:"User registered successfully",
        accessToken,
        refreshToken,
        user
    })
}
catch(error){
    console.error('register error',error);
    res.status(500).json({
        success:false,
        message:"Internal Server Error"
    })
}
}

const login = async (req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await prisma.user.findUnique({where:{email}});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }
        const isMatch= await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"Invalid password"
            })
        }
        const payload = {
            id:user.id,
            name:user.name,
            email:user.email,
            role: user.role,
            createdAt:user.createdAt,
        }
        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);
        res.status(200).json({
            success:true,
            message:"User logged in successfully",
            accessToken,
            refreshToken,
            user
        })
    }
    catch(error){
        console.error('login error',error);
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

const refreshToken = async (req,res)=>{
    try {
        const {refreshToken:Token} = req.body;
        console.log(Token);
        if(!Token){
            return res.status(400).json({
                success:false,
                message:"Refresh token is required"
            })
        }
        let decoded;
        try {
            decoded = verifyToken(Token,process.env.REFRESH_TOKEN_SECRET);
        } catch (err) {
            return res.status(401).json({
                success:false,
                message:"Invalid refresh token"
            })
        }
        const newAccessToken = generateAccessToken({id:decoded.id,name:decoded.name,email:decoded.email});
        res.status(200).json({
            success:true,
            message:"Refresh token generated successfully",
            accessToken:newAccessToken,
        })
    }
    catch(error){
        console.error('refreshToken error',error);
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

const getMe = async (req,res)=>{
    try {
        const user = await prisma.user.findUnique({where:{id:req.user.id},
            select:{id:true,name:true,email:true, role:true, createdAt:true}});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }
        res.status(200).json({
            success:true,
            message:"User fetched successfully",
            user
        })
    }
    catch(error){
        console.error('getMe error',error);
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}
module.exports = {register,login,refreshToken,getMe};