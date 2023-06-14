import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { LgaResource } from "../models/lga.model";


@Injectable({
  'providedIn': 'root'
})

export class LgaEndpoint {

  baseUrl = `${environment.apiUrl}/employees`;

  constructor(private readonly httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<{ data: LgaResource[] }>(`${this.baseUrl}/local-government`);

  }

}
