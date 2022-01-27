const router = require('express').Router();
const { Comment } = require('../../models');

//Setting up all the routes
//PERFORMING THE CRUD OPERATION
//FIRST GET ALL the comments available

router.get('/', (req, res) => {
    //console.log(comment, data)
    Comment.findAll()
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.error(err);
        res.status(500).json(err);
    });
});

//CREATE a comment with the CRUD OPERATION
router.post('/', (req, res) => {
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.body.user_id,
        post_id: req.body.post_id
    })
    .then(dbCommentData => res.json(dbCommentData)
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    }));
});

//DELETE a comment with the CRUD OPERATION
router.delete('/:id', (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentData => res.json(dbCommentData))
    .then(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
module.exports = router;