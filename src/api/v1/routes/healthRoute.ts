import express, {Router} from 'express';
import * as healthController from '../controllers/healthController';

const router: Router = express.Router();

router.get('/health', healthController.healthcheck);

export default router;