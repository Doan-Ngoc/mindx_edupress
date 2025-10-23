import { request } from '../utils/request';

export const createProviderAccount = async (data) => {
    return await request.post('/providers', data);
}

export const getProviderProfile = async (userId) => {
    return await request.get(`/providers/${userId}`);
}