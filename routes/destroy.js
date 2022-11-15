var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();

/* GET destroy page */
router.get('/', (req, res, next) => {
    res.render('destroy', { title: 'Destroy' });
});

router.post('/', (req, res, next) => {
    console.log("Deleting specified blog entry");
    var db = new sqlite3.Database('mydb.sqlite3',
      sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
      (err) => {
        if (err) {
          console.log("Getting error: " + err);
          exit(1);
        }
        console.log("Deleting: " + req.body.blog);
        db.run("DELETE FROM blog WHERE blog_id = ?", [req.body.blog]);
        //redirect to homepage
        res.redirect('/');
      }
    );
  });

module.exports = router;