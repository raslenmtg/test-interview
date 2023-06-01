import {Router} from "express";
import {UserController} from "./user.controller";


const router = Router();
const userController= new UserController();
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req:any, file:any, cb:Function) {
        cb(null, './public')
    },
    filename: function (req:any, file:any, cb:Function) {
        cb(null, file.originalname)
    }
})

const upload = multer({storage: storage})

router.get('/user', (req, res) => userController.getUsers(req,res))
router.post('/user',upload.single('passport'),(req, res) => userController.addUser(req,res))

















export default router;
