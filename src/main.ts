import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { seederUser } from './common/database/seederUser/seeder.user';
import { seederRole } from './common/database/seederRole/seeder.role';
import { seederEntitie } from './common/database/seederEntity/seeder.entitie';
import { seederPermission } from './common/database/seederPermission/seeder.permission';
import { FilterError } from './common/erros/filter/error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const dataSource=app.get(DataSource);

  const roleSeeder=new seederRole();
  await roleSeeder.run(dataSource);

  const userSeeder=new seederUser();
  await userSeeder.run(dataSource);

  const entitySeeder=new seederEntitie();
  await entitySeeder.run(dataSource);

  const permissionSeeder=new seederPermission();
  await permissionSeeder.run(dataSource);

  app.useGlobalFilters(new FilterError());

  await app.listen(3000);
}
bootstrap();
