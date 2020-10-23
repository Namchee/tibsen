import Koa from 'koa';
import helmet from 'koa-helmet';
import bodyParser from 'koa-bodyparser';
import { router } from './router/routes';
import { responseTimeMiddleware } from './util/middleware';

const app = new Koa();

app.use(bodyParser());
app.use(helmet());
app.use(router.routes());
app.use(router.allowedMethods());

app.use(responseTimeMiddleware);

const port = process.env.PORT || 3000;

app.listen(port);
console.log(`Listening on port ${port}`);
