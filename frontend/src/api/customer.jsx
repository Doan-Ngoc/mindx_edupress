import { request } from '../utils/request';

export const createCustomerAccount = async (data) => {
    return await request.post('/customers', data);
}