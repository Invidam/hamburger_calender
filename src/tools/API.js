import axios from "axios";

export const getCustomConfig = () => {
  const token = localStorage.getItem("access_token");
  const date = localStorage.getItem("date");
  const config = {
    headers: { "x-access-token": token, "x-access-date": date },
  };
  return config;
};

export let API = axios.create(getCustomConfig());

API.interceptors.response.use(
  (res) => {
    return res;
  },
  (e) => {
    console.log("ERR", e?.response);
    if (e?.response?.status === 401) {
      console.log("ER1ROR: ", e.response);
      // alert();
      throw new Error(`401 - Unauthorized\n${e.response?.data}`);
    }
    alert("other err");
    throw new Error(`toher rerr`);
    // return Promise.reject(e);
  }
);

export const updateAPIHeader = () => {
  API = axios.create(getCustomConfig());
};
export class APIv2 {
  static updateHeader() {
    API = axios.create(getCustomConfig());
  }
  static workList(user, date) {
    try {
      const url = `/api/${user}/${date}/worklist/worklist`;
      return {
        get: async () => {
          return await API.get(url);
        },
        create: async (data) => {
          return await API.put(url, { value: data });
        },
        edit: async (data) => {
          return await API.post(url, { value: data });
        },
        delete: async (data) => {
          console.log("IN API DATA: ", data);
          return await API.delete(url, { data: { value: data } });
        },
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}

//API.workList("SR","1212-12-12").create({ab:"c"});
//SetWork({123:213}).delete();
//Work().delte();
