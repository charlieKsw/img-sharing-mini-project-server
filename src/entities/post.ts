import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserPost {
	@PrimaryGeneratedColumn() id: number;

	@Column({ type: 'text', readonly: false, nullable: true }) // readonly: false, nullable: true
	image_url: string;

	@Column({ length: 255, readonly: false, nullable: true })
	description: string;

	@Column({ length: 255 })
	email: string;

	@Column('timestamp with time zone', {
		nullable: true,
		default: () => 'CURRENT_TIMESTAMP'
	})
	created_date: Date;
}
