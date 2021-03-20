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
});
