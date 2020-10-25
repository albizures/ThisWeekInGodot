import fetch from 'isomorphic-fetch';
import { ItchData } from '../types';

export const getItchData = async (url: string): Promise<ItchData> => {
	const response = await fetch(`${url}/data.json`);
	return response.json();
};
