import {
  gistview,
  gistStateFace,
  gistscope,
} from "../constants/models.interfaces/gists";

export const gistslist = {
  state: <gistStateFace>{
    view: gistview.row,
    gists: [],
    searchgistId: "",
    scope: gistscope.public,
  },
  reducers: {
    changegistview: (state: gistStateFace, payload: gistview) => ({
      ...state,
      view: payload,
    }),
    update_gist: (state: gistStateFace, payload: any[]) => ({
      ...state,
      gists: payload,
    }),
    update_gist_search_id: (state: gistStateFace, payload: string) => ({
      ...state,
      searchgistId: payload,
    }),
    change_gists_scope: (state: gistStateFace,payload:gistscope) => ({
      ...state,
      scope: payload,
    }),
  },
};
