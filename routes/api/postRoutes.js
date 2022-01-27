const sequelize = require('../../config/connection');
const { Module } = require('express').Router();
const { Post, User, Comment, Vote } = require('../../models');
const router = require('./commentRoutes');

//Setting up all the routes
//PERFORMING THE CRUD OPERATION
//FIRST GET ALL the POSTS available
router.get('/', (req, res) => {
    Post.findAll({
        attribute: [
            'id',
            'title',
            'field',
            'created_at',
        ],

        include: [
            {
                model: Comment,
                attributes: ['id', 'user_id', 'comment_text', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ],
        order: [['created_at', 'DESC']]
    })
    .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// SECOND WHEN GET a POST BY IT'S ID
router.get('/', (req, res) => {
    Post.findOne({
        where: { 
            id: req.params.id
        },
        attribute: [
            'id',
            'field',
            'title',
            'created_at',
        ],

        include: [
            {
                model: Comment,
                attributes: ['id', 'user_id', 'comment_text', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            },
        ]
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'THIS ID HAS NO POST'});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);res.status(500).json(err);
    });
});

//CREATE A POST CRUD OPERATION WITH
router.Post('/', (req, res) => {
    Post.create({
        title: req.body.title,
        post_url: req.body.post_url,
        user_id: req.body.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//APPROVING A VOTE
router.put('/approve', (req, res) => {
    Post.approve(req.body, { Vote })
    .then(updatedPostData => res.json(updatedPostData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});


