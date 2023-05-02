/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */


module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },   
  'POST /user/signup': 'UsersRestaurantController.signup',
  'POST /user/login': 'UsersRestaurantController.login',
  'GET /user/logout': 'UsersRestaurantController.logout',
  //***********************************************************************************************************//

  //Category routes

  'POST /admin/addCategory': 'CategoryRestaurantController.addCategory',
  'PUT /admin/updateCategory/:id': 'CategoryRestaurantController.updateCategory',
  'DELETE /admin/deleteCategory/:id': 'CategoryRestaurantController.deleteCategory',
  'GET /admin/getCategory':'CategoryRestaurantController.getCategory',
  
  //***********************************************************************************************************//

  //Items routes
  'POST /admin/addItem' : 'ItemsRestaurantController.addItem',
  'GET /admin/getItems' : 'ItemsRestaurantController.getItems',
  'DELETE /admin/deleteItem/:id' : 'ItemsRestaurantController.deleteItem',
  'PUT /admin/updateItem/:id' : 'ItemsRestaurantController.updateItem',
  
  'GET /user/getItems' : 'UsersRestaurantController.getItems',






  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/

};
