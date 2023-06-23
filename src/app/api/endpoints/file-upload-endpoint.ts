import { HttpClient, HttpEventType } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})

export class FileUploadEndpoint {
  baseUrl = `${environment.apiUrl}/employees/upload`;
  constructor(private httpClient: HttpClient) { }

  public imageUpload(data: FormData) {
    return this.httpClient.post<any>(this.baseUrl, data, {
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event: any) => {

      switch (event.type) {

        case HttpEventType.UploadProgress:
          return { status: 'progress', message: Math.round(100 * event.loaded / event.total) };

        case HttpEventType.Response:
          return event.body;
        default:
          return `Unhandled event: ${event.type}`;
      }
    })
    );
  }

  public fileUpload(data: FormData) {
    return this.httpClient.post<any>(this.baseUrl, data, {
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event: any) => {

      switch (event.type) {

        case HttpEventType.UploadProgress:
          return { status: 'progress', message: Math.round(100 * event.loaded / event.total) };

        case HttpEventType.Response:
          return event.body;
        default:
          return `Unhandled event: ${event.type}`;
      }
    })
    );
  }

}
