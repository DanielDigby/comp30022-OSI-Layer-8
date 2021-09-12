import supertest from "supertest";
import express from "express";
import mongoose from "mongoose";
var bodyParser = require('body-parser');


const db = require("../../config/mongoose/testing");
const app = require("../../index");
const noteController = require("./noteController");

app.use(bodyParser.urlencoded({ extended: true }));


const Note = mongoose.model("Note");

beforeAll(async () => {
    await db.createTestingDB();
    await db.connectTestingDB();
});

afterEach(async () => {
    await db.clearTestingDB();
});

afterAll(async () => {
    await db.closeTestingDB();
});

describe("Note route tests", () => {
    describe("Get all notes", () => {
        it(
            "When all notes are correctly retrieved:\n" +
                "- success code\n" +
                "- notes in response body\n",
            async () => {

                // add 3 new notes to testing database
                const note1 = new Note({
                    title: "test1",
                    text: "test1",
                    image: "test1",
                    reminderTime: new Date("2021-01-09"),
                    eventTime: new Date("2021-01-09"),
                    pinned: true,
                    tags: [],
                    relatedNotes: [],
                });
                await note1.save();

                const note2 = new Note({
                    title: "test2",
                    text: "test2",
                    image: "test2",
                    reminderTime: new Date("2021-01-09"),
                    eventTime: new Date("2021-01-09"),
                    pinned: true,
                    tags: [],
                    relatedNotes: [],
                });
                await note2.save();

                const note3 = new Note({
                    title: "test3",
                    text: "test3",
                    image: "test3",
                    reminderTime: new Date("2021-01-09"),
                    eventTime: new Date("2021-01-09"),
                    pinned: true,
                    tags: [],
                    relatedNotes: [],
                });
                await note3.save();

                const res = await supertest(app).get("/api/notes/");
                expect(res.statusCode).toBe(200);
                expect(res.body.length).toBe(3);
            }
        );

        // it(
        //     "When incorrect new user object is provided expect return to be:" +
        //         "user error code",
        //     () => {}
        // );
    });

    describe("Get a specific note", () => {
        it(
            "When a note is correctly retrieved:" +
                "success code" +
                "Note object in response body",
            async () => {
                const note1 = new Note({
                    title: "title1",
                    text: "text1",
                    image: "image1",
                    reminderTime: new Date("2021-01-09"),
                    eventTime: new Date("2021-01-09"),
                    pinned: true,
                    tags: [],
                    relatedNotes: [],
                });
                await note1.save();

                const id = (await Note.findOne({ title: "title1" }))._id;

                const res = await supertest(app).get(`/api/notes/${id}`);
                expect(res.statusCode).toBe(200);
                console.log(res.body)
                // expect(res.body._id).toStrictEqual(id);
                expect(res.body.title).toEqual("title1");
                expect(res.body.text).toEqual("text1");
                expect(res.body.image).toEqual("image1");
                // expect(res.body.reminderTime).toEqual((new Date("2021-01-09")).toDateString());
                // expect(res.body.eventTime).toEqual((new Date("2021-01-09")).toDateString());
                expect(res.body.pinned).toEqual(true);
                expect(res.body.tags).toEqual([]);
                expect(res.body.relatedNotes).toEqual([]);
            }
        );

        // it(
        //     "When incorrect username or password are provided expect return to be:" +
        //         "user error code",
        //     () => {}
        // );
    });
});
