import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import mongoUnit from "mongo-unit";
import * as utils from "../testUtils";
import generateTestData from "../testData";
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
});
