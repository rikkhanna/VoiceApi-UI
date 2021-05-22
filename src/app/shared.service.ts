import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly ApiUrl = 'http://localhost:57034/api/';
  readonly convertControllerUrl = 'values/';
  readonly speakerControllerUrl = 'speakerverification/';

  private apiData = new BehaviorSubject<any>({path:''});
  public apiData$ = this.apiData.asObservable();

  constructor(private http: HttpClient) { }

  setData(data:any) { 
    this.apiData.next(data)
  }

  createServer(){
    return this.http.post<any>(this.ApiUrl + this.convertControllerUrl + 'server', {});
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

  
  enrollSpeaker(val:any){
    // console.log(val);
    let payload = {'enrollFile1': val[2].path,'enrollFile2': val[3].path,'enrollFile3': val[4].path}
    
    return this.http.post<any>(this.ApiUrl+this.speakerControllerUrl+'enroll', payload)
    // console.log(payload)
  }
  
  verifySpeaker(val:any){
    // console.log(val);
    let payload = {'file': val[5].path}
    
    return this.http.post<any>(this.ApiUrl+this.speakerControllerUrl+'verify', payload)
    // console.log(payload)
  }

  deleteSpeaker():Observable<any>{
    return this.http.delete(this.ApiUrl+this.speakerControllerUrl+'delete')
  }
}
