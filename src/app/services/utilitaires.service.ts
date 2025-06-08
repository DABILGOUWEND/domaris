import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitairesService {

  constructor() { }
  convertDate(strdate: string): Date {
    const [day1, month1, year1] = strdate.split("/")
    const date1 = new Date(+year1, +month1 - 1, +day1)
    return date1
  }
}
