var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();

/* GET create page */
router.get('/', (req, res, next) => {
    res.render('create', { title: 'Create' });
});

router.post('/', (req, res, next) => {
    console.log("Adding blog to table without sanitizing input! YOLO BABY!!");
    var db = new sqlite3.Database('mydb.sqlite3',
      sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
      (err) => {
        if (err) {
          console.log("Getting error " + err);
          exit(1);
        }
        console.log("inserting " + req.body.blog);
        //NOTE: This is dangerous! you need to sanitize input from the user
        //this is ripe for a exploit! DO NOT use this in production :)
        //Try and figure out how why this is unsafe and how to fix it.
        //HINT: the answer is in the XKCD comic on the home page little bobby tables :)
        db.run("INSERT INTO blog (blog_txt) VALUES (?)", [req.body.blog]);
        //redirect to homepage
        res.redirect('/');
      }
    );
  });

module.exports = router;