const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');
//GET ALL THE COMMENT AND CATCH ERROR
router.get('/', (req, res) => {
  Comment.findAll()
  .then(dbCommentData => res.json(dbCommentData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

//CREATE COMMENT AND CATCH ERROR
router.post('/', withAuth, (req, res) => {
    if (req.session) {
      Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.session.user_id,
        post_id: req.body.post_id
      })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    }
});

//delete a comment
router.delete('/:id', withAuth, (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbCommentData => {
    if (!dbCommentData) {
      res.status(404).json({ message: 'No comment found with this ID.' });
      return;
    }
    res.json(dbCommentData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;