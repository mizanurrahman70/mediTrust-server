import QueryBuilder from "../../builder/QueryBuilder";
import { TContact } from "./contact.interface";
import { ContactUs } from "./contact.model";

const createContactUsIntoDb = async (payload: TContact) => {
  const result = await ContactUs.create(payload);
  return result;
};
const getAllContactUsFromDb = async (query: Record<string, unknown>) => {
  const contactQuery = new QueryBuilder(ContactUs.find(), query)
    .fields()
    .filter()
    .search(["name", "email", "message"])
    .paginate();
  const result = await contactQuery.queryModel;
  const meta = await contactQuery.countTotal();
  return { result, meta };
};
export const contactServices = {
  createContactUsIntoDb,
  getAllContactUsFromDb,
};
