import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, setDoc } from '@angular/fire/firestore';
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
 getDocuments(programmeId: string): Observable<any[]> {
    const ref = collection(this.firestore, `programmes/${programmeId}/documents`);
    return collectionData(ref, { idField: 'id' });
  }
  getBudgets( programmeId: string) {
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
  removeProgramme(programmeId: string): Observable<void> {
    const docRef = doc(this.firestore, `programmes/${programmeId}`);
  return from(deleteDoc(docRef));
  }
}
