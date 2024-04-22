import { baseURL } from "../axios";
import { GENERATE_INVOICE } from "../apiRequests";
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";
import { useState } from "react";

const usePdf = () => {
  const [loading, setLoading] = useState(false);
  const sharePdf = async (
    id,
    studentRegistrationNo,
    orderId,
    registrationFeeNum,
    registrationDate,
    registrationFeeStatus,
    registrationFeeReceipt
  ) => {
    try {
      const filename = `${studentRegistrationNo.replaceAll("/", "-")}.pdf`;
      setLoading(true);
      const result = await FileSystem.downloadAsync(
        `${baseURL}${GENERATE_INVOICE}/?studentID=${id}&studentRegNo=${studentRegistrationNo}&paymentOrderId=${orderId}&registrationFee=${registrationFeeNum}&registrationDate=${registrationDate}&registrationFeeStatus=${registrationFeeStatus}&registrationFeeReceipt=${registrationFeeReceipt}`,
        FileSystem.documentDirectory + filename
      );
      setLoading(false);
      await shareAsync(result.uri);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return { loading, sharePdf };
};

export default usePdf;
