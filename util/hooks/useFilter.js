import { useState } from "react";

const useFilter = (initialInputValue, initialFilterValue, filterTerms) => {
  const [inputValue, setInputValue] = useState(initialInputValue);
  const [filterValue, setFilterValue] = useState(initialFilterValue);
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const originalDataChangeHandler = (data) => {
    setOriginalData(data);
    setFilteredData(data);
  };

  const inputValueChangeHandler = (value) => {
    setFilteredData(filterData(value, filterValue));
    setInputValue(value);
  };

  const filterValueChangeHandler = (value) => {
    setFilteredData(filterData(inputValue, value));
    setFilterValue(value);
  };

  const filterData = (inputValue, filterValue) => {
    let data = [];
    let filteredData = [];
    if (inputValue) {
      originalData.filter((item) => {
        if (
          item?.[filterTerms[0]]
            ?.toLowerCase()
            .includes(inputValue?.toLowerCase())
        ) {
          data.push(item);
        }
      });
    } else {
      data = originalData;
    }

    if (filterValue === "ALL") {
      filteredData = data;
    } else {
      data.filter((item) => {
        const vistedStatus = item?.[filterTerms[1]]
          ? item?.[filterTerms[1]]
          : "NO";
        if (vistedStatus?.toLowerCase().includes(filterValue?.toLowerCase())) {
          filteredData.push(item);
        }
      });
    }
    return filteredData;
  };

  return {
    inputValue,
    originalData,
    filteredData,
    filterValue,
    inputValueChangeHandler,
    originalDataChangeHandler,
    filterValueChangeHandler,
  };
};

export default useFilter;
