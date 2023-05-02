/**
 * ItemsRestaurantController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

// const ItemsRestaurant = require("../models/ItemsRestaurant");

module.exports = {
    

   
    addItem: async function(req, res){
        let itemName=req.body.item_name;
        let description=req.body.description;
        let price=req.body.price;
        let image=req.body.image;
        let displayOrder=req.body.displayOrder;
        let category= req.body.category
        let fileDest;
        let uploadFile = req.file('image');

        uploadFile.upload({ dirname: __dirname + '/../../upload' }, function onUploadComplete(err, files) {
          if (err) return res.serverError(err);
          console.log(files);
          fileDest=files.pop()['fd'];

          ItemsRestaurant.create({
            item_name:itemName,
            description:description,
            price:price,
            displayOrder:displayOrder,
            category: category,
            image:fileDest
        }).fetch()
        .then((result)=>{
            return res.status(200).json({
                message:result,
            })
        }).catch((err)=>{
            return res.status(500).json({
                message:err,
            })
        })

        });
        
            
    },

    getItems: function(req, res){
        ItemsRestaurant.find({}).populate('category').then((result)=>{
            return res.status(200).json({
                message:result
            })
        }).catch((err)=>{
            return res.status(500).json({
                message:err,
            })
        });
    },

    deleteItem: function(req, res){
        let iid=req.params.id;
        ItemsRestaurant.destroy({_id:iid}).fetch().then((result)=>{
            return res.status(200).json({
                message:result
            })
        }).catch((err)=>{
            return res.status(500).json({
                message:err,
            })
        });
    },
    updateItem: async function(req, res){
        let iid=req.params.id;
        let itemName=req.body.item_name;
        let description=req.body.description;
        let price=req.body.price;
        let image=req.body.image;
        let displayOrder=req.body.displayOrder;
        let category= req.body.category

           
        ItemsRestaurant.update({_id:iid}).set({
            item_name:itemName,
            description:description,
            price:price,
            displayOrder:displayOrder,
            category: category,
        }).fetch()
        .then((result)=>{
            return res.status(200).json({
                message:result,
            })
        }).catch((err)=>{
            return res.status(500).json({
                message:err,
            })
        });
            
    },

};

