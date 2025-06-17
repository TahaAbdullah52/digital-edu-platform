import { PaymentApiResponse } from "../../models/payment"

export const MOCK_PAYMENTS: PaymentApiResponse[] = [
    {
      id: 1,
      user_name: 'John Smith',
      trxId: 'TXN-001234567',
      user_avatar: 'JS',
      amount: 299,
    },
    {
      id: 2,
      user_name: 'Sarah Johnson',
      trxId: 'TXN-001234568',
      user_avatar: 'SJ',
      amount: 199
    },
    {
      id: 3,
      user_name: 'Michael Chen',
      trxId: 'TXN-001234569',
      user_avatar: 'MC',
      amount: 399
    },
    {
      id: 4,
      user_name: 'Emily Davis',
      trxId: 'TXN-001234570',
      user_avatar: 'ED',
      amount: 149
    },
    {
      id: 5,
      user_name: 'Robert Wilson',
      trxId: 'TXN-001234571',
      user_avatar: 'RW',
      amount: 249
    }
]