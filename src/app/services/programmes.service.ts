import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { concat, forkJoin, from, map, Observable, switchMap, take } from 'rxjs';


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
  getDocuments(programmeId: string): Observable<any[]> {
    const ref = collection(this.firestore, `programmes/${programmeId}/documents`);
    return collectionData(ref, { idField: 'id' });
  }
  getBudgets(programmeId: string) {
    const ref = collection(this.firestore, `programmes/${programmeId}/budgets`);
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

  add_sousCollection(programmeId: string, ss_collectionName: string, data: any) {
    
    const ref = collection(this.firestore, `programmes/${programmeId}/${ss_collectionName}`);
    return from(addDoc(ref, data).then(response => response.id));
  }
  add_multipleSousCollection(programmeId: string, ss_collectionName: string, data: any[]) {
    const promises = data.map(item => { 
      const ref = collection(this.firestore, `programmes/${programmeId}/${ss_collectionName}`);
      return addDoc(ref, item).then(response => response.id);
    }
    );
    return forkJoin(promises);
  }
  get_sousCollection(programmeId: string, ss_collectionName: string): Observable<any[]> {
    const ref = collection(this.firestore, `programmes/${programmeId}/${ss_collectionName}`);
    return collectionData(ref, { idField: 'id' });
  }
  update_sousCollection(programmeId: string, ss_collectionName: string, data: any) {
    const docRef = doc(this.firestore, `programmes/${programmeId}/${ss_collectionName}/${data.id}`);
    const promise = setDoc(docRef, data)
    return from(promise)
  }
  remove_sousCollection(programmeId: string, ss_collectionName: string, id: string) {
    const docRef = doc(this.firestore, `programmes/${programmeId}/${ss_collectionName}/${id}`);
    return from(deleteDoc(docRef));
  }
  addProgramme(programme: any) {
    const ref = collection(this.firestore, 'programmes');
    return from(addDoc(ref, programme).then(response => response.id));
  }

  updateProgramme(data: any): Observable<any> {
    let id = data.id
    const docRef = doc(this.firestore, `programmes/${id}`);
    const promise = setDoc(docRef, data)
    return from(promise)
  }
removeProgramme(programmeId: string): Observable<void> {
  // First, get all documents in subcollections and delete them
  const phases$ = this.getPhases(programmeId).pipe(
    take(1),
    switchMap(phases => {
      if (phases.length === 0) return from([]);
      const deletePromises = phases.map(phase => 
        deleteDoc(doc(this.firestore, `programmes/${programmeId}/phases/${phase.id}`))
      );
      return forkJoin(deletePromises);
    })
  );

  const budgets$ = this.getBudgets(programmeId).pipe(
    take(1),
    switchMap(budgets => {
      if (budgets.length === 0) return from([]);
      const deletePromises = budgets.map(budget => 
        deleteDoc(doc(this.firestore, `programmes/${programmeId}/budgets/${budget.id}`))
      );
      return forkJoin(deletePromises);
    })
  );


  // Delete all subcollection documents first, then delete the main document
  return forkJoin([phases$, budgets$]).pipe(
    switchMap(() => {
      const docRef = doc(this.firestore, `programmes/${programmeId}`);
      return from(deleteDoc(docRef));
    })
  );
}
}
