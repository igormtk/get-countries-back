export class CountryInfoDto {
  name: string;
  borderCountries: string[];
  population: string | number;
  flag: string;

  constructor(
    name: string,
    borderCountries: string[],
    populationData: string | number,
    flag: string,
  ) {
    this.name = name;
    this.borderCountries = borderCountries;
    this.population = populationData;
    this.flag = flag;
  }
}
