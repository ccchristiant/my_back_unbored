import express from "express";
import { IEvent, Event } from "../../mongo/Event"

const router = express.Router();

router.post('/event/create', async (req, res) => {
    const data: IEvent = {
        title: req.body.title,
        start: req.body.start,
        end: req.body.end,
        category: req.body.category,
        tags: req.body.tags
    };

    const event = new Event(data);
    try {
        await event.save();
        res.status(201).send(event);
    } catch (err: any) {
        res.status(500).send(err.message);
    }
})

router.get('/event', async (req, res) => {
    try {
        const events = await Event.find({});

        res.status(200).send(events);
    } catch (err: any) {
        res.status(500).send(err.message);
    }
})

router.put('/event/:id', async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });

        res.status(200).send(event);
    } catch (err: any) {
        res.status(500).send(err.message);
    }
});

router.delete('/event/:id', async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id, req.body);

        res.status(200).send(event);
    } catch (err: any) {
        res.status(500).send(err.message);
    }
});

export {router as Event}
