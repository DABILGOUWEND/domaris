import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, inject, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ImportedModule } from '../../shared/modules/imported/imported.module';
@Component({
  selector: 'app-plansvg',
  imports: [ImportedModule],
  templateUrl: './plansvg.component.html',
  styleUrl: './plansvg.component.scss'
})
export class PlansvgComponent  {
// Inputs
@Input({ required: true }) src!: string; // Chemin du fichier SVG
  
// Outputs
@Output() villaClicked = new EventEmitter<string>();

svgContent: SafeHtml | null = null;

// Injection des dépendances
private http = inject(HttpClient);
private sanitizer = inject(DomSanitizer);
private hostElement = inject(ElementRef); // Pour manipuler le DOM localement

ngOnChanges(changes: SimpleChanges) {
  if (changes['src'] && this.src) {
    
    this.loadSvg();
  }
}

private loadSvg() {
  this.http.get(this.src, { responseType: 'text' }).subscribe({
    next: (data) => {
      // On sécurise le HTML pour qu'Angular l'accepte
      this.svgContent = this.sanitizer.bypassSecurityTrustHtml(data);
    },
    error: (err) => console.error('Erreur chargement SVG:', err)
  });
}

handleSvgClick(event: MouseEvent) {
  console.log(event)
  const target = event.target as SVGElement;

  // 1. Trouver l'élément cliqué qui possède un ID
  // .closest('[id]') permet de remonter au groupe <g> si on clique sur un trait à l'intérieur
  const clickableElement = target.id ? target : target.closest('[id]');

  if (clickableElement) {
    const id = clickableElement.id;

    // 2. Vérifier si c'est bien une villa (filtrage par préfixe)
    if (id && id.startsWith('villa-')) {
      
      // 3. Gérer la classe CSS "selected-villa"
      this.updateSelectionVisuals(clickableElement as SVGElement);

      // 4. Émettre l'événement vers le parent
      this.villaClicked.emit(id);
    }
  }
}

private updateSelectionVisuals(selectedElement: SVGElement) {
  // a. Retirer la classe 'selected-villa' de l'ancienne sélection
  // On cherche uniquement à l'intérieur de ce composant
  const previousSelected = this.hostElement.nativeElement.querySelector('.selected-villa');
  if (previousSelected) {
    previousSelected.classList.remove('selected-villa');
  }

  // b. Ajouter la classe à la nouvelle villa
  selectedElement.classList.add('selected-villa');
}
}
