
export interface EmployeeResource {
  id: number
  name: string;
  email: string
  phone_number: string;
  date_of_birth: Date;
  image: string;
  file: string;
  state_id: number;
  local_government_id: number;
  marital_status_id: number;
  address: string;
}

export interface UpdateEmployeeDto {
  id: number
  name: string;
  email: string
  phone_number: string;
  date_of_birth: Date;
  image: string;
  file: string;
  state_id: number;
  local_government_id: number;
  marital_status_id: number;
  address: string;
}

export interface EmployeeRequest {
  name: string;
  email: string
  phone_number: string;
  date_of_birth: Date;
  image: string;
  file: string;
  state_id: number;
  local_government_id: number;
  marital_status_id: number;
  address: string;
}


