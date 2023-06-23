import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { EmployeeRequest, EmployeeResource } from "../models/employee.model";
import { StateResource } from "../models/state.model";
import { LgaResource } from "../models/lga.model";
import { MaritalStatusResource } from "../models/MaritalStatus.model";

@Injectable({
  'providedIn': 'root'
})

export class EmployeeEndpoint {

  baseUrl = `${environment.apiUrl}/employees`;

  constructor(private readonly httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<{ data: EmployeeResource[] }>(`${this.baseUrl}/employee`);

  }

  createemployee(data: EmployeeRequest) {
    return this.httpClient.post<{ data: EmployeeResource }>(`${this.baseUrl}/employee`, data);
  }

  singleEmployee(id: number) {
    return this.httpClient.get<{ data: EmployeeResource }>(`${this.baseUrl}/employee/${id}`);
  }

  updateemployee(id: number, data: EmployeeRequest) {
    return this.httpClient.put<{ data: EmployeeResource }>(`${this.baseUrl}/employee/${id}`, data);
  }

  delete(id: number) {
    return this.httpClient.delete<void>(`${this.baseUrl}/employee/${id}`);
  }

  statelist() {
    return this.httpClient.get<{ data: StateResource[] }>(`${this.baseUrl}/state`);

  }

  lgalist() {
    return this.httpClient.get<{ data: LgaResource[] }>(`${this.baseUrl}/local-government`);

  }

  Mstatuslist() {
    return this.httpClient.get<{ data: MaritalStatusResource[] }>(`${this.baseUrl}/marital-status`);

  }


}
