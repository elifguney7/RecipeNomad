import {Component, OnInit, ElementRef, Renderer2, ChangeDetectorRef} from '@angular/core';
import {Subject, Observable, BehaviorSubject} from 'rxjs';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import { RecipeService } from 'src/app/services/recipe.service';


@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css']
})
export class CreateRecipeComponent implements OnInit {

  deviceFiles: File[] = [];

  recipe = {
    title: '',
    category: "",
    ingredients: '',
    instructions: '',
    media: ''
  };

  constructor(private elRef: ElementRef, private renderer: Renderer2, private recipeService: RecipeService, private cdRef: ChangeDetectorRef) {}
  showGallery() {
    const selectionDiv = this.elRef.nativeElement.querySelector('.selection');
    const infoDiv = this.elRef.nativeElement.querySelector('.infoDiv');
    const cameraContainer = this.elRef.nativeElement.querySelector('.cameraContainer');
    const galleryContainer = this.elRef.nativeElement.querySelector('.galleryContainer');
    this.renderer.setStyle(selectionDiv, 'display', 'none');
    this.renderer.setStyle(infoDiv, 'display', 'none');
    this.renderer.setStyle(cameraContainer, 'display', 'none');
    this.renderer.setStyle(galleryContainer, 'display', 'flex');
  }
  showCamera() {
    const selectionDiv = this.elRef.nativeElement.querySelector('.selection');
    const infoDiv = this.elRef.nativeElement.querySelector('.infoDiv');
    const cameraContainer = this.elRef.nativeElement.querySelector('.cameraContainer');
    const galleryContainer = this.elRef.nativeElement.querySelector('.galleryContainer');

    this.renderer.setStyle(selectionDiv, 'display', 'none');
    this.renderer.setStyle(infoDiv, 'display', 'none');
    this.renderer.setStyle(galleryContainer, 'display', 'none');
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
    const formData = new FormData();

    this.deviceFiles.forEach(file => {
      formData.append('media', file); // Directly append File objects
    });

    formData.append('title', this.recipe.title);
    formData.append('category', this.recipe.category);

    // formData.append('ingredients', JSON.stringify(this.recipe.ingredients));  // Assuming `ingredients` is an array of objects
    formData.append('ingredients', this.recipe.ingredients);
    formData.append('instructions', this.recipe.instructions);

    this.recipeService.createRecipe(formData).subscribe({
      next: (response) => {
        console.log('Recipe created successfully', response);
      },
      error: (error) => {
        console.error('Error creating recipe', error);
      }
    });
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

  fileUrls = new Map<File, string>();

  getFileUrl(file: File) {
    if (!this.fileUrls.has(file)) {
      const url = URL.createObjectURL(file);
      this.fileUrls.set(file, url);
      this.cdRef.detectChanges(); // Manually trigger detection to acknowledge the update.
    }
    return this.fileUrls.get(file);
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

webcamImageUrl: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

public handleImage(webcamImage: WebcamImage): void {
  const imageBlob = this.dataURItoBlob(webcamImage.imageAsDataUrl);
  if (imageBlob) {
    const imageFile = new File([imageBlob], 'webcam-image.png', { type: 'image/png' });
    this.deviceFiles.push(imageFile);
    const url = URL.createObjectURL(imageFile);
    this.webcamImageUrl.next(url);
  }
}

  private dataURItoBlob(dataURI: string): Blob | null {
  try {
    const base64Index = dataURI.indexOf('base64,') + 7; // Find the base64 index
    if (base64Index === 6) { // If 'base64,' was not found, index will be 6 - 1
      console.error('Invalid data URI');
      return null;
    }

    const byteString = window.atob(dataURI.substring(base64Index));
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    this.cdRef.detectChanges();

    return new Blob([int8Array], { type: 'image/png' });
  } catch (error) {
    console.error('Failed to convert data URI to blob:', error);
    return null;
  }
  
}

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
 

}
