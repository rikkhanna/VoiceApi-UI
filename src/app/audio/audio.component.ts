import { Component, OnDestroy } from '@angular/core';
import { AudioRecorderService } from 'src/app/audio-recorder.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.css']
})
export class AudioComponent implements OnDestroy {

  isRecording = false;
  recordedTime: any;
  blobUrl:any;

  constructor(private audioRecorderService: AudioRecorderService, private sanitizer: DomSanitizer) {

    this.audioRecorderService.recordingFailed().subscribe(() => {
      this.isRecording = false;
    });

    this.audioRecorderService.getRecordedTime().subscribe((time) => {
      this.recordedTime = time;
    });

    this.audioRecorderService.getRecordedBlob().subscribe((data) => {
      this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data.blob));
     
    });
  }

  startRecording() {
    if (!this.isRecording) {
      this.isRecording = true;
      this.audioRecorderService.startRecording();
    }
  }

  abortRecording() {
    if (this.isRecording) {
      this.isRecording = false;
      this.audioRecorderService.abortRecording();
    }
  }

  stopRecording() {
    if (this.isRecording) {
      this.audioRecorderService.stopRecording();
      this.isRecording = false;
    }
  }

  clearRecordedData() {
    this.blobUrl = null;
  }

  ngOnDestroy(): void {
    this.abortRecording();
  }

}
