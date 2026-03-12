import * as healthService from '../services/healthService';
import { Request, Response, NextFunction} from 'express';
import { HTTP_STATUS } from '../../../constants/httpConstants';

export const healthcheck = (req: Request, res: Response, next: NextFunction) => {
    const health = healthService.healthService();
    return res.status(HTTP_STATUS.OK).json(health)
};