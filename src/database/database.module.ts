import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ControleFluxoEntity } from 'src/controle-fluxo/entities/controle-fluxo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5432,
      database: 'user',
      host: 'localhost',
      password: 'docker',
      entities: [ControleFluxoEntity],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
