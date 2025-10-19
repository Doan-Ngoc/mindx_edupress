import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Provider } from '../entities/provider.entity';

@Injectable()
export class ProviderRepository extends Repository<Provider> {
  constructor(private dataSource: DataSource) {
    super(Provider, dataSource.createEntityManager());
  }
}
