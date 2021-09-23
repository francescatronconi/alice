import { Component, OnDestroy, OnInit } from '@angular/core';
import { AudioPlayService } from 'src/app/services/audio-play.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

declare var Html5Qrcode;
declare var Html5QrcodeScanner;

@Component({
  selector: 'app-qr-code-popup',
  templateUrl: './qr-code-popup.component.html',
  styleUrls: ['./qr-code-popup.component.scss']
})
export class QrCodePopupComponent implements OnInit, OnDestroy {

  cameraId: string;
  scanner: any;
  devices: CameraDevice[];
  device: CameraDevice;
  code: string;
  ratio = 1.3333;

  constructor(private shared: SharedDataService, private audio: AudioPlayService) { }

  ngOnInit(): void {
    Html5Qrcode.getCameras().then(devices => {
      /**
       * devices would be an array of objects of type:
       * { id: "id", label: "label" }
       */
      console.log('devices', devices);
      if (devices && devices.length) {
        this.devices = devices;
        if (this.devices.length === 1) {
          this.startCamera(this.devices[0]);
        }
        // .. use this to start scanning.
      }
    }).catch(err => {
      console.log(err);
      // handle err
    });
  }

  ngOnDestroy(): void {
    this.stopCamera();
  }

  startCamera(device: CameraDevice) {
    this.device = device;
    if (this.scanner) {
      this.stopCamera();
    };
    this.scanner = new Html5Qrcode("reader");
    this.scanner.start(
      device.id,     // retreived in the previous step.
      {
        fps: 2,     // sets the framerate to 10 frame per second
        qrbox: 250,
        aspectRatio: this.ratio,
        //qrbox: Math.min(window.innerHeight, window.innerWidth),  // sets only 250 X 250 region of viewfinder to
                    // scannable, rest shaded.
      },
      qrCodeMessage => {
        // do something when code is read. For example:
        console.log(`QR Code detected: ${qrCodeMessage}`);
        this.shared.qrCode(qrCodeMessage);
        this.code = qrCodeMessage;
        this.stopCamera();
      },
      errorMessage => {
        // parse error, ideally ignore it. For example:
        // console.log(`QR Code no longer in front of camera.`);
      })
    .catch(err => {
      // Start failed, handle it. For example,
      console.log(`Unable to start scanning, error: ${err}`);
    });
  }

  clickDevice(device: CameraDevice) {
    this.audio.play('action');
    this.startCamera(device);
  }

  stopCamera() {
    if (this.scanner) {
      this.scanner.stop()
      .then((ignore) => {
        console.log('stop ok', ignore);
      })
      .catch((error) => {
        console.log('stop error', error);
      })
      this.scanner.clear();
    }
    this.scanner = null;
  }

  readerStyle() {
    let h = window.innerHeight;
    let w = window.innerWidth;
    let lower = Math.min(h, w);
    let upper = Math.max(h, w);
    return {width: `${0.9 * Math.min(upper, lower * this.ratio)}px`};
  }

}

class CameraDevice {
  id: string;
  label: string;
}