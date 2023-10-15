const {getUser,getUserRestrictData,Signup,AccountActivation,Signin,
    PasswordResetLink,PasswordUpdate}=require('../Controller/userController');

const {UrlAdd,Click,GetuserData,Redirect}=require('../Controller/urlController');
const {AddColor,getColor } =require('../Controller/suggestController');
const authMiddleware=require('../middleware/authMiddleWare')

const router=require('express').Router();

router.get('/',getUserRestrictData)
router.get('/users',getUser)
router.post('/signup',Signup)
router.patch('/accountactivation/:id',AccountActivation)
router.post('/signin',Signin)
router.put('/forgotPassword',PasswordResetLink)
router.patch('/PasswordReset/:id',PasswordUpdate)

router.post('/urlShortener',authMiddleware.verifyToken,UrlAdd)

router.post('/todaySuggest',authMiddleware.verifyToken,AddColor)
router.get('/getHistory',authMiddleware.verifyToken,getColor)

router.post('/urlShortener/click',authMiddleware.verifyToken,Click)
router.get('/urlShortener/userdata',authMiddleware.verifyToken,GetuserData)
router.get('/shorturl/:id',Redirect)



module.exports=router; 