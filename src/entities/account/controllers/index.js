import fs from "fs";
import { URL } from "url";
import { readFile } from "../../../utils/readFile.js";
import { writeFile } from "../../../utils/writeFile.js";
import { v4 as uuidv4 } from "uuid";
const entityPath = new URL("../entityData/accounts.json", import.meta.url);

export const getAccountController = (getCuenta, id, userId, where) => {
  readFile(
    (data) => {
      if (!data) return getCuenta(false);
      if (id && !userId) {
        const uniqueAccount = data?.[id];
        if (uniqueAccount) return getCuenta([{ ...data[id] }]);
        return getCuenta(false);
      }
      if (!id && userId) {
        const formatedData = Object.values(data).filter(
          (value) => value.userId === userId
        );
        return getCuenta(formatedData);
      }
      if (id && userId) {
        const formatedData = Object.values(data).filter(
          (value) => value.id === id && value.userId === userId
        );
        return getCuenta(formatedData);
      }
      if (where) {
        const termsKey = Object.keys(where);
        let formatedData;
        termsKey.forEach((term) => {
          const filteredValues = Object.values(data).filter((account) =>
            where[term].includes(account[term])
          );
          formatedData = filteredValues.length ? filteredValues : false;
        });
        return getCuenta(formatedData);
      }
    },
    true,
    entityPath
  );
};

export const createAccountController = (newAccount, isCreated) => {
  readFile(
    (data) => {
      // create uuid
      const id = uuidv4();
      // add the account
      const number = Date.now();
      const createdAccount = { id, ...newAccount, number };
      if (data) data[id] = createdAccount;
      else data = { [id]: createdAccount };
      // save account
      writeFile(
        JSON.stringify(data, null, 2),
        () => isCreated(createdAccount),
        entityPath
      );
    },
    true,
    entityPath
  );
};

export const editAccountController = (dataEdit) => {
  readFile(
    (data) => {
      Object.entries(dataEdit).forEach(([key, value]) => {
        data[key] = { ...data[key], ...value };
      });
      writeFile(JSON.stringify(data, null, 2), () => true, entityPath);
    },
    true,
    entityPath
  );
};
