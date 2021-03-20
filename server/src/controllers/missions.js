import DB from "../DB";

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
