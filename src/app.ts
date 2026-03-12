import express, {Express} from 'express';
import { consoleLogger } from './api/v1/middleware/logger';
import errorHandler from './api/v1/middleware/errorHandler';
import healthRouter from './api/v1/routes/healthRoute';

const app: Express = express();

app.use(consoleLogger);
app.use(express.json());


app.use('/api/v1', healthRouter);

app.use(errorHandler);
export default app;