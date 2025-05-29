import { ApplicationConfig, provideZoneChangeDetection  ,DEFAULT_CURRENCY_CODE, LOCALE_ID} from '@angular/core';
import { provideRouter } from '@angular/router';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr);
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideHttpClient } from '@angular/common/http';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { registerLocaleData } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'fr-FR' // 'de' for Germany, 'fr' for France ...
    },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: ''
    },
    provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes), provideFirebaseApp(() =>
    initializeApp({
      projectId: "mon-projet-35c49",
      appId: "1:126234609649:web:b81a517b7cc9223ebe2650",
      databaseURL: "https://mon-projet-35c49-default-rtdb.firebaseio.com",
      storageBucket: "mon-projet-35c49.firebasestorage.app",
      apiKey: "AIzaSyARqtsXKUOhLbUmClNevu77-pSuWnixhy8",
      authDomain: "mon-projet-35c49.firebaseapp.com",
      messagingSenderId: "126234609649"
    })),
  provideAuth(() => getAuth()),
  provideFirestore(() => getFirestore()),
  provideFunctions(() => getFunctions()),
  provideStorage(() => getStorage()),
   provideHttpClient(), provideFirebaseApp(() => initializeApp({ projectId: "mon-projet-35c49", appId: "1:126234609649:web:b81a517b7cc9223ebe2650", databaseURL: "https://mon-projet-35c49-default-rtdb.firebaseio.com", storageBucket: "mon-projet-35c49.firebasestorage.app", apiKey: "AIzaSyARqtsXKUOhLbUmClNevu77-pSuWnixhy8", authDomain: "mon-projet-35c49.firebaseapp.com", messagingSenderId: "126234609649" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase()), provideStorage(() => getStorage()) // <-- AJOUTE CETTE LIGNE
]
};
