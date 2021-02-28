import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { HierarchicalCodeList } from '../../domain/hierarchical-code-list';

export type UnescoHierarchicalCodeListDocument = UnescoHierarchicalCodeList &
  Document;

@Schema()
export class UnescoHierarchicalCodeList {
  @Prop()
  key: string;
  @Prop()
  HierarchicalCodelist: Array<HierarchicalCodeList>;
}

export const UnescoHierarchicalCodeListSchema = SchemaFactory.createForClass(
  UnescoHierarchicalCodeList,
).set('collection', 'unescoHierarchicalCodeList');
