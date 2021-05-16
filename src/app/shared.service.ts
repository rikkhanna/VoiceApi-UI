import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly ApiUrl = 'http://localhost:57034/api/';
  readonly convertControllerUrl = 'values/';
  readonly speakerControllerUrl = 'speakerverification/';

  constructor(private http: HttpClient) { }

  // convert Audio to WAV -- Methods

  convertAudio(val:any){
    let server =  this.http.post<any>(this.ApiUrl+ this.convertControllerUrl + 'server', {});
    let payload = {'server':server, 'filepath':val.filepath};
    let jobId = this.http.post<any>(this.ApiUrl+ this.convertControllerUrl + 'upload', payload);
    let uploadedFileUrl = this.http.get<any>(this.ApiUrl+this.convertControllerUrl + 'getinfo/' + jobId);
    let payload2 = {'uploadedFileUrl': uploadedFileUrl}
    let convertedFileId = this.http.post<any>(this.ApiUrl+this.convertControllerUrl + 'convert', payload2);
    let downloadFileUrl = this.http.get<any>(this.ApiUrl+this.convertControllerUrl + 'getinfo'+ convertedFileId);
    let payload3 = {'Url':downloadFileUrl,'filename':val.filename,'filepath': val.filepath};
    return this.http.post<any>(this.ApiUrl+this.convertControllerUrl +'download', payload3);
  }

  
  
}
