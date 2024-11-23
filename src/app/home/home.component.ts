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
      description: 'Prépa scientifique',
      photo: '../../assets/maths.png',
    },
    {
      date: '2015',
      description: 'École Spéciale Militaire de Saint-Cyr',
      photo: '../../assets/esm.png',
    },
    {
      date: '2018',
      description: "Diplôme d'ingénieur mathématiques informatique",
      photo: '../../assets/diplome.png',
    },
    {
      date: '2019',
      description: "Officier dans l'armée de terre",
      photo: '../../assets/officer.png',
    },
    {
      date: 'Avril 2024',
      description: 'Reconversion expert en développement logiciel',
      photo: '../../assets/study.png',
    },
    {
      date: 'Septembre 2024',
      description: "Développement d'une application full stack",
      photo: '../../assets/computer.png',
    },
  ];

  isVertical = true;

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
  
}
