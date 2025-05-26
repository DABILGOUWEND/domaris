import { Component, effect, inject, OnInit } from '@angular/core';
import { ImportedModule } from '../../shared/modules/imported/imported.module';
import { ProgrammesService } from '../../services/programmes.service';
import { concat, forkJoin, Observable, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-essai',
  imports: [ImportedModule],
  templateUrl: './essai.component.html',
  styleUrl: './essai.component.scss'
})
export class EssaiComponent implements OnInit {
_programme_service = inject(ProgrammesService);
  ngOnInit() {
    
  }

  
}