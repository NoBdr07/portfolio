import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
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
}
