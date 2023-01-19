import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    DeleteDateColumn,
    CreateDateColumn,
    UpdateDateColumn,

    JoinTable,
    ManyToMany,

    ManyToOne,
    JoinColumn,

} from 'typeorm';
import * as TypeBox from '@sinclair/typebox';

import { File, fileSchema } from './File';

import { Contribuyentes, contribuyentesSchema } from './Contribuyentes';

import { Nullable } from '../utils';

export enum Tiporegistro {

        VENTAS = 'VENTAS',

        COMPRAS = 'COMPRAS',

        INGRESOS = 'INGRESOS',

        EGRESOS = 'EGRESOS',

}

export enum Tipoidentificacion {

        RUC = 'RUC',

        CDULADEIDENTIDAD = 'CÉDULA DE IDENTIDAD',

        PASAPORTE = 'PASAPORTE',

        CDULAEXTRANJERO = 'CÉDULA EXTRANJERO',

        SINNOMBRE = 'SIN NOMBRE',

        DIPLOMTICO = 'DIPLOMÁTICO',

        IDENTIFICACINTRIBUTARIA = 'IDENTIFICACIÓN TRIBUTARIA',

}

export enum Condicion {

        CONTADO = 'CONTADO',

        CRDITO = 'CRÉDITO',

}

/**
 * Schema for comprobante entity
 */
export const comprobanteSchema = TypeBox.Type.Object({
    id: TypeBox.Type.String({ format: 'uuid' }),

        contribuyente: TypeBox.Type.Optional(Nullable(contribuyentesSchema)),

        tipoRegistro: TypeBox.Type.Enum(Tiporegistro),

        razonSocial: TypeBox.Type.String({ default: '' }),

        fecha: TypeBox.Type.Optional(TypeBox.Type.String({ format: 'date' })),

        numeroComprobante: TypeBox.Type.String({ default: '' }),

        total: TypeBox.Type.Number({ default: 0 }),

        imputaIVA: TypeBox.Type.Boolean({ default: false }),

}, { additionalProperties: false });

/**
 * Input type for editing and creating comprobante
 */
export const comprobanteInputSchema = TypeBox.Type.Object({

        contribuyente: TypeBox.Type.Optional(TypeBox.Type.String()),

        tipoRegistro: TypeBox.Type.Enum(Tiporegistro),

        razonSocial: TypeBox.Type.String({ default: '' }),

        fecha: TypeBox.Type.Optional(TypeBox.Type.String({ format: 'date' })),

        numeroComprobante: TypeBox.Type.String({ default: '' }),

        total: TypeBox.Type.Number({ default: 0 }),

        imputaIVA: TypeBox.Type.Boolean({ default: false }),

}, { additionalProperties: false });

export type ComprobanteInput = TypeBox.Static<typeof comprobanteInputSchema>;

@Entity()
export class Comprobante implements Omit<TypeBox.Static<typeof comprobanteSchema>, 'contribuyente'> {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

        @ManyToOne(() => Contribuyentes, { cascade: true })
    @JoinColumn()
        contribuyente?: Contribuyentes;

        @Column({ type: 'enum', enum: Tiporegistro })
        tipoRegistro!: Tiporegistro;

        @Column({ type: 'enum', enum: Tipoidentificacion })
        tipoIdentificacion!: Tipoidentificacion;

        @Column({ default: '' })
        numeroIdentificacion!: string;

        @Column({ default: '' })
        razonSocial!: string;

        @Column({ type: 'date', nullable: true })
        fecha?: string;

        @Column({ default: '' })
        numeroComprobante!: string;

        @Column({ type: 'decimal', default: 0 })
        gravado10!: number;

        @Column({ type: 'decimal', default: 0 })
        gravado5!: number;

        @Column({ type: 'decimal', default: 0 })
        exento!: number;

        @Column({ type: 'decimal', default: 0 })
        total!: number;

        @Column({ type: 'enum', enum: Condicion })
        condicion!: Condicion;

        @Column({ default: false })
        monedaExtranjera!: boolean;

        @Column({ default: false })
        imputaIVA!: boolean;

        @Column({ default: false })
        imputaIRE!: boolean;

        @Column({ default: false })
        imputaIRPRSP!: boolean;

        @ManyToMany(() => File, { eager: true, cascade: true })
    @JoinTable({ name: 'comprobante_anexo_join' })
        anexo!: File[];

        @ManyToMany(() => File, { eager: true, cascade: true })
    @JoinTable({ name: 'comprobante_documento_join' })
        documento!: File[];

}
