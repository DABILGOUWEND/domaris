import { HttpClient, HttpHeaders, HttpParams, httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilitairesService {
 
  _http = inject(HttpClient);
  constructor() { }
  convertDate(strdate: string): Date {
    const [day1, month1, year1] = strdate.split("/")
    const date1 = new Date(+year1, +month1 - 1, +day1)
    return date1
  }
  generateRandomPassword(length: number = 12): string {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = "";

    // Ensure at least one character from each type
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*";

    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];

    // Fill the rest randomly
    for (let i = 4; i < length; i++) {
      password += charset[Math.floor(Math.random() * charset.length)];
    }

    // Shuffle the password
    return password.split('').sort(() => Math.random() - 0.5).join('');
  }
  test_webhook(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `wendson1982`
    });
    const params = new HttpParams()
      .set('key', "1d8b905142ee47deafe183222252610")
      .set('q', 'Paris');
    const body = {
      "prenom": "wend-lassida",
      "nom": "DABILGOU"
    }
    return this._http.post<any>('https://n8n.solubtp.com/webhook/essai',
      body ,{ headers})
  }
}
