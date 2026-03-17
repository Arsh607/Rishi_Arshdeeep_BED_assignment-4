import { Router } from "express";
import {isAuthorized} from '../middleware/authorize';
import { authenticate } from '../middleware/authenticate';
import { setCustomClaims } from '../controllers/adminController';

const router = Router();

router.post(
    "/admin/setCustomClaims",
    authenticate,
    isAuthorized({ hasRole: ["admin"] }),
    setCustomClaims
);

export default router;