import { Share } from "react-native";
import RNHTMLtoPDF from "react-native-html-to-pdf";

const usePdf = () => {
  const sharePdf = async () => {
    let options = {
      html: "<h1>PDF TEST</h1>",
      fileName: "test",
      directory: "Documents",
    };
    console.log(RNHTMLtoPDF);
    let file = await RNHTMLtoPDF?.convert(options);
    // console.log(file.filePath);
    alert(file.filePath);

    const url = "file://" + file.filePath;

    Share.share({
      url,
      title: "My PDF File",
      message: "This is a PDF file generated with jsPDF.",
    });
  };
  return { sharePdf };
};

export default usePdf;
