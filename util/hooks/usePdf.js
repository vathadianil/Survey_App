const usePdf = () => {
  const sharePdf = () => {
    const pdf = new jsPDF();
    pdf.text("Hello, world!", 10, 10);
    pdf.save("my-pdf.pdf");

    const url = "file://" + pdf.output("blob");

    Share.share({
      url,
      title: "My PDF File",
      message: "This is a PDF file generated with jsPDF.",
    });
  };
  return { sharePdf };
};

export default usePdf;
