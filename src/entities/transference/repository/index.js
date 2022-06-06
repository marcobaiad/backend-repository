import {
  createTransferenceController,
  getTransferencesController,
} from "../controller/index.js";

export const getTransferences = (req, res) => {
  const { fromAccountId } = req.query;
  if (!fromAccountId)
    return res
      .status(406)
      .send({ status: "error", error_msg: "Param fromAccountId is required" });

  try {
    const transferencesHandler = (transferences) => {
      const transferencesExist = transferences.length;
      const response = transferencesExist ? transferences : [];
      const message = transferencesExist
        ? "Get accounts successfully"
        : "Not Found";
      res
        .status(transferences ? 200 : 404)
        .send({ status: transferences ? "OK" : "error", message, response });
    };
    getTransferencesController(transferencesHandler, { fromAccountId });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "Something whent wrong when try to get transfere",
    });
  }
};

export const createTransference = (req, res) => {
  const { amount, fromAccountId, toAccountId } = req.body;
  console.log(
    "file: index.js ~ line 35 ~ createTransference ~ amount, fromAccountId, toAccountId",
    amount,
    fromAccountId,
    toAccountId
  );
  if (!amount || !fromAccountId || !toAccountId)
    return res.status(406).send({
      status: "error",
      error_msg: "amount, fromAccountId and toAccountId are required",
    });

  try {
    const createTransferenceHandler = (created, error_msg) => {
      if (created) {
        return res.send({
          status: "OK",
          message: "New account created",
          response: [created],
        });
      } else {
        return res.status(406).send({
          status: "error",
          error_msg,
        });
      }
    };
    createTransferenceController(req.body, createTransferenceHandler);
  } catch (error) {
    res.status(506).send({
      status: "error",
      error_msg: "Something went wrong when try to create the account",
    });
  }
};
