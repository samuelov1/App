import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import mongoUnit from "mongo-unit";
import * as utils from "../testUtils";
import generateTestData from "../testData";
import { ObjectId } from "mongodb";
import { app } from "../../src/server";

chai.use(chaiHttp);

const testData = generateTestData();
const expectedMissions = utils.parseData(testData.missions);

describe("Missions route", () => {
  beforeEach(() => mongoUnit.load(testData));

  afterEach(() => mongoUnit.drop());

  describe("GET: /missions", () => {
    it("Should return a list of missions", (done) => {
      chai
        .request(app)
        .get("/missions")
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.body).to.deep.have.same.members(expectedMissions);
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe("PUT: /missions", () => {
    it("Should update mission", (done) => {
      const originalMission = expectedMissions[0];
      const missionToUpdate = {
        _id: originalMission._id,
        isCompleted: !originalMission.isCompleted,
        content: "New Content",
        createdAt: new Date(),
        coordinates: {
          lat: Math.random() * 100,
          long: Math.random() * 100
        }
      };

      const expected = utils.parseData(missionToUpdate);

      chai
        .request(app)
        .put("/missions")
        .send(missionToUpdate)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.body).to.deep.equal(expected);
          expect(res).to.have.status(201);
          done();
        });
    });

    it("Should return notFoundError if no missions with given Id was found", (done) => {
      const originalMission = expectedMissions[0];
      const invalidMission = {
        ...originalMission,
        _id: new ObjectId()
      };

      chai
        .request(app)
        .put("/missions")
        .send(invalidMission)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(404);
          done();
        });
    });

    it("Should return ValidationError if invalid body is sent", (done) => {
      const originalMission = expectedMissions[0];
      const invalidMission = {
        ...originalMission,
        coordinates: {
          lat: Math.random() * 100,
          long: "invalid longtitude"
        }
      };

      chai
        .request(app)
        .put("/missions")
        .send(invalidMission)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(422);
          done();
        });
    });
  });

  describe("POST: /missions", () => {
    it("Should insert mission", (done) => {
      const missionToInsert = {
        isCompleted: false,
        content: "New Content",
        createdAt: new Date(),
        coordinates: {
          lat: Math.random() * 100,
          long: Math.random() * 100
        }
      };

      const expected = utils.parseData(missionToInsert);

      chai
        .request(app)
        .post("/missions")
        .send(missionToInsert)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.body._id).to.exist;
          expect(res.body.createdAt).to.exist;
          expected._id = res.body._id;
          expected.createdAt = res.body.createdAt;
          expect(res.body).to.deep.equal(expected);
          expect(res).to.have.status(201);
          done();
        });
    });

    it("Should set isCompleted: false, createdAt:[currentDate] as defaults if not given", (done) => {
      const missionToInsert = {
        content: "New Content",
        coordinates: {
          lat: Math.random() * 100,
          long: Math.random() * 100
        }
      };

      chai
        .request(app)
        .post("/missions")
        .send(missionToInsert)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.body.isCompleted).to.be.false;

          const createdAtTimestamp = new Date(res.body.createdAt).getTime();
          const expectTimestamp = new Date().getTime();
          const delta = 100000;
          expect(createdAtTimestamp).to.be.closeTo(expectTimestamp, delta);

          expect(res).to.have.status(201);
          done();
        });
    });

    it("Should return ValidationError if invalid body is sent", (done) => {
      const invalidMission = {
        content: "New Content",
        coordinates: {
          lat: Math.random() * 100,
          long: "invalid longtitude"
        }
      };

      chai
        .request(app)
        .post("/missions")
        .send(invalidMission)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(422);
          done();
        });
    });
  });
});
