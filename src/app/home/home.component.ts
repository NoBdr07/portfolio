import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  events = [
    { date: '2013', description: 'Prépa scientifique' },
    { date: '2015', description: 'École Spéciale Militaire de Saint-Cyr' },
    {
      date: '2018',
      description: "Diplôme d'ingénieur mathématiques informatique",
    },
    { date: '2019', description: "Officier dans l'armée de terre" },
    {
      date: 'Avril 2024',
      description: 'Reconversion expert en développement logiciel',
    },
    {
      date: 'Septembre 2024',
      description: "Développement d'une application full stack",
    },
  ];

  private isWheelListenerActive = true; // Flag pour activer ou désactiver l'écoute des événements

  constructor(private el: ElementRef) {}

  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent): void {
    if (!this.isWheelListenerActive) {
      return; // Ignore les événements lorsque l'écoute est désactivée
    }

    const section = this.el.nativeElement.querySelector('.cursus-container');
    const rect = section.getBoundingClientRect();

    // Vérifie si la section est active
    if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
      console.log("ENTREE DANS LE CHAMP DE CURSUS");
      event.preventDefault(); // Empêche le comportement par défaut

      const isAtEnd =
        section.scrollLeft + section.clientWidth >= section.scrollWidth; // Extrémité droite
      const isAtStart = section.scrollLeft <= 0; // Extrémité gauche

      console.log("isAtEnd : " + isAtEnd);
      console.log("isAtStart : " + isAtStart);

      if (event.deltaY > 0) {
        // Défilement vers le bas (horizontal vers la droite)
        if (isAtEnd) {
          console.log("Fin atteinte, activation du défilement vertical");
          this.enableVerticalScroll(section);
        } else {
          this.enableHorizontalScroll(section);
          section.scrollLeft += event.deltaY;
        }
      } else {
        // Défilement vers le haut (horizontal vers la gauche)
        if (isAtStart) {
          console.log("Début atteint, activation du défilement vertical");
          this.enableVerticalScroll(section);
        } else {
          this.enableHorizontalScroll(section);
          section.scrollLeft += event.deltaY;
        }
      }
    } else {
      // Si on est en dehors de la section, réactive le comportement par défaut
      this.enableVerticalScroll(section);
    }
  }

  private enableVerticalScroll(section: HTMLElement): void {
    console.log("appel de enableVerticalScroll");

    // Désactiver temporairement l'écoute des événements pour éviter les conflits
    this.isWheelListenerActive = false;

    // Réactive le défilement vertical
    document.body.style.overflowY = 'auto';
    section.style.overflowX = 'hidden';

    // Réactiver l'écoute après un délai
    setTimeout(() => {
      this.isWheelListenerActive = true;
    }, 100); // 100 ms pour garantir la transition
  }

  private enableHorizontalScroll(section: HTMLElement): void {
    console.log("appel de enableHorizontalScroll");

    // Activer le défilement horizontal
    this.isWheelListenerActive = true; // Assurer que l'écoute reste active pendant le scroll horizontal
    document.body.style.overflowY = 'hidden';
    section.style.overflowX = 'auto';
  }
}
