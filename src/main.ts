import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Response, Request } from 'express';
import * as fs from 'fs';
import cors from 'cors';
import config from './config';

async function bootstrap() {
    const httpsOptions = {
        key: fs.readFileSync('.cert/back_key.pem'),
        cert: fs.readFileSync('.cert/back_cert.pem'),
    };

    const app = await NestFactory.create(AppModule, { httpsOptions });

    var corsOptions = {
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

    await app.listen(config.PORT);
}
bootstrap();
