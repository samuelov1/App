import joi from "joi";

const idSchema = joi
  .string()
  .alphanum()
  .length(24)
  .required();

const missionSchema = joi.object({
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
});

export const updateMissionSchema = joi
  .object()
  .keys({
    body: joi
      .object({
        _id: idSchema
      })
      .concat(missionSchema)
  })
  .unknown(true);

export const insertMissionSchema = joi
  .object()
  .keys({
    body: missionSchema
  })
  .unknown(true);

export const missionIdSchema = joi
  .object()
  .keys({
    params: joi.object({
      id: idSchema
    })
  })
  .unknown(true);

export const missionIdListSchema = joi
  .object()
  .keys({
    body: joi.object({
      ids: joi.array().items(idSchema)
    })
  })
  .unknown(true);
