import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
//import Jimp from 'jimp';

//declare const Buffer;

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit, AfterViewInit {

  @ViewChild("capture") capture: ElementRef;
  @ViewChild("photo") photo: ElementRef;
  @ViewChild("alice") alice: ElementRef;

  jpg: any;

  constructor() { }

  ngAfterViewInit(): void {
    console.log(this.capture);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      console.log("yes!");
      navigator.mediaDevices.getUserMedia({video: true}).then((stream) => {
        this.capture.nativeElement.srcObject = stream;
      });
    }
  }

  ngOnInit(): void {
  }

  clickVideo(event: any) {
    console.log(event);
    let selfie = document.createElement('canvas');
    let video = this.capture.nativeElement;
    selfie.width = video.videoWidth;
    selfie.height = video.videoHeight;
    selfie.getContext("2d").drawImage(video, 0, 0);
    selfie.getContext("2d").drawImage(this.alice.nativeElement, 0, 0);
    this.photo.nativeElement.src = selfie.toDataURL("image/webp");
    this.jpg = selfie.toDataURL("image/jpeg");
  }

  clickImage(event: any) {
    this.savePicture();
  }

  savePicture() {
    let anchor = document.createElement('a'); // new HTMLAnchorElement();
    anchor.href = this.jpg;
    //anchor.href = this.photo.nativeElement.src;
    anchor.download = 'selfie.jpeg';
    anchor.click();
  }

}
