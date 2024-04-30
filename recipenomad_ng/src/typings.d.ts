declare global {
    interface Window {
      SpeechRecognition: any;
      webkitSpeechRecognition: any;
    }
  }
  
  // If you need to expose the types in the file as a module, do it outside of the 'declare global' block.
  export {};