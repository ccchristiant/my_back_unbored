import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose';

export enum Gender {
    HOMME = "Homme",
    FEMME = "Femme",
    AUTRE = "Autre",
}

@Schema()
export class User extends Document {

    @Prop({unique: [ true, 'Duplicated username entered']})
    username: string;
    
    @Prop({unique: [ true, 'Duplicated email entered']})
    email: string;

    @Prop()
    password: string;

    @Prop({unique: [true, 'number already used']})
    number: string;

    @Prop()
    gender: Gender;

    @Prop()
    birthdate: Date;

    @Prop()
    preferences: string[];

    @Prop()
    reservations: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);