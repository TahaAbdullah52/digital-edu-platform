export interface video_item{
    id:number,
    img_url: string;
    batch_nO: number;
    no_of_seat: number;
    rem_days: number;
    course_name: string;
    category: string;
    subscription: string;
    course_fee?: number;
}