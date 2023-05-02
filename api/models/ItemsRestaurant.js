/**
 * ItemsRestaurant.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    item_name:{
      type:'string',
      required:true
    },
    description:{
      type:'string'
    },
    price:{
      type:'number',
      required:true

    },
    image:{
      type:'string'
    },
    displayOrder:{
      type:'number',
      required:true
    },



    category: {
      model: 'CategoryRestaurant'
    }


  },   

};

