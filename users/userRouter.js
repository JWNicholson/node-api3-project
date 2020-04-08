const express = require('express');
const userDB  = require('userDB.js');
const postDB = require('../posts/postDb');

const router = express.Router();

router.post('/', validateUser,(req, res) => {
  // do your magic!
  userDB.insert(req.body)
    .then(user => {
      res.status(200).json(user);
    })
      .catch(err => {
        res.status(500).json({message: "User could not be added"});
      });
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  postDB.insert({...req.body, user_id: req.params.id})
    .then(post => {
      res.status(201).json(post);
    })
      .catch(err => {
        console.log(err);
        res.status(500).json({errorMessage: "Could not create post"});
      });
});


////////////////// GET /////////////////////
router.get('/', (req, res) => {
  // do your magic!
  userDB.get()
    .then(users => {
      res.status(200).json(users);
    })
      .catch(err => {
        console.log(err)
        res.status(500).json({errorMessage:"Could not retrieve user list."})
      });
});

router.get('/:id',validateUserId, (req, res) => {
  // do your magic!
  const id = req.params.id;

  userDB.getById(id)
    .then(user =>{
      res.status(200).json(user);
    })
      .catch(err => {
        res.status(500).json({message: "Could not retrieve that user."});
      });
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
  const id = req.params.id;

  userDB.getUserPosts(id)
    .then(posts => {
      res.status(200).json(posts);
    })
      .catch(err => {
        res.status(500).json({message: "Could not retrieve any posts for that user."});
      });
});
//////////////////////////////////////////


router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  const id = req.params.id;

  userDB.remove(id)
    .then(deletedUser => {
      if(deletedUser === 1) {
        res.status(200).json({message: `User with ID of ${id} is now gone forever.`})
      }else{
        res.status(500).json({message: "Error - could not delete user."})
      }
    })
      res.status(500).json({message:"Server could not delete user." })

});

router.put('/:id',validateUser, validateUserId, (req, res) => {
  // do your magic!
  const id = req.params.id
  
  userDB.update(id, req.body)
  .then(updateUser => {
    userDB.getById(id)
        .then(user => {
          if (updateUser === 1){ 
            res.status(200).json(user);
          } else {
            res.status(500).json({ message: "Could not update user."});
            }
          })
            .catch(err => {
            res.status(500).json({ message: "Error while trying to modify the user in the database.", err})
          });
    })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
 const id = req.params.id;
 console.log(id);
 userDB.getById(id)
  .then(user => {
    if(user){
      req.user = user;

      next();
    }else{
      res.status(400).json({error: "Invalid user id."});
    }
  })
    .catch(error => {
      console.log(error);
      res.status(500).json({error:"Server could not validate user id."});
    })
}

function validateUser(req, res, next) {
  // do your magic!
  if(req.body){
    if(req.body.name){
      next();
    }else{
      res.status(400).json({message: "Missing requred name filed."});
    }
  }else{
    res.status(400).json({message: "Missing user data"});
  }
}

function validatePost(req, res, next) {
  // do your magic!
  if(req.body){
    if(req.body.text){
      next();
    }else{
      res.status(400).json({message: "Missing required text field"});
    }
  }else{
    res.status(400).json({message: "Missing post data."});
  }
}

module.exports = router;
