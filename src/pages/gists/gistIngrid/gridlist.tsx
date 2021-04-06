import React from "react";
import {paginationStateFace} from '../../../constants/models.interfaces/pagination'

const list = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
export const GridList: React.FC<paginationStateFace> = (props): React.ReactElement => {
  const {limit} = props
  const recordToShow = list.slice(limit.from,limit.to)
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
