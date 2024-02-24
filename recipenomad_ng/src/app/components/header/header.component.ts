import { Component, OnInit } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit{

  public isMenuActive: boolean = false;
  ngOnInit(): void {
    const mobileNavButton = document.querySelector<HTMLDivElement>(".navButton");
    const mobileNavigation = document.querySelector<HTMLDivElement>(".mobileNavigation");

    if (mobileNavButton && mobileNavigation) {
      mobileNavButton.addEventListener("click", () => this.triggerMobileNavigation());
    }
  }

  triggerMobileNavigation(): any {
    console.log('1');
    const top = document.querySelector<SVGElement>("#topline");
    const bottom = document.querySelector<SVGElement>("#bottomline");

    if (!this.isMenuActive) {
      console.log('2');
      top?.classList.add("svgTopActive");
      bottom?.classList.add("svgBottomActive");
      this.isMenuActive = true;
      gsap.timeline()
        .to(".mobileNavigation", { height: "90vh", ease: "power4.out", duration: 1 })
        .from(".navContainer a", { opacity: 0, y: -10, stagger: 0.2, duration: 0.5, ease: "power4.out" }, "<")
      document.body.style.overflow = "hidden";      
    } else if(this.isMenuActive){
      console.log('3');
      top?.classList.remove("svgTopActive");
      bottom?.classList.remove("svgBottomActive");
      this.isMenuActive = false;
      gsap.timeline().to(".mobileNavigation", { height: "0" });
      document.body.style.overflow = "auto";
    }
  }
  

}