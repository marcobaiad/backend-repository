import {
  createAccountController,
  editAccountController,
  getAccountController,
} from "../controllers/index.js";

export const getAccount = (req, res) => {
  let accountExist = false;
  let response = [];
  let message = "Not Found";

  if (req.params?.id) {
    const accountHandler = (cuenta) => {
      accountExist = cuenta.length;
      if (accountExist) {
        response = cuenta;
        message = "Get account successfully";
      }
      res
        .status(cuenta ? 200 : 404)
        .send({ status: cuenta ? "OK" : "error", message, response });
    };
    return getAccountController(accountHandler, req.params.id);
  }
  const { id, userId } = req.query;
  if (!id || !userId)
    return res.status(406).send({
      message: "Error",
      message: "id, and accoundId params are required",
    });

  const accountHandler = (cuenta) => {
    accountExist = cuenta.length;
    if (accountExist) {
      response = cuenta;
      message = "Get account successfully";
    }
    res
      .status(cuenta ? 200 : 404)
      .send({ status: cuenta ? "OK" : "error", message, response });
  };
  getAccountController(accountHandler, id, userId);
};

export const getAccounts = (req, res) => {
  const { page = 1, userId } = req.query;
  if (!userId)
    return res
      .status(406)
      .send({ status: "error", message: "Param userId is required" });

  if (isNaN(page))
    return res
      .status(406)
      .send({ status: "error", message: "page param must be a number" });

  try {
    const accountHandler = (cuentas) => {
      console.log(
        "file: index.js ~ line 60 ~ accountHandler ~ cuentas",
        cuentas
      );
      const accountExist = cuentas.length;
      const response = cuentas.slice(page * 5 - 5, page * 5);
      const message = response.length
        ? "Get accounts successfully"
        : "Not Found";
      const nextPage = page * 5 < accountExist ? Number(page) + 1 : false;
      res.send({ status: "OK", message, response, nextPage });
    };
    getAccountController(accountHandler, false, userId);
  } catch (error) {
    res.status(500).send({
      status: "error",
      error_msg: "Something went wrong when try to get accounts",
    });
  }
};

export const createAccount = (req, res) => {
  const { userId } = req.body;
  if (!userId)
    return res
      .status(406)
      .send({ status: "error", error_msg: "userId is required" });

  try {
    const isCreated = (created) => {
      if (created) {
        return res.send({
          status: "OK",
          message: "New account created",
          response: [created],
        });
      } else throw new Error();
    };
    createAccountController(req.body, isCreated);
  } catch (error) {
    res.status(506).send({
      status: "error",
      error_msg: "Something went wrong when try to create the account",
    });
  }
};

export const editAccount = (req, res) => {
  const { from, to } = req.body;
  if (!from || !to)
    return res
      .status(406)
      .send({ status: "error", error_msg: "from and to are required" });

  try {
    if (editAccountController(from, to))
      return res
        .status(200)
        .send({ status: "OK", message: "Account edited successfully" });
  } catch (error) {
    res.status(506).send({
      status: "error",
      error_msg: "Something went wrong when try to edit the account",
    });
  }
};
