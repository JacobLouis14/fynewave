import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface ErrorData {
  message: string;
}

const extractErrMsgFromRtk = (err: FetchBaseQueryError | SerializedError) => {
  if ("data" in err) {
    const fetchError = err as FetchBaseQueryError;
    const errorData = fetchError.data as ErrorData | undefined;
    const errMsg = errorData?.message || "";
    return errMsg;
  } else {
    const serializedError = err as SerializedError;
    return serializedError.message;
  }
};

export default extractErrMsgFromRtk;
