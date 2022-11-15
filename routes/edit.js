var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();

/* GET edit page */
router.get('/', (req, res, next) => {
    res.render('edit', { title: 'Edit' });
});

router.post('/', (req, res, next) => {
    console.log("Editing specified blog entry");
    var db = new sqlite3.Database('mydb.sqlite3',
      sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
      (err) => {
        if (err) {
          console.log("Getting error: " + err);
          exit(1);
        }
        console.log("Editing: " + req.body.blog);
        db.run("UPDATE blog SET blog_txt = ? WHERE blog_id = ?", [req.body.txt, req.body.blog_id]);
        //redirect to homepage
        res.redirect('/');
      }
    );
  });

module.exports = router;