const express = require("express");

const userDB = require("./userDb.js");

const postDB = require("../posts/postDb");

const router = express.Router();

router.post("/", validateUser, (req, res) => {
  userDB.insert(req.body)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ message: "User could not be added." });
    });
});

router.post("/:id/posts", validatePost, validateUserId, (req, res) => {
  // do your magic!
  postDB.insert({ ...req.body, user_id: req.params.id })
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Could not create post." });
    });
});

//GET /////////////////////////////

router.get("/", (req, res) => {
  // do your magic!
  postDB.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Could not get the user list." });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  // do your magic!
  req.user ? res.status(200).json(req.user): res.status(500).json({
        message: "Could not retrieve that user."
      });
});

router.get("/:id/posts", (req, res) => {
  // do your magic!
  userDB.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Could not get that users posts" });
    });
});

/////////////////////////////////////////

router.put('/:id', validateUserId, validateUser, (req, res) => {
  const id = req.params.id
  
  userDB.update(id, req.body)
  .then(userUpdate => {
    userDB.getById(id)
        .then(user => {
          if (userUpdate === 1){ 
            res.status(200).json(user)
          }else{
            res.status(417).json({ message: "Something went wrong - user was not updated."})
            }
          })
          .catch(err => {
            res.status(500).json({ message: "Server error while trying to update the user.", err})
          })
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  // do your magic!
  userDB.remove(req.params.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Error trying to delete the user." });
    });
});


//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  userDB.getById(req.params.id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({ message: "invalid user id" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "There was an error" });
    });
}

function validateUser(req, res, next) {
  if (req.body) {
    if (req.body.name) {
      next();
    } else {
      res.status(400).json({ message: "Missing name" });
    }
  } else {
    res.status(400).json({ message: "Missing user data" });
  }
}
function validatePost(req, res, next) {
  if (req.body) {
    if (req.body.text) {
      next();
    } else {
      res.status(400).json({ message: "Missing required text field" });
    }
  } else {
    res.status(400).json({ message: "Missing post data" });
  }
}

module.exports = router;