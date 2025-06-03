export interface video_item{
    id:number,
    img_url: string;
    batch_nO: number;
    no_of_seat: number;
    rem_days: number;
    course_id: string;
    course_name: string;
    course_desc: string;
    no_of_class: number;
    category: string;
    isPremium: boolean;
    course_fee?: number;
    technologies?: { name: string; icon: string }[];
}
