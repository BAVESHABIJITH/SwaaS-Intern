const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth.middleware');
const {createJob, getMyJobs,getJobById, editJob} = require('../controllers/job.controller');
router.post('/createJob',protect,createJob);
router.get('/getMyJobs',protect,getMyJobs);
router.get('/getJobById/:id',protect,getJobById);
router.put('/editJob/:id',protect,editJob);
module.exports = router;
