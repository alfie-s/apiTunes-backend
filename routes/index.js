const express = require('express');
// create new router objects
const router = express.Router();
// Create an empty for favourite objects
let favourites = [];
// function for the GET
getFavouritesHandler = (req, res) => {
   // if no items in array
   if (favourites.length === 0) {
      //send this message
      res.send({
         message: "You have no favourites to display"
      })
   } else {
      // send favorites if there is an item in array
      res.send({
         favourites
      })
   }
}
// display items in the favorites
router.get('/', getFavouritesHandler)
// function for the POST
postFavouritesHandler = (req, res) => {
   // create unique id using date now
   const id = Date.now();
   //create a new item
   newItem = Object.assign(req.body);
   // push item to array
   favourites.push(newItem);
   // success message
   return res.send({
      message: 'Item added successfully',
      favourites
   });
}
// add item using POST
router.post('/add', postFavouritesHandler)
// function for delete from favourites
deleteFavouritesHandler = (req, res) => {
   // find id in api url
   const id = Number(req.params.id);
   // loop and splice to delete from array
   for (let i = 0; i < favourites.length; i++) {
      if (favourites[i].id === id) {
         favourites.splice(i, 1);
      };
   };
   // display message with id in repsonse
   res.send({
      message: `Item with id ${id} has been deleted`,
      favourites
   });
}
// DELETE to delete from favourites
router.delete('/delete/:id', deleteFavouritesHandler);
// export modules
module.exports = router;