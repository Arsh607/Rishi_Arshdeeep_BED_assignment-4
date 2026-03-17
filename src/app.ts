import express, {Express} from 'express';
import { consoleLogger } from './api/v1/middleware/logger';
import errorHandler from './api/v1/middleware/errorHandler';
import healthRouter from './api/v1/routes/healthRoute';
import loanRouter from './api/v1/routes/loanRoutes';
import adminRouter from './api/v1/routes/adminRoutes';
import authRouter from './api/v1/routes/authRoutes';

const app: Express = express();

app.use(consoleLogger);
app.use(express.json());
app.use(errorHandler);

app.use('/api/v1', healthRouter);
app.use('/api/v1', loanRouter);
app.use('/api/v1', adminRouter);
app.use('/api/v1', authRouter);

export default app;