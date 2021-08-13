import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AdminUser {
	@PrimaryGeneratedColumn() id: number;

	@Column({ length: 255 })
	password: string;

	@Column({ length: 255 })
	email: string;

	@Column('timestamp with time zone', {
		nullable: true
	})
	is_login_enabled_period: Date;

	@Column('timestamp with time zone', {
		nullable: true,
		default: () => 'CURRENT_TIMESTAMP'
	})
	last_login_time: Date;

	@Column('timestamp with time zone', {
		nullable: true,
		default: () => 'CURRENT_TIMESTAMP'
	})
	created_date: Date;
}
