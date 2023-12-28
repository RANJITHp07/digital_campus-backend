import { createConnection } from 'typeorm';
import { Users } from '../entities/user';
import { Admin } from '../entities/admin';

export const  db=async():Promise<void>=>{
    try{

        // env variables of configuration
        const username=process.env.DATABASE_USERNAME as string
        const password=process.env.DATABASE_PASSWORD as string
        const database=process.env.DATABASE_NAME as string


        if(username && database && password){
        await createConnection({
			type:"postgres",
			host: 'auth-postgres-srv',
			port: 5432,
			username: 'postgres',
			password: '1234',
			database: 'Auth',
			entities: [Users,Admin],
			synchronize: true,
		});
		console.log('Connected to Postgres');
        }
    }catch(err){
      throw new Error(`Postgress connection err: ${err}` )
    }
}