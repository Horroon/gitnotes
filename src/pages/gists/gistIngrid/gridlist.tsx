import React from "react";
import moment from 'moment'
import {paginationStateFace} from '../../../constants/models.interfaces/pagination';
import styles from './style.module.scss'

interface GridListFace{
  paginationStateFace:paginationStateFace,
  gists:any[]
}
export const GridList: React.FC<GridListFace> = (props): React.ReactElement => {
  const {paginationStateFace:{limit},gists} = props
  const recordToShow = gists.slice(limit.from,limit.to)
  return (
    <div className={styles.gridcontainer}>
      <div className="row ">
        {recordToShow.map((card) => (<div className={`${styles.card} col-lg-3 my-4`}>
          <div className={`${styles.card} card rounded-lg`}>
            <div className="card-body">
              <p className={styles.cardtext}>
                {
                  JSON.stringify(card)
                }
              </p>
              <div className={styles.persondinfo}>
                 <div className={styles.personpicontainer} >
                   <img src={card.owner.avatar_url} />
                 </div>
                 <div className={styles.desc}> 
                   <a href="#" className="card-link">
                    {card.owner.login}
                    </a>
                    <p>{moment(card.created_at).fromNow()}</p>
                 </div>
                </div>
            </div>
          </div>
        </div>))}
      </div>
    </div>
  );
};
