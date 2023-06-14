import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { StateResource } from "../models/state.model";

@Injectable({
  'providedIn': 'root'
})

export class StateEndpoint {

  baseUrl = `${environment.apiUrl}/employees`;

  constructor(private readonly httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<{ data: StateResource[] }>(`${this.baseUrl}/state`);

  }

}
