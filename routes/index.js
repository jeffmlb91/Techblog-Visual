const router = require('express').Router();
const apiRoutes = require('./api');

//Defining the routes 
router.use('/api', apiRoutes);
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;
