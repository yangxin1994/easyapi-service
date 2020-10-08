import Cookies from "js-cookie";
import { getAccount } from "@/api/account";

const user = {
  state: {
    accountInfo: "",
    userId: "",
    username: "",
    nickname: "",
    photo: "",
    mobile: "",
    email: "",
    team: "",
    teamName: "",
    teamImg: "",
    userTeam: "",
    token: Cookies.get("authenticationToken")
  },

  mutations: {
    SET_ACCOUNTINFO: (state, accountInfo) => {
      state.accountInfo = accountInfo;
    },
    SET_USERID: (state, userId) => {
      state.userId = userId;
    },
    SET_USERNAME: (state, username) => {
      state.username = username;
    },
    SET_NICKNAME: (state, nickname) => {
      state.nickname = nickname;
    },
    SET_PHOTO: (state, photo) => {
      state.photo = photo;
    },
    SET_MOBILE: (state, mobile) => {
      state.mobile = mobile;
    },
    SET_EMAIL: (state, email) => {
      state.email = email;
    },
    SET_TEAM: (state, team) => {
      state.team = team;
    },
    SET_TEAM_NAME: (state, teamName) => {
      state.teamName = teamName;
    },
    SET_TEAM_IMG: (state, teamImg) => {
      state.teamImg = teamImg;
    },
    SET_USER_TEAM: (state, userTeam) => {
      state.userTeam = userTeam;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    }
  },

  actions: {
    /**
     * 获取用户信息
     */
    getUserInfo({ commit }) {
      getAccount().then(res => {
        commit("SET_ACCOUNTINFO", res.data);
        commit("SET_USERID", res.data.id);
        commit("SET_USERNAME", res.data.username);
        commit("SET_NICKNAME", res.data.nickname);
        commit("SET_PHOTO", res.data.photo);
        commit("SET_MOBILE", res.data.mobile);
        commit("SET_EMAIL", res.data.email);
        if (res.data.team) {
          commit("SET_TEAM", res.data.team);
          commit("SET_TEAMNAME", res.data.team.name);
          commit("SET_TEAMIMG", res.data.team.img);
        }
        commit("SET_USERTEAM", res.data.userTeam);
      }).catch(error => {
      });
    }
  }
};

export default user;
