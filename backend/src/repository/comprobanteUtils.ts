import { SelectQueryBuilder } from 'typeorm';

export type EntityQuery<T> = {
    [K in keyof T]?: T[K];
};

/**
 * Applies filter query for any entity query builder
 */

export function applyFilters<T>(qb: SelectQueryBuilder<T>, query?: any) {

    let { razonSocial } = query;

    if(razonSocial){
        qb.where("e.razonSocial like :name", { name:  `%${razonSocial}%` });
    }
    let { numeroComprobante } = query;

    if(numeroComprobante){
        qb.where("e.numeroComprobante like :name", { name:  `%${numeroComprobante}%` });
    }
    return qb;
}
