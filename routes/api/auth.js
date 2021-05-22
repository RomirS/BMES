const router = require('express').Router();
const bcrypt = require('bcryptjs');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const User = require('../../models/User');

router.post('/', (req,res) => {
  const { netid, password } = req.body;

  if(!netid || !password) return res.status(400).json({msg: 'Please enter all fields'});

  User.findOne({netid}).then(user => {
    if(!user) return res.status(401).json({
      confirm: true,
      msg: 'Oops! This is a message letting you know this is your first time signing in with this Net ID. Enter your name and hit submit again. You will not see this message in the future.'
    });

    bcrypt.compare(password, user.password).then(isMatch => {
      if(!isMatch) return res.status(400).json({msg: 'Invalid credentials'});

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
              events: user.events,
              isAdmin: user.isAdmin
            }
          });
        }
      );
    })
  });
});

module.exports = router;