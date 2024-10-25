'use client'
import React from 'react';
import styles from "./postJobInfo.module.scss"
import bg from "@/public/images/postJobInfoBg.svg"
import dashboard from "@/public/images/Dashboard.svg"
import chart from "@/public/images/Chart.svg"
import checkMark from "@/public/images/icons/checkmark.svg"
import checkMarkLight from "@/public/images/icons/checkmarkLight.svg"
import PostJobActions from "@/lib/components/postJobActions/postJobActions";
import Button from "@/lib/components/button/button";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/navigation";
import { POST_JOB_ACTIONS } from '@/lib/constant/constants';
const PostJobInfo = () => {
  const {push}=useRouter()
  return (
    <section className={styles["post-job-info"]}>
      <div style={{backgroundImage: `url(${bg.src})`}} className={styles["post-job-info__top"]}>
        <div className={styles["post-job-info__top__content"]}>
          <h1>Post jobs directly </h1>
          <h4>Publish your vacancies and start receiving applications.</h4>
          <PostJobActions data={POST_JOB_ACTIONS} image={checkMarkLight} color="white"/>
          <Button onClick={()=>push("/post-job")} style={{marginTop:"35px"}} className={`btn-secondary-search`} icon="/images/icons/note.svg" hoverIcon="/images/icons/list-white.svg">
            Post a Job
          </Button>
        </div>
        <Image src={dashboard} width={595} alt=""/>
      </div>
      <div className={styles["post-job-info__bottom"]}>
        <Image src={chart} width={610} alt=""/>
        <div>
          <h1>Automatically index jobs  </h1>
          <h4>Jobs already online? Save time and have them
            listed automatically.</h4>
          <PostJobActions data={POST_JOB_ACTIONS} image={checkMark} color="black"/>
          <Button style={{marginTop: "35px",maxWidth:"210px",width:"100%"}} className={`btn-secondary-search`} icon="/images/icons/note.svg"
                  hoverIcon="/images/icons/list-white.svg">
            <Link href="">Submit your website</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PostJobInfo;