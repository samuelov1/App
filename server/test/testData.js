import { ObjectId } from "mongodb";

export default () => ({
  missions: [
    {
      _id: ObjectId("601bae6c0eaac592041a693b"),
      content: "Clean the house",
      isCompleted: false,
      createdAt: new Date(),
      coordinates: {
        lat: Math.random() * 100,
        long: Math.random() * 100
      }
    },
    {
      _id: ObjectId("601baef70eaac592041a693c"),
      content: "Walk the dog",
      isCompleted: false,
      createdAt: new Date(),
      coordinates: {
        lat: Math.random() * 100,
        long: Math.random() * 100
      }
    },
    {
      _id: ObjectId("601baf200eaac592041a693d"),
      content: "Clean the bathroom",
      isCompleted: true,
      createdAt: new Date(),
      coordinates: {
        lat: Math.random() * 100,
        long: Math.random() * 100
      }
    },
    {
      _id: ObjectId("601bafb50eaac592041a6940"),
      content: "Wash the dishes",
      isCompleted: false,
      createdAt: new Date(),
      coordinates: {
        lat: Math.random() * 100,
        long: Math.random() * 100
      }
    }
  ]
});
