import {Entity,Column} from 'typeorm';
import { Auth } from './utils/auth';

@Entity()
export class Admin extends Auth {
    @Column({
        type:'varchar'
    })
    admin_id:string

}