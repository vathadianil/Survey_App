const useDate = () => {
  const convertDateToString = (date) => {
    console.log(date);
    const day = date?.getDate();
    const month = date?.getMonth() + 1;
    const year = date?.getFullYear();
    return `${day}/${month}/${year}`;
  };
  return { convertDateToString };
};

export default useDate;
