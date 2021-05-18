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

  
  createServer(val:any){
    
    return this.http.post<any>(this.ApiUrl + this.convertControllerUrl + 'server', {});
    // let payload = {'server':server, 'filepath':val.filepath};
    // let jobId =  this.http.post<any>(this.ApiUrl+ this.convertControllerUrl + 'upload', payload);
    // let uploadedFileUrl = this.http.get<any>(this.ApiUrl+this.convertControllerUrl + 'getinfo/' + jobId);
    // let payload2 = {'uploadedFileUrl': uploadedFileUrl}
    // let convertedFileId = this.http.post<any>(this.ApiUrl+this.convertControllerUrl + 'convert', payload2);
    // let downloadFileUrl = this.http.get<any>(this.ApiUrl+this.convertControllerUrl + 'getinfo'+ convertedFileId);
    // let payload3 = {'Url':downloadFileUrl,'filename':val.filename,'filepath': val.folderpath};
    // return this.http.post<any>(this.ApiUrl+this.convertControllerUrl +'download', payload3);
  }
  uploadAudio(val:any){
    let payload = {'server':val.server+'/upload-file/'+val.id, 'filepath':val.filepath};
    return this.http.post<any>(this.ApiUrl+ this.convertControllerUrl + 'upload', payload);
  }
  getUploadedFileUrl(val:any){
    return this.http.get<any>(this.ApiUrl+this.convertControllerUrl + 'getinfo/' + val.jobid);
  }

  convertedFileId(val:any){
    let payload2 = {'uploadedFileUrl': val.uploadedFileUrl}
    return  this.http.post<any>(this.ApiUrl+this.convertControllerUrl + 'convert', payload2);
  }

  getDownloadFileUrl(val:any){
    return this.http.get<any>(this.ApiUrl+this.convertControllerUrl + 'getinfo/'+ val.job2);
  }

  downloadConvertedFile(val:any){
    let payload3 = {'Url':val.Url,'filename':val.filename,'filepath': val.filepath};
    return this.http.post<any>(this.ApiUrl+this.convertControllerUrl +'download', payload3);
  }

  
  
}
