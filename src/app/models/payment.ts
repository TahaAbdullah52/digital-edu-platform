export interface payment_item{
    id: number,
    trxId: string,
    user_id?: number,
    user_name?: string,
    user_avatar?:string,
    course_name?: string,
    course_img?:string,
    date?: string,
    type?: string,
    amount: number,
    status?:string,
}
export interface PaymentApiResponse {
  id: number;
  trxId: string;
  user_name: string;
  user_avatar: string;
  amount: number;
  course_name: string;
  date: string;
  type: string;

}