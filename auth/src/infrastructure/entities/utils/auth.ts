import {Entity,PrimaryGeneratedColumn,Column,BaseEntity,CreateDateColumn} from 'typeorm';
import { Length } from 'class-validator';

@Entity()
export class Auth extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
	id: number;

	@Column({
      type: 'varchar',
      nullable:false,
    })
    @Length(3, 255, { message: 'Username must have a minimum length of 3 characters' })
	username: string;

	@Column({
        unique:true,
        nullable:false
    })
	email: string;

    @Column({
        nullable:false
    })
    password: string;

    @CreateDateColumn()
	created_at: Date;

}