import {Component, OnInit, ElementRef, Renderer2} from '@angular/core';
import {Subject, Observable} from 'rxjs';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css']
})
export class CreateRecipeComponent implements OnInit {

  deviceFiles: File[] = [];

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}


  showGallery() {
    const selectionDiv1 = this.elRef.nativeElement.querySelector('.selection');
    const selectionDiv2 = this.elRef.nativeElement.querySelector('.selectionDiv');
    const galleryContainer = this.elRef.nativeElement.querySelector('.galleryContainer');
    this.renderer.setStyle(selectionDiv1, 'display', 'none');
    this.renderer.setStyle(selectionDiv2, 'display', 'none');
    this.renderer.setStyle(galleryContainer, 'display', 'flex');
  }

  showCamera() {
    const selectionDiv1 = this.elRef.nativeElement.querySelector('.selection');
    const selectionDiv2 = this.elRef.nativeElement.querySelector('.selectionDiv');
    const cameraContainer = this.elRef.nativeElement.querySelector('.cameraContainer');
    this.renderer.setStyle(selectionDiv1, 'display', 'none');
    this.renderer.setStyle(selectionDiv2, 'display', 'none');
    this.renderer.setStyle(cameraContainer, 'display', 'flex');
  }

  backSelection() {
    const selectionDiv1 = this.elRef.nativeElement.querySelector('.selection');
    const selectionDiv2 = this.elRef.nativeElement.querySelector('.selectionDiv');
    const galleryContainer = this.elRef.nativeElement.querySelector('.galleryContainer');
    const cameraContainer = this.elRef.nativeElement.querySelector('.cameraContainer');
    this.renderer.setStyle(selectionDiv1, 'display', 'flex');
    this.renderer.setStyle(selectionDiv2, 'display', 'flex');
    this.renderer.setStyle(cameraContainer, 'display', 'none');
    this.renderer.setStyle(galleryContainer, 'display', 'none');
  }

  handleDeviceUpload(event: any) {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.deviceFiles.push(files[i]);
    }
  }

  getFileUrl(file: File): string {
    return URL.createObjectURL(file);
  }

   // toggle webcam on/off
   public showWebcam = false;
   public allowCameraSwitch = true;
   public multipleWebcamsAvailable = false;
   public deviceId?: string;
   public videoOptions: MediaTrackConstraints = {
     // width: {ideal: 1024},
     // height: {ideal: 576}
   };
   public errors: WebcamInitError[] = [];
 
   // latest snapshot
   public webcamImage?: WebcamImage ;
 
   // webcam snapshot trigger
   private trigger: Subject<void> = new Subject<void>();
   // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
   private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();
 
   public ngOnInit(): void {
     WebcamUtil.getAvailableVideoInputs()
       .then((mediaDevices: MediaDeviceInfo[]) => {
         this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
       });
   }
 
   public triggerSnapshot(): void {
     this.trigger.next();
   }
 
   public toggleWebcam(): void {
     this.showWebcam = !this.showWebcam;
   }
 
   public handleInitError(error: WebcamInitError): void {
     this.errors.push(error);
   }
   public handleImage(webcamImage: WebcamImage): void {
     console.info('received webcam image', webcamImage);
     this.webcamImage = webcamImage;
   }

   public get triggerObservable(): Observable<void> {
     return this.trigger.asObservable();
   }
 

}
