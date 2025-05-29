import { Component, signal } from '@angular/core';
import { ImportedModule } from '../../shared/modules/imported/imported.module';
import { RouterOutlet } from '@angular/router';
import { CreationCompteComponent } from '../creation-compte/creation-compte.component';
import { CreationProgrammeComponent } from '../creation-programme/creation-programme.component';
import { Programme } from '../../modeles/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  imports: [ImportedModule,CreationProgrammeComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
selectedProgrammme=signal<Programme|undefined>(undefined);
is_updated=signal(false)
mformgroup:FormGroup
constructor(
  private fb:FormBuilder
){
  this.mformgroup=this.fb.group({
      nom: ['', Validators.required],
      description: [''],
      type: ['', Validators.required],
      statut: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      budgetPrevu: [null, [Validators.required, Validators.min(0)]],
      pays: ['', Validators.required],
      ville: ['', Validators.required],
      quartier: ['', Validators.required],
      responsableId: ['', Validators.required],
      code: ['', Validators.required]
      // createdAt, updatedAt, phases, documents sont gérés côté backend ou dynamiquement
    });
}

Modifprogramme(row:any){
  this.selectedProgrammme.set(row)
  this.is_updated.set(true)
  this.mformgroup.patchValue(row)
}
AddProgramme(){
this.is_updated.set(false);
this.selectedProgrammme.set(undefined);
}
}
