import { inject, Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { forkJoin, map, Observable, switchMap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProgrammesService {
firestore: Firestore = inject(Firestore);


  getProgrammes(): Observable<any[]> {
    const ref = collection(this.firestore, 'programmes');
    return collectionData(ref, { idField: 'id' });
  }

  getPhases(programmeId: string): Observable<any[]> {
    const ref = collection(this.firestore, `programmes/${programmeId}/phases`);
    return collectionData(ref, { idField: 'id' });
  }

  getBudgets(phaseId: string, programmeId: string) {
    const ref = collection(this.firestore, `programmes/${programmeId}/phases/${phaseId}/budget`);
    return collectionData(ref, { idField: 'id' });
  }

  getDepenses(phaseId: string, programmeId: string) {
    const ref = collection(this.firestore, `programmes/${programmeId}/phases/${phaseId}/depenses`);
    return collectionData(ref, { idField: 'id' });
  }

  getTaches(phaseId: string, programmeId: string) {
    const ref = collection(this.firestore, `programmes/${programmeId}/phases/${phaseId}/taches`);
    return collectionData(ref, { idField: 'id' });
  }
getCollection() {
  return this.getProgrammes().pipe(
    switchMap(programmes =>
      forkJoin(
        programmes.map(programme =>
          this.getPhases(programme.id).pipe(
            switchMap(phases =>
              forkJoin(
                phases.map(phase =>
                  forkJoin({
                    budgets: this.getBudgets(phase.id, programme.id),
                    depenses: this.getDepenses(phase.id, programme.id),
                    taches: this.getTaches(phase.id, programme.id)
                  }).pipe(
                    map(data => ({ ...phase, ...data }))
                  )
                )
              ).pipe(
                map(phasesWithData => ({ ...programme, phases: phasesWithData }))
              )
            )
          )
        )
      )
    )
  );
}

}
