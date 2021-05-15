import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ControleFluxoEntity } from 'src/controle-fluxo/entities/controle-fluxo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      username: 'postgres',
      password: 'docker',
      database: 'controleDeFluxo',
      port: 5432,
      entities: [ControleFluxoEntity],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
