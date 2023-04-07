import axios, { AxiosResponse } from "axios";

export const getDataFromApi = async (data: string) => {
  try {
    let response: AxiosResponse<any> = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${data}`
    );
    let resData = response.data[0].word;
    return resData;
  } catch (error) {
    return error;
  }
};
