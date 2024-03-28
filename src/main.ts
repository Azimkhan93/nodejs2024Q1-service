import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { readFile } from 'fs/promises';
import * as YAML from 'yaml';
import { SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { MyLogger } from './log/log.service';

const filePath = './doc/api.yaml';

dotenv.config();
const port = process.env.PORT || 4000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new MyLogger(),
  });
  const fileContents = await readFile(filePath, 'utf8');
  const swaggerData = await YAML.parse(fileContents);
  SwaggerModule.setup('doc', app, swaggerData);

  await app.listen(port, () =>
    console.log(`Server is listening on port ${port}`),
  );
}
bootstrap();
