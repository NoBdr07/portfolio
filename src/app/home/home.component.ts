import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit {
  events = [
    {
      date: '2013',
      description: 'Prépa scientifique (maths Sup, maths Spé)',
      photo: '../../assets/maths.png',
      skills: ["Esprit scientifique", "Mathématiques", "Python"]
    },
    {
      date: '2015',
      description: 'École Spéciale Militaire de Saint-Cyr',
      photo: '../../assets/esm.png',
      skills: ["Rigueur", "Leadership", "Dépassement de soi"]
    },
    {
      date: '2018',
      description: "Diplôme d'ingénieur mathématiques informatique",
      photo: '../../assets/diplome.png',
      skills: ["Esprit d'analyse", "C#", "Unreal Engine"]
    },
    {
      date: '2019',
      description: "Officier dans l'armée de terre",
      photo: '../../assets/officer.png',
      skills: ["Direction d'équipes et de projets", "Capacité d'organisation", "Capacité d'adaptation"]
    },
    {
      date: 'Avril 2024',
      description: 'Reconversion expert en développement logiciel',
      photo: '../../assets/study.png',
      skills: ["Spécialisation Java et Angular", "Veille techonologique", "Architecture logiciel"]
    },
    {
      date: 'Septembre 2024',
      description: "Développement d'applications full stack",
      photo: '../../assets/computer.png',
      skills: ["Projets réels", "Déploiement et monitoring", "Analyse des besoins client"]
    },
  ];

  isVertical = true;

  openCaroussel1 = false;
  openCaroussel2 = false;
  activeCarouselIndex1: number = 0;
  activeCarouselIndex2: number = 0;

  constructor(private el: ElementRef) {}

  onArrowClick(direction: string) {
    const section = this.el.nativeElement.querySelector('.timeline');
  
    if (direction === "left") {
      section.scrollBy({
        left: -400, // Déplacement vers la gauche
        behavior: 'smooth' // Animation fluide
      });
    } else if (direction === "right") {
      section.scrollBy({
        left: 400, // Déplacement vers la droite
        behavior: 'smooth' // Animation fluide
      });
    }
  }

  ngAfterViewInit(): void {
    const competences: NodeListOf<HTMLElement> = this.el.nativeElement.querySelectorAll('.jauge-bar');
    
    // IntersectionObserver configuration
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const skillLevel = target.getAttribute('data-skill-level');
            if (skillLevel) {
              setTimeout(() => {
                target.style.width = `${skillLevel}%`;
              }, index * 500); // Délais entre chaque compétence
            }
            observer.unobserve(target); // Arrête d'observer après l'animation
          }
        });
      },
      { threshold: 0.5 } // 50% visible pour déclencher l'animation
    );

    // Observe chaque jauge
    competences.forEach((bar) => observer.observe(bar));
  }

  openCaroussel(carousselNumber: number) {
    if(carousselNumber === 1) {
      this.openCaroussel1 = true;
      this.activeCarouselIndex1 = 0;
      setTimeout(() => {
        this.updateCarousel1();
      }, 0);
    } 
    if (carousselNumber === 2) {
      this.openCaroussel2 = true;
      this.activeCarouselIndex2 = 0;
      setTimeout(() => {
        this.updateCarousel2();
      }, 0);
    }
  }  
  
  closeCaroussel(carousselNumber: number) {
    if(carousselNumber === 1) {
      this.openCaroussel1 = false;
      this.activeCarouselIndex1 = 0;
    } 
    if (carousselNumber === 2) {
      this.openCaroussel2 = false;
      this.activeCarouselIndex2 = 0;
    }
  }

  onCarousselArrowClick1(direction: string): void {
    const container = this.el.nativeElement.querySelector('.caroussel1');
    if (!container) { return; }
    const images: NodeListOf<HTMLElement> = container.querySelectorAll('.caroussel-capture1');
    const count = images.length;
    if (direction === 'right') {
      this.activeCarouselIndex1 = (this.activeCarouselIndex1 + 1) % count;
    } else if (direction === 'left') {
      this.activeCarouselIndex1 = (this.activeCarouselIndex1 - 1 + count) % count;
    }
    this.updateCarousel1();
  }

  // Met à jour les classes CSS des images du carrousel 1 en fonction de l'index actif
  updateCarousel1(): void {
    const container = this.el.nativeElement.querySelector('.caroussel1');
    if (!container) { return; }
    const images: NodeListOf<HTMLElement> = container.querySelectorAll('.caroussel-capture1');
    const count = images.length;
    const activeIndex = this.activeCarouselIndex1;
    // Pour un carrousel circulaire, on calcule l'image de gauche et de droite
    const leftIndex = (activeIndex - 1 + count) % count;
    const rightIndex = (activeIndex + 1) % count;
    images.forEach((img, index) => {
      img.classList.remove('left', 'active', 'right', 'hidden');
      if (index === activeIndex) {
        img.classList.add('active');
      } else if (index === leftIndex) {
        img.classList.add('left');
      } else if (index === rightIndex) {
        img.classList.add('right');
      } else {
        img.classList.add('hidden');
      }
    });
  }

  onCarousselArrowClick2(direction: string): void {
    const container = this.el.nativeElement.querySelector('.caroussel2');
    if (!container) { return; }
    const images: NodeListOf<HTMLElement> = container.querySelectorAll('.caroussel-capture2');
    const count = images.length;
    if (direction === 'right') {
      this.activeCarouselIndex2 = (this.activeCarouselIndex2 + 1) % count;
    } else if (direction === 'left') {
      this.activeCarouselIndex2 = (this.activeCarouselIndex2 - 1 + count) % count;
    }
    this.updateCarousel2();
  }

  // Met à jour les classes CSS des images du carrousel 1 en fonction de l'index actif
  updateCarousel2(): void {
    const container = this.el.nativeElement.querySelector('.caroussel2');
    if (!container) { return; }
    const images: NodeListOf<HTMLElement> = container.querySelectorAll('.caroussel-capture2');
    const count = images.length;
    const activeIndex = this.activeCarouselIndex2;
    // Pour un carrousel circulaire, on calcule l'image de gauche et de droite
    const leftIndex = (activeIndex - 1 + count) % count;
    const rightIndex = (activeIndex + 1) % count;
    images.forEach((img, index) => {
      img.classList.remove('left', 'active', 'right', 'hidden');
      if (index === activeIndex) {
        img.classList.add('active');
      } else if (index === leftIndex) {
        img.classList.add('left');
      } else if (index === rightIndex) {
        img.classList.add('right');
      } else {
        img.classList.add('hidden');
      }
    });
  }

}
