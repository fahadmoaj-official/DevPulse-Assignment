import {Router} from 'express';
import { userController } from './user.controllers';
const router = Router();

router.post('/signup',userController.signup);
router.post('/login',userController.login);



export default router;