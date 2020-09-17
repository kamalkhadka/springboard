import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import axios from "axios";
let BASE_URL = "";
const useAxios = (base) => {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    BASE_URL = base;
  }, [base]);
  
  const addResponse = async (path) => {
    const response = await axios.get(BASE_URL + path);
    setResponses((responses) => [
      ...responses,
      { ...response.data, id: uuid() },
    ]);
  };

  return [responses, addResponse];
};

export default useAxios;
