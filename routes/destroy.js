var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();

router.get('/', (req, res, next) => {
    res.render('destroy', { title: 'Destroy' });
});

router.post('/', (req, res, next) => {
    console.log("deleting stuff without checking if it is valid! SEND IT!");
    var db = new sqlite3.Database('mydb.sqlite3',
      sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
      (err) => {
        if (err) {
          console.log("Getting error " + err);
          exit(1);
        }
        console.log("inserting " + req.body.blog);
        db.run("DELETE FROM blog WHERE blog_id = ?", [req.body.blog]);    
        res.redirect('/');
      }
    );
  });

module.exports = router;