import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { responseMiddleware } from './middlewares/response.middleware';
import * as fs from 'fs';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync(process.env.CERT_KEY),
    cert: fs.readFileSync(process.env.CERT_CERT),
  };
  const app = await NestFactory.create(AppModule, { httpsOptions });
  // const app = await NestFactory.create(AppModule);
  app.use(responseMiddleware);
  app.enableCors(); // 允许跨域
  await app.listen(443);
}
bootstrap();


// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import * as fs from 'fs';

// async function bootstrap() {
//   const httpsOptions = {
//     key: fs.readFileSync('key.pem'),
//     cert: fs.readFileSync('cert.pem'),
//   };
//   const app = await NestFactory.create(AppModule, { httpsOptions });
//   await app.listen(3000);
// }
// bootstrap();