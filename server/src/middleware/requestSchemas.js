import joi from "joi";

export const updateMissionSchema = joi
  .object()
  .keys({
    body: joi.object({
      _id: joi
        .string()
        .alphanum()
        .length(24)
        .required(),
      content: joi.string().required(),
      isCompleted: joi.boolean().required(),
      createdAt: joi.date().required(),
      coordinates: joi
        .object()
        .keys({
          lat: joi.number().required(),
          long: joi.number().required()
        })
        .required()
    })
  })
  .unknown(true);

export const insertMissionSchema = joi
  .object()
  .keys({
    body: joi.object({
      content: joi.string().required(),
      isCompleted: joi.boolean().default(false),
      createdAt: joi.date().default(new Date()),
      coordinates: joi
        .object()
        .keys({
          lat: joi.number().required(),
          long: joi.number().required()
        })
        .required()
    })
  })
  .unknown(true);
