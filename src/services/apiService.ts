import { AccessLog, Temperature, CardRegistration } from '../types';

const API_URL_KEY = 'apiBaseUrl';

export const getApiUrl = (): string => {
  return localStorage.getItem(API_URL_KEY) || '';
};

export const setApiUrl = (url: string): void => {
  localStorage.setItem(API_URL_KEY, url);
};

export const fetchAccessLogs = async (): Promise<AccessLog[]> => {
  const baseUrl = getApiUrl();
  if (!baseUrl) {
    throw new Error('API URL not configured');
  }

  const response = await fetch(`${baseUrl}/home/log`);
  if (!response.ok) {
    throw new Error('Failed to fetch access logs');
  }

  const data = await response.json();
  return data.logs;
};

export const fetchTemperature = async (): Promise<Temperature[]> => {
  const baseUrl = getApiUrl();
  if (!baseUrl) {
    throw new Error('API URL not configured');
  }

  const response = await fetch(`${baseUrl}/home/temp`);
  if (!response.ok) {
    throw new Error('Failed to fetch temperature');
  }

  const data = await response.json();
  return data.result;
};

export const registerCard = async (cardData: CardRegistration): Promise<void> => {
  const baseUrl = getApiUrl();
  if (!baseUrl) {
    throw new Error('API URL not configured');
  }

  const response = await fetch(`${baseUrl}/home/card`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cardData),
  });

  if (!response.ok) {
    throw new Error('Failed to register card');
  }
};
