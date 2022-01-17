import { User, Board } from "../entity";

export const convertStringToEntity = (entityName: string) => {
  const convertList = {
    ["User"]: User,
    ["Board"]: Board,
  };
  return convertList[entityName];
};
