import { EntityRepository, Repository } from 'typeorm';

import { Comprobante } from '../entity/Comprobante';
import { applyFilters, EntityQuery } from './comprobanteUtils';

@EntityRepository(Comprobante)
export class ComprobanteRepository extends Repository<Comprobante> {

    async filter(query: any | undefined, page: number, size: number, field: string | undefined, sort: "ASC" | "DESC" | undefined = "ASC", countOnly: boolean | undefined ): Promise<(any[] | Promise<number>)[] | Promise<[Comprobante[], number]>> {
        const qb = this.createQueryBuilder('e');
        applyFilters(qb, query);
        if(field) {
            const dbQuery = qb
              .skip(page * size)
              .take(size)
              .orderBy(`e.${field}`, sort)

              .leftJoinAndSelect('e.contribuyente', 'contribuyente')
            ;

            return countOnly ? [[], await dbQuery.getCount()] : dbQuery.getManyAndCount();
        } else {
            const dbQuery = qb
              .skip(page * size)
              .take(size)

              .leftJoinAndSelect('e.contribuyente', 'contribuyente')

            return countOnly ? [[], await dbQuery.getCount()] : dbQuery.getManyAndCount();
        }
    }
}
