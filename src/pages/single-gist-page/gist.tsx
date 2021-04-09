import React, {useEffect, useReducer } from "react";
import { GetGistById } from "../../logics/get-gistdatabyId";
import { useHistory } from "react-router-dom";
import styles from "./style.module.scss";
import { subpaths } from "../../constants/paths";
import {PrintFileInfo} from '../../utilities/PrintFileInfo'
import moment from "moment";
import { GetGistUserFile } from "../../logics/get-gistuser-file";

const Properties = {
    gist:"GIST",
    loader:"Loader",
    fileinfo:"FileInfo"
}

interface GistStateFace{
  gist:any,
  loader:boolean,
  fileinfo:{
      filename:string,
      fileurl:string,
      filetext:any,
  }
}
interface ActionFace{
    type:string,
    payload:any
}
const InitialState = {
    gist:[],
    loader: true,
    fileinfo:{
        filename:'',
        fileurl:'',
        filetext:'',
    }
}

function reducer(state:GistStateFace,action:ActionFace):GistStateFace{
    switch(action.type){
        case Properties.gist:
            return {...state, gist: action.payload};
        case Properties.loader:
            return {...state, loader: action.payload};
        case Properties.fileinfo:
            return {...state, fileinfo: action.payload};
        default:
            return state
    }
}

const SingleGistPage: React.FC<any> = () => {
  const [state, setState] = useReducer(reducer, InitialState);
  const History = useHistory();

  const GetGistDetail = async (gistId: string) => {
    const response = await GetGistById(gistId);
    debugger
    const fileinfo = PrintFileInfo(response.files);

    const getFile = await GetGistUserFile(fileinfo[0].fileUrl);
    setState({type: Properties.fileinfo, payload:{filename: fileinfo[0].filename, fileurl: fileinfo[0].fileUrl, filetext: getFile}})
    setState({type: Properties.gist, payload: response});
    setState({type: Properties.loader, payload: false})
  };
  useEffect(() => {
    const gistId = window.location.search.split("=")[1];
    if (gistId) {
      GetGistDetail(gistId);
    } else {
      History.push(subpaths.publicgists);
    }
  }, []);
 console.log('gist data ', state)
  return !state.loader ?(
    <div className={styles.singlegistcontainer}>
      <div className={styles.gistbody}>
        <div className={styles.gistprofile}>
          <div className={styles.gistpicture}>
            <div className={styles.picture}>
              <img
                src={state?.gist?.owner.avatar_url}
                alt="404"
              />
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
              <span>
                <i className="fa fa-star-o" />
                <button>1</button>
              </span>
              <span>
                <i className="fa fa-code-fork" />
                <button>1</button>
              </span>
            </div>
          </div>
        </div>
        <div className={styles.gistfilecontainer}>
          <div className="card">
            <div className="card-header">
              <i className="fa fa-file" /> &nbsp;{state?.fileinfo.filename}
            </div>
            <div className="card-body">
                {state.fileinfo.filetext}
            </div>
          </div>
        </div>
      </div>
    </div>
  ):(<div>Loading...</div>);
};

export default SingleGistPage;
