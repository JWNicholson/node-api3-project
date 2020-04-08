const express = require('express');
const userDB  = require('userDB.js');

const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});


////////////////// GET /////////////////////
router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});
//////////////////////////////////////////


router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
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
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
