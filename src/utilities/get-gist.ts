import { GetPublicGist } from "../logics/get-public-gists";
import { GetAuthenticatedUserGists } from "../logics/get-authenticated-user-gists";
import { store } from "../models";
import { subpaths } from "../constants/paths";
import { gistscope } from "../constants/models.interfaces/gists";

export const GetGistsUtility = async (
  isLogged: boolean,
  username: string,
  history: any,
  addToast: any,
  scope:string,
) => {
  const { pagination } = store.getState();
  try {
    const gists =
      (isLogged && username && scope === gistscope.user)
        ? await GetAuthenticatedUserGists(username)
        : await GetPublicGist();
    if (gists) {
      const totalPages = Math.ceil(gists.length / pagination.limit.pagesize);
      store.dispatch.gistslist.update_gist(gists);
      store.dispatch.pagination.update_total_pages({
        total_pages: totalPages,
      });
      store.dispatch.pagination.update_button_status({
        back: false,
        next: totalPages > 1 ? true : false,
      });
      store.dispatch.pagination.update_show_records(gists.slice(0, 10));
      store.dispatch.Route.updateCurrentRoute(subpaths.publicgists);
      //history.push(subpaths.publicgists);
    }
  } catch (e) {
    addToast("Something went wrong during fetching gist", {
      appearance: "error",
      autoDismiss: true,
    });
  }
};
