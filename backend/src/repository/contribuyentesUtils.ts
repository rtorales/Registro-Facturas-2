import { SelectQueryBuilder } from 'typeorm';

export type EntityQuery<T> = {
    [K in keyof T]?: T[K];
};

/**
 * Applies filter query for any entity query builder
 */

export function applyFilters<T>(qb: SelectQueryBuilder<T>, query?: any) {

    let { razon_social } = query;

    if(razon_social){
        qb.where("e.razon_social like :name", { name:  `%${razon_social}%` });
    }
    let { ruc } = query;

    if(ruc){
        qb.where("e.ruc like :name", { name:  `%${ruc}%` });
    }
    return qb;
}
