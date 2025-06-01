import { inject, Injectable } from '@angular/core';
import { getStorage, FirebaseStorage, getDownloadURL, deleteObject, ref, uploadBytes } from '@angular/fire/storage';
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  _storage: FirebaseStorage;

  constructor() {
    this._storage = getStorage();
  }

  // Upload un fichier
  async uploadFile(path: string, file: Blob): Promise<string> {
    const storageRef = ref(this._storage, path);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  }

  // Récupère l'URL de téléchargement d'un fichier
  async getFileUrl(path: string): Promise<string> {
    const storageRef = ref(this._storage, path);
    return getDownloadURL(storageRef);
  }

  // Supprime un fichier
  async deleteFile(path: string): Promise<void> {
    const storageRef = ref(this._storage, path);
    await deleteObject(storageRef);
  }
}
