import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { MaritalStatusResource } from "../models/MaritalStatus.model";

@Injectable({
  'providedIn': 'root'
})

export class MaritalStatusEndpoint {

  baseUrl = `${environment.apiUrl}/employees`;

  constructor(private readonly httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<{ data: MaritalStatusResource[] }>(`${this.baseUrl}/marital-status`);

  }

}
