import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sample {
	@PrimaryGeneratedColumn() id: number;

	@Column({ length: 255 })
	name: string;

	@Column({ length: 255 })
	email: string;

	@Column({ default: 0, readonly: false })
	status: boolean;

	@Column('timestamp with time zone', { nullable: true, default: () => 'CURRENT_TIMESTAMP' })
	created_date: Date;
}
