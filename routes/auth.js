const express = require('express');
const router = express.Router();
const regController =require('../controllers/authSchedule');

router.post('/login', regController.login);
router.post('/addschedule', regController.addschedule);
router.get('/updateform/:id', regController.update_form);
router.post('/update_user', regController.update_user);
router.get('/delete/:id', regController.delete);

module.exports = router;