var express = require('express'),
  router = express.Router(),
  hanienCtrl = require('../controllers/hanienController');

  const authentication = require('../controllers/authentication')(router);
  app = express();
	memberCtrl = require('../controllers/MemberController');


//-------------------------------hanien Routes-----------------------------------
router.get('/hanien/gethaniens', hanienCtrl.gethaniens);
router.get('/hanien/gethanien/:hanienId', hanienCtrl.gethanien);
router.get(
  '/hanien/gethaniensBelowPrice/:price',
  hanienCtrl.gethaniensBelowPrice
);
router.post('/hanien/createhanien', hanienCtrl.createhanien);
router.patch('/hanien/updatehanien/:hanienId', hanienCtrl.updatehanien);
router.delete('/hanien/deletehanien/:hanienId', hanienCtrl.deletehanien);


app.use('/authentication' , authentication);

//-------------------------------Member Routes-----------------------------------
router.get('/member/getMembers', memberCtrl.getMembers);
router.post('/member/createMember', memberCtrl.createMember);
router.patch('/member/updateMember/:memberId', memberCtrl.updateMember);
router.delete('/member/deleteMember/:memberId', memberCtrl.deleteMember);

//------------------------------User Routes-----------------------------------


module.exports = router;
