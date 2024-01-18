import { Injectable } from '@angular/core';
import { HousingLocation } from './housinglocation';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  constructor() {}

  url = 'http://localhost:3000/locations';

  async getAllHousingLocations(): Promise<Array<HousingLocation>> {
    const response = await fetch(this.url);
    const housingLocations = await response.json();
    return housingLocations ?? [];
  }

  async getHousingLocation(id: number): Promise<HousingLocation> {
    const response = await fetch(`${this.url}/${id}`);
    return (await response.json()) ?? {};
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(
      `Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`
    );
  }
}
