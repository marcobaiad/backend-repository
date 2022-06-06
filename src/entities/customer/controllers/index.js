import { readFile } from "../../../utils/readFile.js";
import { writeFile } from "../../../utils/writeFile.js";
import { v4 as uuidv4 } from "uuid";

const entityPath = new URL("../entityData/customer.json", import.meta.url);

export const getUserController = (getUser, id) => {
  readFile(
    (data) => {
      if (!id && data) {
        const formatedData = Object.values(data).map((value) => value);
        return getUser(formatedData);
      }
      if (data?.[id]) return getUser([{ ...data[id] }]);
      return getUser(false);
    },
    true,
    entityPath
  );
};

export const createUserController = (user, isCreated) => {
  readFile(
    (data) => {
      // create uuid
      const id = uuidv4();
      // add the User
      const createdUser = { ...user, id };
      if (data) data[id] = createdUser;
      else data = { [id]: createdUser };
      // save User
      writeFile(
        JSON.stringify(data, null, 2),
        () => isCreated(createdUser),
        entityPath
      );
    },
    true,
    entityPath
  );
};

export const editUserHandler = () => {};
