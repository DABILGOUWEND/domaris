import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { map } from 'leaflet';

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
    this.map = L.map('map', {
      crs: L.CRS.Simple,
      minZoom: -2
    });
    var w = 1800;
    var h = 2200;
    var bounds: L.LatLngBoundsExpression = [[0, 0], [h, w]];
    L.imageOverlay('/planmasse.png', bounds,
      {
        opacity: 0.7,
        interactive: false,
        alt: 'Plan de masse'
      }
    ).addTo(this.map);

    var villaA: L.LatLngTuple[] =
      [
  [799.53, 1089.02],
  [799.53, 1613.81],
  [507.94, 1613.78],
  [507.94, 1089.02]
]

    var villaB: L.LatLngTuple[] = 
     [
  [1126.96, 13.90],
  [1129.72, 536.41],
  [1037.40, 536.62],
  [1037.40, 603.89],
  [879.53, 603.89],
  [879.53, 659.66],
  [784.69, 659.66],
  [784.69, 603.89],
  [326.15, 603.89],
  [326.15, 783.89],
  [252.18, 783.89],
  [252.18, 13.90]
]
    var villaC: L.LatLngTuple[] =
 [
  [2062.89, 13.90],
  [2052.25, 603.89],
  [1314.53, 603.89],
  [1314.53, 659.66],
  [1224.53, 659.66],
  [1224.53, 536.41],
  [1129.72, 536.41],
  [1126.96, 13.90]
]
    let villas = [villaA, villaB, villaC];
    let colors = ['green', 'orange', 'purple'];
    let fillColors = ['rgba(238, 202, 188, 0.93)', 'rgba(205, 191, 243, 1)', 'rgba(228, 223, 182, 1)'];
    let labelVilla = ['A1-F2', 'A2-F3', 'A3-F3'];
    let areas = [64, 180, 190];

    for (let i = 0; i < villas.length; i++) {
      var polygon = L.polygon(villas[i], {
        color: colors[i],       // Couleur du contour
        fillColor: fillColors[i],  // Couleur de remplissage
        fillOpacity: 0.5,   // Transparence
        weight: 2           // Épaisseur du trait
      }).addTo(this.map);
      var center = polygon.getBounds().getCenter();
      polygon.on('click', this.onZoneClick.bind(this));
      polygon.on('mouseover', ((e: any) => {
        e.target.setStyle({
          fillColor: 'rgba(184, 53, 13, 1)',
          fillOpacity: 0.7
        });

      }).bind(this))
      polygon.on('mouseout', ((e: any) => {
        e.target.setStyle({
          fillColor: fillColors[i],
          fillOpacity: 0.5
        });
      }
      ).bind(this));

      var label = L.marker(center, {
        icon: L.divIcon({
          className: 'label-text-style',
          html: '<b>' + labelVilla[i] + '</b> <br><span>' + areas[i] + ' m²</span>',
          iconSize: [100, 40],
          iconAnchor: [50, 20]
        })
      }).addTo(this.map);
    }
    this.map.fitBounds(bounds);
  }

  onZoneClick(e: any) {
    var layer = e.target; // L'élément cliqué
    var parent = e.sourceTarget; // La couche parente
    parent.setStyle({
      fillColor: '#f00'
    });
  }
}
