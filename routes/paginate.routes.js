const router = require("express").Router();
const {isAuthenticated,isAuthenticatedAdmin,isAuthenticatedUser} = require('../utils/auth')
const {paginateController,paginateAdmin}=require('../controllers/paginate.controller')

router.use(isAuthenticated)

router.get('/api/',isAuthenticatedUser,paginateController);
router.get('/api/admin',isAuthenticatedAdmin,paginateAdmin);



module.exports = router;