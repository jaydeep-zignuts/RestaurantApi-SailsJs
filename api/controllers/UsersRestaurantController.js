/**
 * UsersRestaurantController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

// const UsersRestaurant = require("../models/UsersRestaurant");
const bcrypt = require("bcrypt");
const { log } = require("grunt");
const jwt = require('jsonwebtoken');

module.exports = {
    //---------------------------------------------------------
   
      
    //---------------------------------------------------------
    signup: async function (req, res) {
        let email = req.body.email;
        let password = req.body.password;
        let role = req.body.role;

        UsersRestaurant.find({ email: email })
            .then((result) => {
                if (result.length >= 1) {
                    return res.status(409).json({
                        message: "User Already exist",
                    });
                } else {  
                    bcrypt.hash(password, 10, (err, hash) => {
                        if (err) {
                            return res.status(500).json({
                                error: err,
                            });
                        } else {
                            UsersRestaurant.create({
                                email: email,
                                password: hash,
                                role: role,
                            })
                            .fetch()
                            .then((result) => {
                                return res.status(200).json({
                                    data: result,
                                });
                            })
                         .catch((err) => {
                                return res.status(500).json({
                                    error: err,
                                });
                            });
                        }
                    });
                }
            })
            .catch((err) => {
                return res.status(500).json({
                    error: err,
                });
            });
    },
    login:async function(req,res){

        let email = req.body.email;
        let password = req.body.password;
        // let role = req.body.role;
        console.log("rghkjhgj");
        console.log(email,password);
        UsersRestaurant.find({email:email}).then((user)=>{
            if(user < 1 ){
                return res.status(401).json({
                    message:"Please Register Your Self"
                });
            }
            bcrypt.compare(password,user[0].password, (err, result) => {
                if(err){
                    return res.status(401).json({
                        message:"Auth Failed"
                    });
                }
                if(result){
                    const token=jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id,
                        role: user[0].role,
                    },
                    'secret',
                    {
                        expiresIn:'1d'
                    });
                    res.cookie('token',token,{ maxAge: 900000 })
                    return res.status(200).json({
                        message: "Login success",
                        token:token
                    });
                    
                }
                res.status(401).json({
                    message: "Auth Failed",
                });

            });
        }).catch((err)=>{
            res.status(500).json({
                error: err,
            });   
        })
    },
    logout:function(req,res){
        res.clearCookie('token');
        // console.log(req.headers.authorization);
        req.headers.authorization="";
        return res.status(200).json({
            message:'logged out '
        })
    },

    getItems:function(req, res){
        CategoryRestaurant.find({}).populate('items',{ sort : {'displayOrder':1}}).then((result)=>{
            if(result<1){
                return res.status(500).json({
                    message: "0 Items Exists"
                })
            }else{
                console.log(result);
                return res.status(200).json({
                        items: result,
                    data: result.map(function(cnt){
                        console.log(cnt);
                        cnt.totalItems = cnt.items.length
                        // cnt.sort({'displayOrder':1})
                        return cnt
                    })
                    

                });
            }
        }).catch((err)=>{
            return res.status(500).json({
                message: "Erro While Fetching Items "
            })
        })
    }
};
