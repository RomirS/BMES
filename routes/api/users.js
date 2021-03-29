const router = require('express').Router();
const bcrypt = require('bcryptjs');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const auth = require('../../middleware/auth');
let User = require('../../models/User');

router.get('/', auth, (req, res) => {
    User.findById(req.user.id).select('id first last netid hours events isAdmin').then(user => {
        res.json(user);
    });
});

router.get('/all', auth, (req, res) => {
    User.findById(req.user.id).select('isAdmin').then(user => {
        if (user.isAdmin) {
            User.find().select('first last netid hours events').then(users => {
                return res.json(users);
            });
        }
        return res.status(401).json('Unauthorized request');
    });
});

router.post('/', (req,res) => {
  const { first, last, netid, password } = req.body;

  if(!first || !last || !netid || !password) return res.status(400).json('Please enter all fields');

  User.findOne({ netid }).then(user => {
      if(user) return res.status(400).json('User already exists');

      const newUser = new User({
        first,
        last,
        netid,
        password,
        username: uuidv4()
      });

      bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
              if(err) throw err;
              newUser.password = hash;
              newUser.save().then(user => {

                  jwt.sign(
                      {id: user.id},
                      process.env.JWT_SECRET,
                      null,
                      (err, token) => {
                          if(err) throw err;
                          res.json({
                              token,
                              user: {
                                  id: user.id,
                                  netid: user.netid,
                                  first: user.first,
                                  last: user.last,
                                  hours: user.hours,
                                  events: user.events
                              }
                          });
                      }
                  );
              });
          });
      });
  });
});

module.exports = router;