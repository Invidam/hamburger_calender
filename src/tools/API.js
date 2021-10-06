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
    console.log("ERROR IN AXIOS CUSTOM, ", e);
    if (e?.response?.status === 401) {
      // alert();
      console.log(e.response.data);
      console.log("401, ", e.response?.data);
      throw new Error(`401 - Unauthorized\n${e.response?.data}`);
    }
    // alert("other err");
    throw new Error(e);
    // return Promise.reject(e);
  }
);
// 로그인 parm: 소셜타입, 유저 정보

// jwt 토큰 parm: 토큰
// 사인업 / 유저정보 객체
// 유저세팅 입력 겟 parms: 유저명

export const updateAPIHeader = () => {
  API = axios.create(getCustomConfig());
};
export class APIv2 {
  static userSetting(user) {
    try {
      const url = `/auth/setting/${user}`;
      return {
        get: async () => {
          return await API.get(url);
        },
        edit: async (data) => {
          return await API.post(url, { value: data });
        },
      };
    } catch (error) {
      throw new Error(error);
    }
  }
  static auth() {
    try {
      return {
        // githubLogin: async (userInfo) => {
        //   return await API.post("/auth/login/github", { value: userInfo });
        // },
        login: async (socialType, userInfo) => {
          return await API.post(`/auth/login/${socialType}`, {
            value: userInfo,
          });
        },
        signup: async (userInfo) => {
          return await API.post("/auth/signup", { value: userInfo });
        },
        verifyToken: async (token) => {
          return await API.post("/auth/jwt/verify", { token });
        },
      };
      // eslint-disable-next-line no-unreachable
    } catch (error) {
      throw new Error(error);
    }
  }
  static updateHeader() {
    API = axios.create(getCustomConfig());
  }
  static recordTime(user, date, key) {
    try {
      const url = `/api/${user}/${date}/worklist/record-time/${key}`;
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
        delete: async () => {
          return await API.delete(url);
        },
      };
    } catch (error) {
      throw new Error(error);
    }
  }
  static workList(user, date) {
    try {
      const url = `/api/${user}/${date}/worklist/worklist`;
      return {
        get: async () => {
          return await API.get(url);
        },
        getAll: async () => {
          return await API.get(url + "/get-all");
        },
        create: async (data) => {
          return await API.put(url, { value: data });
        },
        edit: async (data) => {
          return await API.post(url, { value: data });
        },
        delete: async (data) => {
          return await API.delete(url, { data: { value: data } });
        },
        update: async (data) => {
          return await API.post(url + "/update", { value: data });
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
