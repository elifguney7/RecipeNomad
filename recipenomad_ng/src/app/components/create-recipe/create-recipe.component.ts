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

  recipe = {
    name: '',
    ingredients: '',
    instructions: ''
  };

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}
  showGallery() {
    const selectionDiv = this.elRef.nativeElement.querySelector('.selection');
    const infoDiv = this.elRef.nativeElement.querySelector('.infoDiv');
    const galleryContainer = this.elRef.nativeElement.querySelector('.galleryContainer');
    this.renderer.setStyle(selectionDiv, 'display', 'none');
    this.renderer.setStyle(infoDiv, 'display', 'none');
    this.renderer.setStyle(galleryContainer, 'display', 'flex');
  }
  showCamera() {
    const selectionDiv = this.elRef.nativeElement.querySelector('.selection');
    const infoDiv = this.elRef.nativeElement.querySelector('.infoDiv');
    const cameraContainer = this.elRef.nativeElement.querySelector('.cameraContainer');
    this.renderer.setStyle(selectionDiv, 'display', 'none');
    this.renderer.setStyle(infoDiv, 'display', 'none');
    this.renderer.setStyle(cameraContainer, 'display', 'flex');
  }

  backSelection() {
    const selectionDiv = this.elRef.nativeElement.querySelector('.selection');
    const infoDiv = this.elRef.nativeElement.querySelector('.infoDiv');
    const galleryContainer = this.elRef.nativeElement.querySelector('.galleryContainer');
    const cameraContainer = this.elRef.nativeElement.querySelector('.cameraContainer');
    this.renderer.setStyle(selectionDiv, 'display', 'flex');
    this.renderer.setStyle(infoDiv, 'display', 'flex');
    this.renderer.setStyle(cameraContainer, 'display', 'none');  
  }

  nextSelection() {
    const mediaContainer = this.elRef.nativeElement.querySelector('.stepOne');
    const textContainer = this.elRef.nativeElement.querySelector('.stepTwo');
    const lastStep = this.elRef.nativeElement.querySelector('.stepThree');
    this.renderer.setStyle(mediaContainer, 'display', 'none');
    this.renderer.setStyle(textContainer, 'display', 'flex');
    this.renderer.setStyle(lastStep, 'display', 'none');
  }

  backToMedia(){
    const mediaContainer = this.elRef.nativeElement.querySelector('.stepOne');
    const textContainer = this.elRef.nativeElement.querySelector('.stepTwo');
    const lastStep = this.elRef.nativeElement.querySelector('.stepThree');
    this.renderer.setStyle(mediaContainer, 'display', 'flex');
    this.renderer.setStyle(textContainer, 'display', 'none');
    this.renderer.setStyle(lastStep, 'display', 'none');
  }

  submitRecipeForm() {
    // You can handle form submission here, e.g., send data to backend or perform further processing
    console.log('Submitted Recipe:', this.recipe);
    // You can also reset the form after submission if needed
    // this.recipe = { name: '', ingredients: '', instructions: '' };
  }
  succesfullyCreated() {
    const textContainer = this.elRef.nativeElement.querySelector('.stepTwo');
    const lastStep = this.elRef.nativeElement.querySelector('.stepThree');
    this.renderer.setStyle(textContainer, 'display', 'none');
    this.renderer.setStyle(lastStep, 'display', 'flex');
  }
  backtoStart() {
    const mediaContainer = this.elRef.nativeElement.querySelector('.stepOne');
    const selectionDiv = this.elRef.nativeElement.querySelector('.selection');
    const infoDiv = this.elRef.nativeElement.querySelector('.infoDiv');
    const cameraContainer = this.elRef.nativeElement.querySelector('.cameraContainer');
    const galleryContainer = this.elRef.nativeElement.querySelector('.galleryContainer');
    const lastStep = this.elRef.nativeElement.querySelector('.stepThree');
    this.renderer.setStyle(cameraContainer, 'display', 'none');
    this.renderer.setStyle(galleryContainer, 'display', 'none');
    this.renderer.setStyle(mediaContainer, 'display', 'flex');
    this.renderer.setStyle(selectionDiv, 'display', 'flex');
    this.renderer.setStyle(infoDiv, 'display', 'flex');
    this.renderer.setStyle(lastStep, 'display', 'none');
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
