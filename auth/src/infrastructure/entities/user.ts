import {Entity,Column,} from 'typeorm';
import { Auth } from './utils/auth';
import { Length } from 'class-validator';

@Entity()
export class Users extends Auth {

   @Column({
    nullable:false
   })
   @Length(3, 255, { message: 'Username must have a minimum length of 3 characters' })
   firstName:string

   @Column()
   lastName:string

}