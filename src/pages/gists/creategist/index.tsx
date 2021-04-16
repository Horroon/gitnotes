import React, { useEffect, useReducer } from "react";
import { useHistory } from "react-router-dom";
import styles from "./style.module.scss";
import { CrateGistOnGit } from "../../../logics/create-gist";
import { GetGistById } from "../../../logics/get-gistdatabyId";
import { subpaths } from "../../../constants/paths";
import { PrintFileInfo } from "../../../utilities/PrintFileInfo";
import { GetGistUserFile } from "../../../logics/get-gistuser-file";
import { loginInfoFace } from "../../../constants/models.interfaces/login";
import { GetGistsUtility } from "../../../utilities/get-gist";
import { useToasts } from "react-toast-notifications";
import { UpdateGistOnGit } from "../../../logics/update-gist";
import { gistscope } from "../../../constants/models.interfaces/gists";

const Properties = {
  filedesc: "File_Desc",
  filename: "File_Name",
  filecontent: "File_Content",
  updateFileObject: "File_Update_Object",
  isToEdit: "IsToEdit",
  editablegistId: "EditableGistId",
  gist: "updategist",
};

interface ActionFace {
  type: string;
  payload: any;
}
interface FileObject {
  index: number;
  filename: string;
  filecontent: string;
}
interface StateFace {
  isToEdit: boolean;
  filename: string;
  files: FileObject[];
  editableGistId: string;
  gist?: any;
  filedesc: string;
}
const InitialState = {
  filename: "",
  isToEdit: false,
  files: [],
  editableGistId: "",
  gist: "",
  filedesc: "",
};

const reducer = (state: StateFace, action: ActionFace): StateFace => {
  switch (action.type) {
    case Properties.filedesc:
      return { ...state, filedesc: action.payload };
    case Properties.filename:
      return { ...state, filename: action.payload };
    case Properties.updateFileObject:
      return { ...state, files: action.payload };
    case Properties.isToEdit:
      return { ...state, isToEdit: action.payload };
    case Properties.editablegistId:
      return { ...state, editableGistId: action.payload };
    case Properties.gist:
      return { ...state, gist: action.payload };
    default:
      return state;
  }
};

const CreateGist: React.FC<loginInfoFace> = (props) => {
  const { isLogged, userinfo } = props;
  const [state, setState] = useReducer(reducer, InitialState);
  const History = useHistory();
  const { addToast } = useToasts();

  const InputHandler = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    setState({ type: name, payload: value });
  };

  const AddFileInstance = () => {
    const { files } = state;
    files.push({ index: files.length, filename: "", filecontent: "" });
    setState({ type: Properties.updateFileObject, payload: files });
  };
  const AddFileRecord = (e: any) => {
    e.preventDefault();
    const { name, value } = e.currentTarget;
    const splitedData = name.split("-");
    const index = parseInt(splitedData[1]);
    const fieldName = splitedData[0];
    const { files } = state;
    const currentObject = files[index];

    if (fieldName === "filename") {
      currentObject.filename = value;
    } else if (fieldName === "filecontent") {
      currentObject.filecontent = value;
    }

    files[index] = currentObject;
    setState({ type: Properties.updateFileObject, payload: files });
  };

  const MakeFilesForGistCreation = (files: FileObject[]) => {
    const TransferFilesIntoObject: any = {};

    for (const file of files) {
      TransferFilesIntoObject[file.filename] = {
        content: file.filecontent,
      };
    }
    return TransferFilesIntoObject;
  };

  const makeFileInstances = async (fileurl: string, filename: string) => {
    const filedata = await GetGistUserFile(fileurl);
    const { files } = state;
    const currentObject = {
      index: files.length,
      filename: filename,
      filecontent: filedata,
    };
    files.push(currentObject);
    setState({ type: Properties.updateFileObject, payload: files });
  };

  const GetGistData = async (gistid: string) => {
    const response = await GetGistById(gistid);
    const username = sessionStorage.getItem("username");
    if (response?.id && username) {
      setState({ type: Properties.gist, payload: response });
      setState({ type: Properties.isToEdit, payload: true });
      setState({ type: Properties.editablegistId, payload: response.id });
      setState({ type: Properties.filedesc, payload: response.description });

      const files = PrintFileInfo(response.files);
      for (let file of files) {
        makeFileInstances(file.fileUrl, file.filename);
      }
    } else {
      History.push(subpaths.publicgists);
    }
  };

  const SendRequestToCreateGist = async () => {
    const files = MakeFilesForGistCreation(state.files);
    try {
      const resp = await CrateGistOnGit(true, state.filedesc, files);
      if (resp?.documentation_url) {
        addToast("Something went wrong during creating your gist", {
          appearance: "error",
          autoDismiss: true,
        });
      } else if(resp?.url){
        setTimeout(
          () => GetGistsUtility(isLogged, userinfo.username, History, addToast, gistscope.user),
          2000
        );
        addToast("Gist has been created successfully", {
          appearance: "success",
          autoDismiss: true,
        });
      }
      else{
        throw new Error('something bad happened')
      }
    } catch (e) {
      addToast('Error occured', {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  const SendRequestToUpdateGist = async () => {
    const files = MakeFilesForGistCreation(state.files);
    const updatedgist = await UpdateGistOnGit(
      state.editableGistId,
      true,
      state.filedesc,
      files
    );
    if (updatedgist?.documentation_url) {
      addToast("Something went wrong during updating your gist", {
        appearance: "error",
        autoDismiss: true,
      });
    } else {
      setTimeout(
        () => GetGistsUtility(isLogged, userinfo.username, History, addToast,gistscope.user),
        2000
      );
      addToast("Gist has been updated successfully", {
        appearance: "success",
        autoDismiss: true,
      });
    }
  };

  const HandleSubmitButton = () => {
    if (!state.isToEdit) {
      SendRequestToCreateGist();
    } else if (state.isToEdit) {
      SendRequestToUpdateGist();
    }
  };
  useEffect(() => {
    if (isLogged) {
      const splitedUrl = window.location.search.split("=");
      const gistId = splitedUrl[1];
      if (gistId) {
        GetGistData(gistId);
      } else {
        setState({
          type: Properties.updateFileObject,
          payload: [{ index: 0, filename: "", filecontent: "" }],
        });
      }
    } else {
      History.push(subpaths.publicgists);
    }
  }, [isLogged]);

  return (
    <div className={styles.creategistcontainer}>
      <div className={styles.formgroupwrapper}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter gist description..."
            name={Properties.filedesc}
            value={state.filedesc}
            onChange={InputHandler}
          />
        </div>

        {state.files.map((file) => {
          return (
            <div id={file.index.toString()}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter file name..."
                  name={`filename-${file.index}`}
                  value={file.filename}
                  onChange={AddFileRecord}
                />
              </div>
              <div className="form-group">
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows={10}
                  placeholder="Enter file content"
                  name={`filecontent-${file.index}`}
                  value={file.filecontent}
                  onChange={AddFileRecord}
                ></textarea>
              </div>
            </div>
          );
        })}

        <div className={styles.btncontainer}>
          <div>
            <button
              className="btn btn-success btn-sm"
              onClick={AddFileInstance}
            >
              Add File
            </button>
          </div>
          <div>
            <button
              className="btn btn-success btn-sm"
              onClick={HandleSubmitButton}
            >
              {state.isToEdit ? "Update" : "Create gist"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGist;
