import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    DeleteDateColumn,
    CreateDateColumn,
    UpdateDateColumn,

} from 'typeorm';
import * as TypeBox from '@sinclair/typebox';

import { Nullable } from '../utils';

/**
 * Schema for contribuyentes entity
 */
export const contribuyentesSchema = TypeBox.Type.Object({
    id: TypeBox.Type.String({ format: 'uuid' }),

        razon_social: TypeBox.Type.String({ default: '' }),

        ruc: TypeBox.Type.String({ default: '' }),

}, { additionalProperties: false });

/**
 * Input type for editing and creating contribuyentes
 */
export const contribuyentesInputSchema = TypeBox.Type.Object({

        razon_social: TypeBox.Type.String({ default: '' }),

        ruc: TypeBox.Type.String({ default: '' }),

}, { additionalProperties: false });

export type ContribuyentesInput = TypeBox.Static<typeof contribuyentesInputSchema>;

@Entity()
export class Contribuyentes implements TypeBox.Static<typeof contribuyentesSchema> {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

        @Column({ default: '' })
        razon_social!: string;

        @Column({ default: '' })
        ruc!: string;

}
