import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import {
  UnescoHierarchicalCodeList,
  UnescoHierarchicalCodeListDocument,
} from './schema/unesco-hierarchical-code-list.schema';

@Injectable()
export class UnescoHierarchicalCodeListRepository {
  constructor(
    @InjectModel(UnescoHierarchicalCodeList.name)
    private readonly unescoHierarchicalCodeListModel: Model<UnescoHierarchicalCodeListDocument>,
  ) {}

  public async getHierarchicalCodeList() {
    return this.unescoHierarchicalCodeListModel
      .findOne({ key: 'unescoHierarchicalCodeList' })
      .exec();
  }
}
