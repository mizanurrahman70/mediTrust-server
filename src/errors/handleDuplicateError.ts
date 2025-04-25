/* eslint-disable @typescript-eslint/no-explicit-any */

import { TErrorSources, TGenericErrorResponse } from "../types/global.type";

const handleDuplicateError = (
  error: any,
): TGenericErrorResponse => {
  const statusCode = 400;
  const message = 'Duplicate property';
  const match = error.message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1]
  const errorSources: TErrorSources = [
    {
      path: "",
      message: `${extractedMessage} is already exists`,
    },
  ];
  return { statusCode, message, errorSources };
};
export default handleDuplicateError;
