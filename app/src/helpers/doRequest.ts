import axios from 'axios'
import { URL_STR } from '../vars/vars'

export const doRequest = axios.create({
	baseURL: URL_STR,
	timeout: 60000,
})
