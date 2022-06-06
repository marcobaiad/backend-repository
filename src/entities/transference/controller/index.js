import { readFile } from "../../../utils/readFile.js";
import { writeFile } from "../../../utils/writeFile.js";
import { v4 as uuidv4 } from "uuid";
import {
  editAccountController,
  getAccountController,
} from "../../account/controllers/index.js";

const entityPath = new URL("../entityData/transference.json", import.meta.url);

export const getTransferencesController = (getTransferences, filtersTerm) => {
  readFile(
    (data) => {
      if (!data) return getTransferences(false);

      const termsKey = Object.keys(filtersTerm);
      let formatedData;
      termsKey.forEach((term) => {
        const filteredValues = Object.values(data).filter((transference) =>
          filtersTerm[term].includes(transference[term])
        );
        formatedData = filteredValues.length ? filteredValues : false;
      });
      if (formatedData.length) return getTransferences(formatedData);
      return getTransferences(false);
    },
    true,
    entityPath
  );
};

export const createTransferenceController = async (
  newTransference,
  createTransference
) => {
  readFile(
    (data) => {
      const { amount, fromAccountId, toAccountId } = newTransference;
      const getAccountsHandler = (accounts) => {
        if (!accounts) return createTransference(false, "Account not found");
        const fromAccount = accounts.find(({ id }) => id === fromAccountId);
        const toAccount = accounts.find(({ id }) => id === toAccountId);
        console.log(
          "file: index.js ~ line 36 ~ getAccountsHandler ~ fromAccount",
          fromAccount,
          "toAccount",
          toAccount
        );
        if (!fromAccount)
          return createTransference(false, "fromAccountId not found");
        if (!toAccount)
          return createTransference(false, "toAccountId not found");
        if (Number(amount) > fromAccount.amount)
          return createTransference(false, "isuficient funds");
        // add Transference
        const id = uuidv4();
        const timestamp = Date.now();
        const createdTransference = {
          id,
          amount: Number(amount),
          fromAccountId,
          toAccountId,
          timestamp,
        };
        if (data) data[id] = createdTransference;
        else data = { [id]: createdTransference };
        editAccountController({
          [fromAccountId]: {
            amount: fromAccount.amount - Number(amount),
          },
          [toAccountId]: {
            amount: toAccount.amount + Number(amount),
          },
        });

        // save Transference
        writeFile(
          JSON.stringify(data, null, 2),
          () => createTransference(createdTransference),
          entityPath
        );
      };

      getAccountController(getAccountsHandler, false, false, {
        id: [fromAccountId, toAccountId],
      });
    },
    true,
    entityPath
  );
};
