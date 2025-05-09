import { StatusCodes } from "http-status-codes";
import catchAsYnc from "../../utilits/catchAsync";
import sendResponse from "../../utilits/sendResponse";
import { addInstrumentIntoDb, getAllInstrumentFromDb } from "./instrument.service";

// Create a Medicine
export const addInstrument = catchAsYnc(async (req, res) => {
  const instrument = req.body;
  const result = await addInstrumentIntoDb(instrument);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: " Instrument added successfully",
    data: result,
  });
});
export const getAllInstrument = catchAsYnc(async (req, res) => {
  const result = await getAllInstrumentFromDb(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: " Instrument getting successfully",
    meta: result.meta,
    data: result.result,
  });
});
