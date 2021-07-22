import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';

declare var Html5Qrcode;
declare var Html5QrcodeScanner;

@Component({
  selector: 'app-qr-code-popup',
  templateUrl: './qr-code-popup.component.html',
  styleUrls: ['./qr-code-popup.component.scss']
})
export class QrCodePopupComponent implements OnInit {

  cameraId: string;
  scanner: any;
  devices: CameraDevice[];
  code: string;

  constructor(private shared: SharedDataService) { }

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

  startScanner(device: CameraDevice) {

  } 

  startCamera(device: CameraDevice) {
    if (this.scanner) {
      this.scanner.stop();
      this.stopCamera();
    };
    this.scanner = new Html5Qrcode("reader");
    this.scanner.start(
      device.id,     // retreived in the previous step.
      {
        fps: 2,     // sets the framerate to 10 frame per second
        qrbox: 250,
        aspectRatio: 1.3333,
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

  stopCamera() {
    this.scanner.clear();
    // this.scanner.stop()
    // .then((ignore) => {
    //   console.log('stop ok', ignore);
    // })
    // .catch((error) => {
    //   console.log('stop error', error);
    // })
  }

}

class CameraDevice {
  id: string;
  label: string;
}