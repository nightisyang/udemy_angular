import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PersonsService {
  constructor(private http: HttpClient) {}

  personsChanged = new Subject<string[]>();
  persons: string[] = [];

  addPerson(name: string) {
    this.persons.push(name);
    this.personsChanged.next(this.persons);
    console.log(this.persons);
  }

  removePerson(name: string) {
    this.persons = this.persons.filter((person) => {
      return person !== name;
    });
    this.personsChanged.next(this.persons);
  }

  fetchPersons() {
    this.http
      .get<any>('https://swapi.dev/api/people/')
      .pipe(
        map((resData) => {
          return resData.results.map((char: { name: string }) => char.name);
        })
      )
      .subscribe((transformedData) => {
        console.log(transformedData);
        this.personsChanged.next(transformedData);
      });
  }
}
