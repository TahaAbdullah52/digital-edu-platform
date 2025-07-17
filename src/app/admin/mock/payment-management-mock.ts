import { PaymentApiResponse } from "../../models/payment"

export const MOCK_PAYMENTS: PaymentApiResponse[] = [
    {
      id: 1,
      user_name: 'John Smith',
      trxId: 'TXN-001234567',
      user_avatar: 'JS',
      amount: 299,
      course_name: 'Angular Development',
      date: '2023-10-01',
      type: 'Credit Card'
    },
    {
      id: 2,
      user_name: 'Sarah Johnson',
      trxId: 'TXN-001234568',
      user_avatar: 'SJ',
      amount: 199,
      course_name: 'React Basics',
      date: '2023-10-02',
      type: 'PayPal'
    },
    {
      id: 3,
      user_name: 'Michael Chen',
      trxId: 'TXN-001234569',
      user_avatar: 'MC',
      amount: 399,
      course_name: 'Node.js Masterclass',
      date: '2023-10-03', 
      type: 'Bank Transfer'
    },
    {
      id: 4,
      user_name: 'Emily Davis',
      trxId: 'TXN-001234570',
      user_avatar: 'ED',
      amount: 149,
      course_name: 'Vue.js Essentials',
      date: '2023-10-04',
      type: 'Credit Card'
    },
    {
      id: 5,
      user_name: 'Robert Wilson',
      trxId: 'TXN-001234571',
      user_avatar: 'RW',
      amount: 249,
      course_name: 'Django for Beginners',
      date: '2023-10-05', 
      type: 'PayPal'
    }
]