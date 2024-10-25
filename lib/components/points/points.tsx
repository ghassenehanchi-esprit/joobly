import React from 'react';
import  styles from "./points.module.scss"
interface PointsProps{
  data?:Array<string>
}
const Points:React.FC<PointsProps> = ({data}) => {
  return (
    <div className={styles["points"]}>
      <ul>
        {data?.map((item,index) =>
        <li key={index}>{item}</li>
        )}
      </ul>
    </div>
  );
};

export default Points;