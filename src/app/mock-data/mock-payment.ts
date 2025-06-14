import { payment_item } from "../models/payment";

export const MOCK_PAYMENTS: payment_item[] = [
    {
        id: 1,
        trxId: 'TXN001',
        course_name: 'Web Dev',
        course_img:'',
        date: '2025-06-01',
        type: 'Bkash',
        amount: 1499,
        status: 'Completed',
    },
    {
        id:2,
        trxId: 'TXN002',
        course_name: 'Web Dev',
        course_img:'',
        date: '2025-06-05',
        type: 'Rocket',
        amount: 2000,
        status: 'Pending',
    },
]