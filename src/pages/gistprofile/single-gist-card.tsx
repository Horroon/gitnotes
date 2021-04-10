import React, { memo, useEffect, useState } from "react";
import styles from "./style.module.scss";
import moment from "moment";
import { PrintFileInfo } from "../../utilities/PrintFileInfo";
import { GetGistUserFile } from "../../logics/get-gistuser-file";

const dummyurl =
  "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";

export const SingleGistCard =memo((props:any) => {
    const [filecontent, setFileContent] = useState('');
    const {gist:{owner,files, created_at}, name} = props;
    const fileinfo = PrintFileInfo(files);

    const GetFileContent = async()=>{
        const content = await GetGistUserFile(fileinfo[0].fileUrl);
        setFileContent(content)
    }

    useEffect(()=>{
        GetFileContent()
    },[]);

  return (
    <div className={styles.singlegistcontainer}>
      <div className={styles.gistbody}>
        <div className={styles.gistprofile}>
          <div className={styles.gistpicture}>
            <div className={styles.picture}>
              <img src={owner.avatar_url} alt="404" />
            </div>
            <div className={styles.description}>
              <div className={styles.nameandfile}>
                <p>{name}/ </p>
                <h5>{fileinfo[0].filename}</h5>
              </div>
              <div>
                <p>{moment(created_at).fromNow()}</p>
              </div>
            </div>
          </div>
          <div className={styles.giststarandfork}>
            <div className={styles.icons}>
              <span>
                <i className="fa fa-star-o" />
                <button onClick={() => {}}>1</button>
              </span>
              <span>
                <i className="fa fa-code-fork" />
                <button onClick={() => {}}>1</button>
              </span>
            </div>
          </div>
        </div>
        <div className={styles.gistfilecontainer}>
          <div className="card">
            <div className="card-header">
              <i className="fa fa-file" /> &nbsp; {fileinfo[0].filename}
            </div>
            <div className="card-body">
                <code>
                    {filecontent ? filecontent : 'wait...'}
                </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
},);
