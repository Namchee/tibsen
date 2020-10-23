import Router from '@koa/router';
import absen from '../api/absen';

const router = new Router();

router.post('/absen', absen);

export { router };
