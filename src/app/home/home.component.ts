import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housinglocation';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter />
        <button
          class="primary"
          type="button"
          (click)="filterResults(filter.value)"
        >
          Search
        </button>
      </form>
    </section>
    <section class="results">
      @for (housingLocation of filteredHousingLocationList; track
      housingLocation.id) {
      <app-housing-location [housingLocation]="housingLocation" />
      }
    </section>
  `,
  styleUrl: './home.component.css',
})
export class HomeComponent {
  housingLocationList: Array<HousingLocation> = [];
  housingService: HousingService = inject(HousingService);

  filteredHousingLocationList: Array<HousingLocation> = [];

  constructor() {
    this.housingService
      .getAllHousingLocations()
      .then((housingLocationList: Array<HousingLocation>) => {
        this.housingLocationList = housingLocationList;
        this.filteredHousingLocationList = housingLocationList;
      });
  }

  filterResults(text: string): void {
    if (!text) this.filteredHousingLocationList = this.housingLocationList;

    this.filteredHousingLocationList = this.housingLocationList.filter(
      (housingLocation) =>
        housingLocation.city.toLowerCase().includes(text.toLowerCase())
    );
  }
}
