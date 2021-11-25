import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
//import Jimp from 'jimp';

//declare const Buffer;

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild("capture") capture: ElementRef;
  @ViewChild("photo") photo: ElementRef;
  @ViewChild("alice") alice: ElementRef;


  stream: MediaStream;
  jpg: any;
  clicked: boolean;

  constructor() { }

  ngOnDestroy(): void {
    if (this.stream) {
      let tracks = this.stream.getTracks();
      tracks.forEach(t => t.stop());
    }
  }

  ngAfterViewInit(): void {
    this.clicked = false;
    console.log(this.capture);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({video: true}).then((stream) => {
        this.stream = stream;
        this.capture.nativeElement.srcObject = stream;

        let streamh = stream.getVideoTracks()[0].getSettings().height;
        let captureh = this.capture.nativeElement.clientHeight;
        console.log (captureh, streamh);
        let img = this.alice.nativeElement as HTMLImageElement;
        let cam = this.capture.nativeElement as HTMLVideoElement;
        console.log(cam, cam.clientHeight, cam.clientWidth);
        //img.width = Math.min(cam.clientHeight, cam.clientWidth);
        img.width = img.width * captureh / streamh;
      });
    }
  }

  ngOnInit(): void {
  }

  clickVideo(event: any) {
    this.clicked = true;
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
