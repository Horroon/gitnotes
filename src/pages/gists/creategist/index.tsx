import React, { useReducer } from "react";
import styles from "./style.module.scss";
import {CrateGistOnGit} from '../../../logics/create-gist';

const Properties = {
  filedesc: "File_Desc",
  filename: "File_Name",
  filecontent: "File_Content",
  updateFileObject: "File_Update_Object",
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
  filename: string;
  files: FileObject[];
}
const InitialState = {
  filename: "",
  files: [{ index: 0, filename: "", filecontent: "" }],
};

const reducer = (state: StateFace, action: ActionFace): StateFace => {
  switch (action.type) {
    case Properties.filename:
      return { ...state, filename: action.payload };
    case Properties.updateFileObject:
      return { ...state, files: action.payload };
    default:
      return state;
  }
};

const CreateGist = () => {
  const [state, setState] = useReducer(reducer, InitialState);

  const InputHandler = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    setState({ type: name, payload: value });
  };

  const AddFileInstance = ()=>{
      const {files} = state;
      files.push({index: files.length, filename: '', filecontent: ''});
      setState({type: Properties.updateFileObject, payload: files});
  }
  const AddFileRecord = (e:any) => {
    e.preventDefault()
    const {name, value} = e.currentTarget;
    const splitedData = name.split('-')
    const index = parseInt(splitedData[1]);
    const fieldName = splitedData[0]
    const {files} = state
    const currentObject = files[index];

    if(fieldName === 'filename'){
        currentObject.filename = value;
    }
    else if(fieldName ==='filecontent'){
        currentObject.filecontent = value
    }

    files[index] = currentObject;
    setState({type:Properties.updateFileObject, payload: files})

  };

  console.log("state ", state);
  return (
    <div className={styles.creategistcontainer}>
      <div className={styles.formgroupwrapper}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter gist description..."
            name={Properties.filedesc}
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
                  onChange={AddFileRecord}
                ></textarea>
              </div>
            </div>
          );
        })}

        <div className={styles.btncontainer}>
          <div>
            <button className="btn btn-success btn-sm" onClick={AddFileInstance}>Add File</button>
          </div>
          <div>
            <button className="btn btn-success btn-sm" onClick={CrateGistOnGit}>Create gist</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGist;
