import React, { useEffect, useReducer } from "react";
import { GetGistById } from "../../logics/get-gistdatabyId";
import { Link, useHistory } from "react-router-dom";
import styles from "./style.module.scss";
import { subpaths } from "../../constants/paths";
import { PrintFileInfo } from "../../utilities/PrintFileInfo";
import moment from "moment";
import { GetGistUserFile } from "../../logics/get-gistuser-file";
import { GiveStarToGist } from "../../logics/give-star-to-gist";
import { ForkAGist } from "../../logics/fork-gist";
import { DeleteGistOnGit } from "../../logics/delete-gitgist";
import {GetGistForks} from "../../logics/get-gist-forks";
import { useToasts } from "react-toast-notifications";

const Properties = {
  gist: "GIST",
  loader: "Loader",
  fileinfo: "FileInfo",
  updatefork:"UpdateForks",
};

interface GistStateFace {
  gist: any;
  loader: boolean;
  fileinfo: {
    filename: string;
    fileurl: string;
    filetext: any;
  };
  forks:any
}
interface ActionFace {
  type: string;
  payload: any;
}
const InitialState = {
  gist: [],
  loader: true,
  fileinfo: {
    filename: "",
    fileurl: "",
    filetext: "",
  },
  forks:[]
};

function reducer(state: GistStateFace, action: ActionFace): GistStateFace {
  switch (action.type) {
    case Properties.gist:
      return { ...state, gist: action.payload };
    case Properties.loader:
      return { ...state, loader: action.payload };
    case Properties.fileinfo:
      return { ...state, fileinfo: action.payload };
    case Properties.updatefork:
      return {...state, forks: action.payload};
    default:
      return state;
  }
}

interface SingleGistFace {
  username?: string;
}
const SingleGistPage: React.FC<SingleGistFace> = (props) => {
  const { username } = props;
  const [state, setState] = useReducer(reducer, InitialState);
  const History = useHistory();
  const { addToast } = useToasts();

  const StarAGist = async (gistId: string) => {
    if (username) {
      const response = await GiveStarToGist(gistId);
    }
  };

  const DeleteAGist = async (gistId: string) => {
    const deletedgistresponse = await DeleteGistOnGit(gistId);
    if (!deletedgistresponse) {
      addToast("Gist has been deleted successfully", {
        appearance: "warning",
        autoDismiss: true,
      });
      History.push(subpaths.publicgists);
    }
  };
  const ForkGist = async (gistId: string) => {
    if (username) {
      try {
        const response = await ForkAGist(gistId);
        if (response?.id) {
          addToast("You have successfully forked the gist", {
            appearance: "success",
            autoDismiss: true,
          });
        }
        if (response?.errors?.length) {
          addToast(response.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      } catch (e) {
        addToast("Sorry! something went wrong", {
          appearance: "error",
          autoDismiss: true,
        });
      }
    }
  };

  const GetGistDetail = async (gistId: string) => {
    try {
      const response = await GetGistById(gistId);
      const fileinfo = PrintFileInfo(response.files);

      const getFile = await GetGistUserFile(fileinfo[0].fileUrl);
      const gistForks = await GetGistForks(response?.forks_url);
      debugger
      setState({type: Properties.updatefork, payload: gistForks})
      setState({
        type: Properties.fileinfo,
        payload: {
          filename: fileinfo[0].filename,
          fileurl: fileinfo[0].fileUrl,
          filetext: getFile,
        },
      });
      setState({ type: Properties.gist, payload: response });
      setState({ type: Properties.loader, payload: false });
    } catch (e) {
      addToast("Something went wrong! ", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  useEffect(() => {
    const gistId = window.location.search.split("=")[1];
    if (gistId) {
      GetGistDetail(gistId);
    } else {
      History.push(subpaths.publicgists);
    }
  }, [window.location]);
  return !state.loader ? (
    <div className={styles.singlegistcontainer}>
      <div className={styles.gistbody}>
        <div className={styles.gistprofile}>
          <div className={styles.gistpicture}>
            <div className={styles.picture}>
              <img src={state?.gist?.owner.avatar_url} alt="404" />
            </div>
            <div className={styles.description}>
              <div className={styles.nameandfile}>
                <p>{state?.gist.owner.login}/ </p>
                <h5>{state?.fileinfo.filename}</h5>
              </div>
              <div>
                <p>{moment(state?.gist.created_at).fromNow()}</p>
              </div>
            </div>
          </div>
          <div className={styles.giststarandfork}>
            <div className={styles.icons}>
              {state?.gist.owner.login === username && (
                <>
                  <Link to={`${subpaths.editgist}?id=${state.gist.id}`}>
                    <span className={"edit"}>
                      <i className="fa fa-edit" />
                      <span>Edit</span>
                    </span>
                  </Link>
                  <span
                    className={"delete"}
                    onClick={() => DeleteAGist(state.gist.id)}
                  >
                    <i className="fa fa-trash" />
                    <span>Delete</span>
                  </span>
                </>
              )}

              <span onClick={() => StarAGist(state.gist.id)}>
                <i className="fa fa-star-o" />
                <button>0</button>
              </span>
              <span onClick={() => ForkGist(state.gist.id)}>
                <i className="fa fa-code-fork" />
                <button>{state.forks.length}</button>
              </span>
            </div>
          </div>
        </div>
        <div className={styles.gistfilecontainer}>
          <div className="card">
            <div className="card-header">
              <i className="fa fa-file" /> &nbsp;{state?.fileinfo.filename}
            </div>
            <div className="card-body">{state.fileinfo.filetext}</div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default SingleGistPage;
