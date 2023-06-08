import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Events extends Document {
  @Prop({ unique: [true, 'Duplicated activities entered'] })
  name: string;

  @Prop()
  address: string;

  @Prop()
  rate: string[];

  @Prop()
  categories: string[];
}

export const EventSchema = SchemaFactory.createForClass(Events);
