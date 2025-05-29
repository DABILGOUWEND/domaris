import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { forkJoin, from, map, Observable, switchMap, take } from 'rxjs';


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
  getCollectionAlternative(): Observable<any[]> {
    return this.getProgrammes().pipe(
      switchMap(programmes => {
        // For each programme, fetch its phases
        const programmesWithPhases$ = programmes.map(programme =>
          this.getPhases(programme.id).pipe(
            take(1), // Take 1 emission of phases
            switchMap(phases => {
              // For each phase, fetch its budgets, depenses, and taches
              const phasesWithSubCollections$ = phases.map(phase =>
                forkJoin({
                  budgets: this.getBudgets(phase.id, programme.id).pipe(take(1)), // Take 1 emission
                  depenses: this.getDepenses(phase.id, programme.id).pipe(take(1)), // Take 1 emission
                  taches: this.getTaches(phase.id, programme.id).pipe(take(1)) // Take 1 emission
                }).pipe(
                  map(subCollections => ({ ...phase, ...subCollections })) // Merge phase with subcollection data
                )
              );
              // Wait for all phases with subcollections to be fetched for this programme
              return forkJoin(phasesWithSubCollections$).pipe(
                map(phasesWithData => ({ ...programme, phases: phasesWithData })) // Merge programme with its phases data
              );
            })
          )
        );
        // Wait for all programmes with their phases (and subcollections) to be fetched
        return forkJoin(programmesWithPhases$);
      })
    );

  }
  addProgramme(programme: any) {
    const ref = collection(this.firestore, 'programmes');
    return from(addDoc(ref, programme).then(response => response.id));
  }
  add_sousCollection(programmeId: string, ss_collectionName: string) {
    ;
    const ref = collection(this.firestore, `programmes/${programmeId}/${ss_collectionName}`);
    return from(addDoc(ref, {}).then(response => response.id));
  }

  updateProgramme(data: any): Observable<any> {
    let id = data.id
    const docRef = doc(this.firestore, `programmes/${id}`);
    const promise = setDoc(docRef, data)
    return from(promise)
  }
}
