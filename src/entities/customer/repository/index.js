import {
  createUserController,
  getUserController,
} from "../controllers/index.js";

export const getUser = async (req, res) => {
  const { id } = req.params;
  if (!id)
    return res
      .status(406)
      .send({ message: "Error", message: "Param id is required" });

  const userHandler = (user) => {
    const userExist = user.length;
    const message = userExist ? "Get user successfully" : "Not Found";
    const response = userExist ? user : [];
    res
      .status(!userExist ? 404 : 200)
      .send({ status: "OK", message, response });
  };
  getUserController(userHandler, id);
};

export const getUsers = async (req, res) => {
  const { page = 1 } = req.query;

  const usersHandler = (customers) => {
    const userstExist = customers.length;
    const message = userstExist ? "Get accounts successfully" : "Not Found";
    const response = customers.slice(page * 5 - 5, page * 5);
    const nextPage = page * 5 < userstExist ? Number(page) + 1 : false;
    res.send({ status: "OK", message, response, nextPage });
  };
  getUserController(usersHandler, false);
};

export const createUser = (req, res) => {
  try {
    const createHandler = (created) => {
      if (created) {
        return res.send({
          status: "OK",
          message: "New user created",
          response: [created],
        });
      } else throw new Error();
    };
    createUserController(req.body, createHandler);
  } catch (error) {
    res.status(506).send({
      status: "error",
      error_msg: "Something went wrong when try to create an user",
    });
  }
};

export const editUser = (req, res) => {};
