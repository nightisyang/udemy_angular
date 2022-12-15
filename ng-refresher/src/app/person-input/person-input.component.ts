import { Component } from '@angular/core';
import { PersonsService } from '../persons/service/persons.service';

@Component({
  selector: 'app-person-input',
  templateUrl: './person-input.component.html',
  styleUrls: ['./person-input.component.css'],
})
export class PersonInputComponent {
  constructor(private personService: PersonsService) {}
  enteredPersonName: string = '';

  onCreatePerson() {
    console.log('Created a Person: ' + this.enteredPersonName);
    this.personService.addPerson(this.enteredPersonName);
    this.enteredPersonName = '';
  }
}
