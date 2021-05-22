import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import {SharedService} from 'src/app/shared.service';

@Component({
  selector: 'app-wav',
  templateUrl: './wav.component.html',
  styleUrls: ['./wav.component.css']
})


export class WavComponent implements OnInit {

  button = 'Convert Audio';
  isLoading = false;
  placeholder = "C://Users//Rishabh//Downloads//";


  constructor(private service:SharedService) { }
  
  response = ""

  audioFile: string ="C://Users//Rishabh//Downloads//";
  job: any;
  output: any;
  job2: any;
  loading: boolean = true;
  convert(){

    this.isLoading = true;
    this.button = 'Processing';

    // var val = {filepath: this.audioFile, folderpath: "C://Users//Rishabh//Desktop//VoiceApi-UI//audios//"};
   
    this.service.createServer().subscribe(res=>{
      console.log(res);
      // Object.assign(val, {result: res});
      this.service.uploadAudio({filepath: this.audioFile, server: res.server, id: res.id}).subscribe(res => {
        console.log(res);
        this.job = res.id.job;
      });
    });
    // this.service.getUploadedFileUrl({jobid: 'a2352fef-d366-4216-8c56-b3fcc831ca7c'}).subscribe(res => {
    //   console.log(res)
    // })
    
    setTimeout(()=>{ 
      console.log(this.job)
      this.service.getUploadedFileUrl({jobid: this.job}).subscribe(res => {
        console.log(res);
        this.output = res.output;
      })
     }, 7000);

     setTimeout(()=>{ 
      console.log(this.output)
      this.service.convertedFileId({uploadedFileUrl: this.output}).subscribe(res => {
        console.log(res);
        this.job2 = res.id;
        
      })
     }, 9000);

     setTimeout(()=>{ 
      console.log(this.output)
      this.service.getDownloadFileUrl({job2: this.job2}).subscribe(res => {
        console.log(res);
        this.output = res.output;
        
      })
     }, 12000);

     setTimeout(()=>{ 
      console.log(this.output)
      this.service.downloadConvertedFile({Url: this.output, filename: 'audio_' + new Date().getTime() + '.wav', filepath: 'C://Users//Rishabh//Desktop//VoiceApi-UI//audios//'}).subscribe(res => {
        console.log(res);
        this.isLoading = false;
        this.button = 'Convert Audio';
        this.response = `Downloaded at ${res.path}`;
        this.service.setData(res)
      })
     }, 18000);
  }

  ngOnInit(): void {
    
  }

}
