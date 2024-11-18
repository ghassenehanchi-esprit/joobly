'use client'
import React, {useState} from 'react';
import styles from "./postResume.module.scss"
import Button from "@/lib/components/button/button";
import Image from "next/image";
import upload from "@/public/images/icons/uploadResume.svg"
import create from "@/public/images/icons/createResume.svg"
import checkMark from "@/public/images/icons/checkmark.svg"
import UploadModal from "@/lib/components/uploadModal/uploadModal";
import { GDPR } from '@/lib/constant/constants';
const PostResume = () => {

  const [open, setOpen] = useState(false);

  return (
    <section className={styles["post-resume"]}>
      <UploadModal open={open} setOpen={setOpen}/>
      <div className={styles["post-resume__item"]}>
        <div className={styles["post-resume__item__context"]}>

          <Image src={upload} width={86} height={86} alt=""/>
          <div className={styles["post-resume__item__context__texts"]}>
            <h1>Upload your resume</h1>
            <p><Image src={checkMark} width={20} height={20} alt=""/>{"Upload your resume and you'll be able to apply to jobs in just one click!"}</p>
          </div>
        </div>
        <Button onClick={()=>setOpen(true)} className={'btn-primary'}>
          Upload
        </Button>
      </div>
      <p className='text-xs text-gray-400 font-semibold text-center max-w-[800px] px-4'>
      {GDPR}
      </p>
    </section>
  );
};

export default PostResume;