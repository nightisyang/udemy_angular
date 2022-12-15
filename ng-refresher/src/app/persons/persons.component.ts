import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PersonsService } from './service/persons.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css'],
})
export class PersonsComponent implements OnInit, OnDestroy {
  // private personService: PersonsService;
  private personListSubs!: Subscription;

  constructor(private prsService: PersonsService) {
    // this.personList = prsService.persons; // This is not a good idea, you want to specify when in the lifecycle you want to access the data.
    // this.personService = prsService; // Instead of declaring a new property and assigning private prsService to it, we can use the shorthand syntax in the constructor.
  }

  personList!: string[];

  ngOnInit(): void {
    this.personListSubs = this.prsService.personsChanged.subscribe(
      (persons) => {
        this.personList = persons;
      }
    );
    this.prsService.fetchPersons();
  }

  onRemovePerson(personName: string) {
    this.prsService.removePerson(personName);
  }

  ngOnDestroy(): void {
    this.personListSubs.unsubscribe();
  }
}
