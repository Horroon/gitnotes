import React from "react";
import {paginationStateFace} from '../../../constants/models.interfaces/pagination'

interface GridListFace{
  paginationStateFace:paginationStateFace,
  gists:any[]
}
export const GridList: React.FC<GridListFace> = (props): React.ReactElement => {
  const {paginationStateFace:{limit},gists} = props
  const recordToShow = gists.slice(limit.from,limit.to)
  return (
    <div>
      <div className="row justify-content-center">
        {recordToShow.map((card) => (
          <div className="card col-lg-3 my-4 mx-4 rounded-lg" id={card.toString()}>
            <div className="card-body">
              <h5 className="card-title">Card {card}</h5>
              <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="card-link">
                Card link
              </a>
              <a href="#" className="card-link">
                Another link
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
