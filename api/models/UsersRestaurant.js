/**
 * UsersRestaurant.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

   email:{
    type:'string',
    required:true
   },
   password:{
    type:'string',
    required:true
   },
   role:{
    type:'string',
    defaultsTo:'user'
   },
   
  },

};

