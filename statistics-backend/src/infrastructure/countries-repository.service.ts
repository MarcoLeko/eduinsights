import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Countries, CountriesDocument } from './schema/countries.schema';

@Injectable()
export class CountriesRepository {
  constructor(
    @InjectModel(Countries.name)
    private readonly countriesModel: Model<CountriesDocument>,
  ) {}

  public async getCountriesGeoJson() {
    return this.countriesModel.findOne({ key: 'geoJson' }).exec();
  }
}
