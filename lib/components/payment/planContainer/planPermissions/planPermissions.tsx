import React from 'react';
import havePerm from "@/public/images/icons/tick-circle.svg"
import noPerm from "@/public/images/icons/close-circle.svg"
import Image from "next/image";
import styles from "./planPermissions.module.scss"
import {PermissionsDataType} from "@/lib/types/componentTypes";

interface PlanPermissionsPropsTypes {
  data: PermissionsDataType[] | undefined
  title:string
}

const PlanPermissions = ({data,title}:PlanPermissionsPropsTypes) => {

  return (
    <section className={styles["plan-permissions"]}>
      {data?.map(({name, permission}, index) =>
        <div key={index} className={styles["plan-permissions__item"]}>
          <Image width={24} height={24} src={permission ? havePerm : noPerm} alt=""/>
          <p className={`${styles["plan-permissions__item__text"]} ${!permission && styles["no-perm"]} ${title==="Gold" && styles["gold-plan"]}`}>{name}</p>
        </div>
      )}
    </section>
  );
};

export default PlanPermissions;