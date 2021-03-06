import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {SmartairDataSource} from '../datasources';
import {Aviones, AvionesRelations, Solicitudes} from '../models';
import {SolicitudesRepository} from './solicitudes.repository';

export class AvionesRepository extends DefaultCrudRepository<
  Aviones,
  typeof Aviones.prototype.id,
  AvionesRelations
> {

  public readonly solicitudes: HasManyRepositoryFactory<Solicitudes, typeof Aviones.prototype.id>;


  constructor(
    @inject('datasources.Smartair') dataSource: SmartairDataSource, @repository.getter('SolicitudesRepository') protected solicitudesRepositoryGetter: Getter<SolicitudesRepository>,
  ) {
    super(Aviones, dataSource);
    this.solicitudes = this.createHasManyRepositoryFactoryFor('solicitudes', solicitudesRepositoryGetter,);
    this.registerInclusionResolver('solicitudes', this.solicitudes.inclusionResolver);
  }
}
