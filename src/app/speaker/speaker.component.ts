import { Component, OnInit } from '@angular/core';
import {SharedService} from 'src/app/shared.service';

@Component({
  selector: 'app-speaker',
  templateUrl: './speaker.component.html',
  styleUrls: ['./speaker.component.css']
})
export class SpeakerComponent implements OnInit {

  enrollbtn = 'Enroll Speaker';
  enrollLoading = false;
  verifybtn = 'Verify Speaker';
  verifyLoading = false;
  deletebtn = 'delete Speakers';
  deleteLoading = false;
  response = [{path: ''}] ;
  enrollResponse = "";
  verifyResponse = "";
  deleteResponse = "";
  
  constructor(private service:SharedService) { 

      this.service.apiData$.subscribe(data => this.response.push(data))
  }

  ngOnInit(): void {
    
  }

  enrollSpeaker(){
    this.enrollLoading = true
    this.service.enrollSpeaker(this.response).subscribe(res => {
      this.enrollResponse = res.guid;
      this.enrollLoading = false;
    });

  }
  verifySpeaker(){
    this.verifyLoading = true;
    this.service.verifySpeaker(this.response).subscribe(res => {
      this.verifyResponse = JSON.parse(res)
      this.verifyLoading = false
    });
  }

  deleteSpeakers(){
    this.deleteLoading = true;
    this.service.deleteSpeaker().subscribe(res => {
      this.deleteResponse = res.OK;
      this.deleteLoading = false;
    });
  }

}
