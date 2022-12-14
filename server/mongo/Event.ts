import { Schema, model } from "mongoose";

export interface IEvent {
    title: String;
    start: Date;
    end: Date;
    category: String;
    tags: String[];
}

const EventSchema = new Schema<IEvent>(
    {
        title: {
            type: String,
            required: true,
        },
        start: {
            type: Date,
            required: true,
        },
        end: {
            type: Date,
            required: true,
        },
        category: {
            type: String,
            default: 'undefined'
        }, 
        tags: [String],
    },
    {
        timestamps: true,
    }
);

export const Event = model<IEvent>("Event", EventSchema);
