import { get, post } from '@/utils/request'

export const apiLogin = data => post('api/common/v1/login', data)

export const apiProtocol = data => get('api/common/v1/protocol', data)
