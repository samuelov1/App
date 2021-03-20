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
