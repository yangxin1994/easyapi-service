import { getUserTeamList, changeTeam } from "@/api/account";

const team = {
  state: {
    currentTeam: "",
    teamName: "",
    teamAvatar: "",
    teamList: []
  },

  mutations: {
    SET_CURRENT_TEAM: (state, currentTeam) => {
      state.currentTeam = currentTeam;
    },
    SET_TEAM_NAME: (state, teamName) => {
      state.teamName = teamName;
    },
    SET_TEAM_AVATAR: (state, teamAvatar) => {
      state.teamAvatar = teamAvatar;
    },
    SET_TEAM_LIST: (state, teamList) => {
      state.teamList = teamList;
    }
  },

  actions: {
    getTeamList({ commit }) {
      getUserTeamList().then(res => {
        commit("SET_TEAM_LIST", res.data.content);
      }).catch(error => {
        console.log(error);
      });
    },
    /**
     * 切换团队
     */
    switchoverTeam({ dispatch, commit, state }, teamId) {
      changeTeam(teamId).then(res => {
        if (res.data.code === 1) {
          dispatch("getUserInfo");
          location.hash = "";
          location.reload();
        }
      }).catch(error => {
        console.log(error);
      });
    }
  }
};

export default team;
