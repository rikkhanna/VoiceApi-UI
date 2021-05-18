import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AudioComponent } from './audio/audio.component';
import { WavComponent } from './wav/wav.component';
import { SpeakerComponent } from './speaker/speaker.component';
import { SharedService } from './shared.service';
import { HttpClientModule } from '@angular/common/http';
import {AudioRecorderService} from './audio-recorder.service';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    AudioComponent,
    WavComponent,
    SpeakerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [SharedService, AudioRecorderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
