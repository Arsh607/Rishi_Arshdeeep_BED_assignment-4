import * as loanController from '../controllers/loanController';
import {isAuthorized} from '../middleware/authorize';
import { authenticate } from '../middleware/authenticate';
import express, {Router} from 'express';

const router: Router = express.Router();

router.get('/loans', 
    authenticate, 
    isAuthorized({hasRole: ['officer', 'manager', 'admin']}), 
    loanController.getAllLoans
);

router.get('/loans/:id',
    authenticate,
    isAuthorized({hasRole: ['officer', 'manager', 'admin']}),
    loanController.getById
);

router.post('/loans',
    authenticate,
    isAuthorized({hasRole: ['manager', 'admin']}),
    loanController.createLoan
);

router.put('/loans/:id',
    authenticate,
    isAuthorized({hasRole: ['manager', 'admin']}),
    loanController.updateLoan
);

router.delete('/loans/:id',
    authenticate,
    isAuthorized({hasRole: ['admin']}),
    loanController.deleteLoan
);