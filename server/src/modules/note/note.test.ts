import supertest from "supertest";
import mongoose from "mongoose";
var bodyParser = require("body-parser");

const db = require("../../config/mongoose/testing");
const app = require("../../index");

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
                    _clientId: "somelongidgeneratedclientside",
                    title: "title1",
                    text: "text1",
                    image: "img",
                    reminderTime: new Date("2021-01-09"),
                    eventTime: new Date("2021-01-09"),
                    pinned: true,
                    tags: [],
                    relatedNotes: [],
                });
                await note1.save();

                const note2 = new Note({
                    _clientId: "somelongidgeneratedclientside",
                    title: "title2",
                    text: "text2",
                    image: "img",
                    reminderTime: new Date("2021-01-09"),
                    eventTime: new Date("2021-01-09"),
                    pinned: true,
                    tags: [],
                    relatedNotes: [],
                });
                await note2.save();

                const note3 = new Note({
                    _clientId: "somelongidgeneratedclientside",
                    title: "title3",
                    text: "text3",
                    image: "img",
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
    });

    describe("Get a specific note", () => {
        it(
            "When a note is correctly retrieved:" +
                "- success code" +
                "- Note object in response body",
            async () => {
                const note = {
                    _clientId: "somelongidgeneratedclientside",
                    title: "title",
                    text: "text",
                    image: "img",
                    reminderTime: new Date("2021-01-09").toISOString(),
                    eventTime: new Date("2021-01-09").toISOString(),
                    pinned: true,
                };
                await new Note(note).save();

                const id = (await Note.findOne({ title: "title" }))._id;
                const res = await supertest(app).get(`/api/notes/${id}`);
                expect(res.statusCode).toBe(200);
                expect(res.body).toMatchObject(note);
            }
        );
    });

    describe("Post a new note", () => {
        it(
            "When a note is correctly posted:" +
                "- success code" +
                "- Note object in response body" +
                "- number of Note documents to increase by 1",
            async () => {
                const count = await Note.countDocuments();
                const note = {
                    _clientId: "somelongidgeneratedclientside",
                    title: "title",
                    text: "text",
                    image: "img",
                    reminderTime: new Date("2021-01-09").toISOString(),
                    eventTime: new Date("2021-01-09").toISOString(),
                    pinned: true,
                    tags: ["tag"],
                };

                const res = await supertest(app).post("/api/notes/").send(note);

                const newCount = await Note.countDocuments();

                expect(res.statusCode).toBe(200);
                expect(res.body).toMatchObject(note);
                expect(newCount).toEqual(count + 1);
            }
        );
    });

    describe("Update/put a specific note", () => {
        it(
            "When a note is correctly updated:" +
                "- success code" +
                "- Note object in response body",
            async () => {
                const note = {
                    _clientId: "somelongidgeneratedclientside",
                    title: "title",
                    text: "text",
                    image: "img",
                    reminderTime: new Date("2021-01-09").toISOString(),
                    eventTime: new Date("2021-01-09").toISOString(),
                    pinned: true,
                };
                await new Note(note).save();
                const id = (await Note.findOne({ title: "title" }))._id;

                const changedNote = {
                    _clientId: "somelongidgeneratedclientside",
                    title: "putChange",
                    text: "putChange",
                    image: "img",
                    reminderTime: new Date("2021-01-09").toISOString(),
                    eventTime: new Date("2021-01-09").toISOString(),
                    pinned: true,
                };

                const res = await supertest(app)
                    .put(`/api/notes/${id}`)
                    .send(changedNote);
                expect(res.statusCode).toBe(200);
                expect(res.body).toMatchObject(changedNote);
            }
        );
    });

    describe("Delete a specific note", () => {
        it(
            "When a note is correctly deleted:" +
                "- success code" +
                "- Note object in response body",
            async () => {
                const note = {
                    _clientId: "somelongidgeneratedclientside",
                    title: "title",
                    text: "text",
                    image: "img",
                    reminderTime: new Date("2021-01-09").toISOString(),
                    eventTime: new Date("2021-01-09").toISOString(),
                    pinned: true,
                };
                await new Note(note).save();
                const id = (await Note.findOne({ title: "title" }))._id;

                const res = await supertest(app).delete(`/api/notes/${id}`);
                expect(res.statusCode).toBe(200);
            }
        );
    });
});