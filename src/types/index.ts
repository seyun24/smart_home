export interface AccessLog {
  id: number;
  card_uid: string;
  result: string;
  timestamp: string;
}

export interface Temperature {
  id: number;
  device_id: string;
  temperature: string;
  created_at: string;
}

export interface CardRegistration {
  card_uid: string;
  owner_name: string;
}

export interface ApiConfig {
  baseUrl: string;
}
