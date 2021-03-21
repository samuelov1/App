import DB from "../DB";
import { ObjectId } from "mongodb";

const collectionName = "missions";

export const getAllMissions = async (req, res) => {
  try {
    const missions = await DB.find(collectionName);
    res.status(200).send(missions);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: "error", message: "Could not get all missions" });
  }
};

export const updateMission = async (req, res) => {
  try {
    const { _id, ...missionToUpdate } = req.body;

    const filter = { _id: ObjectId(_id) };
    const update = { $set: missionToUpdate };
    const options = { returnOriginal: false };

    const updatedMission = await DB.findOneAndUpdate(
      collectionName,
      filter,
      update,
      options
    );

    if (!updatedMission) {
      return res.status(404).send({
        status: "error",
        message: `Could not find mission with id ${_id}`
      });
    }

    res.status(201).send(updatedMission);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: "error",
      message: "Could not update mission"
    });
  }
};

export const insertMission = async (req, res) => {
  try {
    const missionToInsert = req.body;
    const insertedMission = await DB.insertOne(collectionName, missionToInsert);

    res.status(201).send(insertedMission);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: "error",
      message: "Could not insert mission"
    });
  }
};

export const deleteMission = async (req, res) => {
  try {
    const id = req.params.id;
    const filter = { _id: ObjectId(id) };

    const deletedMission = await DB.findOneAndDelete(collectionName, filter);

    if (!deletedMission) {
      return res.status(404).send({
        status: "error",
        message: `Could not find mission with id ${id}`
      });
    }

    res.status(200).send({ id });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: "error",
      message: "Could not delete mission"
    });
  }
};

export const deleteMultipleMissions = async (req, res) => {
  try {
    const ids = req.body.ids.map((id) => ObjectId(id));
    const filter = { _id: { $in: ids } };

    const result = await DB.deleteMany(collectionName, filter);

    if (!result.ok) {
      throw new Error("MongoDB deleteMany command did not excecute correctly");
    }

    res.status(200).send({ deletedCount: result.n });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: "error",
      message: "Could not delete mission"
    });
  }
};
