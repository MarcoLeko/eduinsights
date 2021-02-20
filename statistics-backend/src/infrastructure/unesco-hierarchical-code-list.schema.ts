import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UnescoHierarchicalCodeList } from '../domain/unesco-hierarchical-code-list';

export type UnescoHierarchicalCodeListDocument = UnescoHierarchicalCodeListJson &
  Document;

@Schema()
export class UnescoHierarchicalCodeListJson {
  @Prop()
  key: string;
  @Prop()
  HierarchicalCodelist: Array<UnescoHierarchicalCodeList>;
}

export const UnescoHierarchicalCodeListSchema = SchemaFactory.createForClass(
  UnescoHierarchicalCodeListJson,
).set('collection', 'unescoHierarchicalCodeList');
