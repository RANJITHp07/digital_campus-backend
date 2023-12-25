export interface IPayment{
    _id?:string
    planName: string;
    amount: number;
    username:string;
    email:string;
    plan_id:string;
    interval:number;
}