import express, { Express } from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import cors from 'cors';
import AppRouter from './routes';

const port = 3030;
const app: Express = express();
const router = new AppRouter(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
	cors({
		origin: '*',
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
		allowedHeaders: ['Content-Type', 'Authorization'],
	}),
);

router.init();

app.listen(port, () => {
	console.log(`Now listening on port ${port}`);
});
