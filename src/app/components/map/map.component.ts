import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit {
  private map: any;
  constructor() { }

  ngOnInit() {
    this.initMap();
  }
  initMap() {
      // coordonnées des coins 
//-1,480441667	0,005236111
//-1,480347222	0,00524
//-1,480347222	0,005186111
//-1,480441667	0,005186111


    const villaACoords: L.LatLngTuple[] = [
      [0.005236111, -1.480441667],
      [0.005236111, -1.480347222],
      [0.005186111, -1.480347222],
      [0.005186111, -1.480441667]
    ];

    // 1. Définissez les coordonnées des coins de votre image
    // (Exemple : Coordonnées du coin Sud-Ouest et du coin Nord-Est)
    const southWest = L.latLng(0.00546388888888889, -1.48031944444444);
    const northEast = L.latLng(0.00511944444444444,-1.48063611111111);

    // Créez l'objet L.latLngBounds
    const bounds = L.latLngBounds(southWest, northEast);

    // 2. Initialisez la carte en la centrant sur votre plan
    this.map = L.map('map', {
      center: bounds.getCenter(), // Centrer la carte sur les limites de l'image
      //zoom: 17 // Choisissez un niveau de zoom approprié
    });

    // 3. Ajoutez le plan de masse comme superposition d'image
    L.imageOverlay('/planmasse.png', bounds).addTo(this.map);
    const villaA = L.polygon(villaACoords, {
      color: '#000980ff', // Vert (couleur du contour)
      fillColor: '#00f7ffff', // Vert clair (couleur de remplissage)
      //fillOpacity: 0.2, // Faible opacité pour voir le plan de masse en dessous
      weight: 2 // Épaisseur du contour
    }).addTo(this.map);
    this.map.fitBounds(bounds);
    // Optionnel : Ajoutez les tuiles de base (OpenStreetMap) en dessous pour référence
    // const osmTiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { ... });
    // osmTiles.addTo(this.map);
  }
}
