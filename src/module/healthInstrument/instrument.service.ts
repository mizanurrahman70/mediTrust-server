import QueryBuilder from "../../builder/QueryBuilder";
import { THealthInstrument } from "./instrument.interface";
import { HealthInstrument } from "./instrument.model";

export const addInstrumentIntoDb = async (payload: THealthInstrument) => {
  const result = await HealthInstrument.create(payload);
  return result;
};
export const getAllInstrumentFromDb = async (query: Record<string, unknown>) => {
  const instrumentQuery = new QueryBuilder(HealthInstrument.find(), query)
    .search(["name", "features"])
    .fields()
    .filter()
    .paginate()
    .priceRange()
    .sort();
  const result = await instrumentQuery.queryModel;
  const meta = await instrumentQuery.countTotal();
  return { result, meta };
};
