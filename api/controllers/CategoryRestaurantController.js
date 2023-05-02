/**
 * CategoryRestaurantController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
  
    addCategory: async function(req, res){
        let categoryName=req.body.category_name;
        // let itemId=req.body.category;

        CategoryRestaurant.find({category_name:categoryName}).then((result)=>{
            if(result.length >=1 ){
                return res.status(409).json({
                    message:'Category Already Exist!!'
                });
            }else{
                CategoryRestaurant.create({category_name:categoryName}).fetch().then((result)=>{
                    console.log(result)
                    return res.status(200).json({
                        message:result,
                    })
                }).catch((err)=>{
                    return res.status(500).json({
                        message:err,
                    })
                })
            }
        })
    },

    getCategory: function(req, res){
        CategoryRestaurant.find({}).then((result)=>{
            if(result.length < 1 ){
                return res.status(500).json({
                    message: 'Categories is empty'
                });
            }else{
                return res.status(200).json({
                    data:result
                })
            }
        })
    },

    deleteCategory : function(req,res){
        let cid=req.params.id;

        CategoryRestaurant.find({_id:cid}).then((result)=>{
            if(result.length<1){
                return res.status(500).json({
                    message:'Category Does Not Exist!!'
                });
            }else{
                CategoryRestaurant.destroy({_id:cid}).fetch().then((result)=>{
                    return res.status(200).json({
                        message:result
                    })
                }).catch((err)=>{
                    return res.status(500).json({
                        message:err
                    });
                })
            }
        })
    },

    updateCategory : function(req,res){
        let cid=req.params.id;
        let categoryName=req.body.category_name;

        CategoryRestaurant.find({_id:cid}).then((result)=>{
            if(result.length<1){
                return res.status(500).json({
                    message:'Category Does Not Exist!!'
                });
            }else{
                CategoryRestaurant.update({_id:cid}).set({category_name:categoryName}).fetch().then((result)=>{
                    return res.status(200).json({
                        message:result
                    })
                }).catch((err)=>{
                    return res.status(500).json({
                        message:err
                    });
                })
            }
        })
    }

};

