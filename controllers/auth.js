const {response} = require('express');
const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');


const createUser = async (req, res = response) => {

    const {email, password} = req.body;
    try{
        const user = await User.findOne({email: email});
        console.log({user});
        if(user){
            return res.status(400).json({
                ok: false,
                msg: "Email already registered",
            })
        }
        const newUser = new User(req.body);

        // encrypt
        const salt = bcrypt.genSaltSync();
        newUser.password = bcrypt.hashSync(password,salt)
    await  newUser.save();

    //JWT
    const token = await generateJWT(user.id, user.name);
    
    res.status(201).json({
        ok: true,
        msg: 'registro',
        token
    })
}catch(e){
    res.status(500).json({
        ok:false,
        msg: "something went wrong"
    })
}
}

const login = async (req, res = response) =>{

    const {email, password} = req.body;
    const user = await User.findOne({email: email});
    console.log({user});
    if(!user){
        return res.status(400).json({
            ok: false,
            msg: "Email doesn't exist",
        })
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if(!validPassword){
        return res.status(400).json({
            ok: false,
            msg: "wrong password",
        });
    }
    const token = await generateJWT(user.id, user.name);


    return res.json({
        ok: true,
        msg: "Success",
        token,
    })
}

const renewToken = async (req, res = response) => {

 
    const {uid, name} = req;
    
    const token = await generateJWT(uid, name);

    res.json({
        ok: true,
        token: token,
    })
}
module.exports = {
    createUser,
    login,
    renewToken
};
