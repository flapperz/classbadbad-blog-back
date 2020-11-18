import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Response, Request } from 'express';
import * as fs from 'fs';
import cors from 'cors';
import config from './config';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import csurf from 'csurf';

async function bootstrap() {
    const httpsOptions = {
        key: fs.readFileSync('.cert/back_key.pem'),
        cert: fs.readFileSync('.cert/back_cert.pem'),
    };

    const app = await NestFactory.create(AppModule, { httpsOptions });

    const corsOptions = {
        Credentials: true,
        origin: config.CORS_HOST,
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    };
    if (config.ALLOW_CORS === 'true') {
        app.use((req: Request, res: Response, next) => {
            //   res.setHeader("Access-Control-Allow-Credentials", "true");
            res.setHeader('Access-Control-Allow-Origin', config.CORS_HOST);
            res.setHeader(
                'Access-Control-Allow-Methods',
                'POST, GET, DELETE, PATCH',
            );
            next();
        });
    }

    app.use(cors(corsOptions));
    app.use(helmet());
    app.use(csurf());
    app.use(
        rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100, // limit each IP to 100 requests per windowMs
        }),
    );

    await app.listen(config.PORT);
}
bootstrap();
