"use client";
import React from "react";
import Image from "next/image";
import styles from "@/app/jobs/jobsListPage.module.scss";
import Button from "@/lib/components/button/button";
import { JobData } from "@/lib/types/componentTypes";
import locationIcon from "@/public/images/icons/location-grey.svg";
import moneyIcon from "@/public/images/icons/dollar-circle.svg";
import moreIcon from "@/public/images/icons/more.svg";
import saveIcon from "@/public/images/icons/archive.svg";
import { useRouter } from "next/navigation";
import { useClient } from "@/lib/hooks/useClient";
import Skeleton from "@mui/material/Skeleton";

interface JobItem {
	data: JobData;
}
const JobItem = ({ data }: JobItem) => {
	const { push } = useRouter();
	const isClient = useClient();

	console.log(isClient);

	return (
		<>
			{isClient ? (
				<div key={data?._id} className={styles["single-result"]}>
					<div className={styles["result-content"]}>
						<div className={styles["result-content__inner"]}>
							<h4>{data?.jobTitle}</h4>
							{data?.description && isClient && (
								<p dangerouslySetInnerHTML={{ __html: data?.description }} />
							)}
						</div>
						<div className={styles["job-info"]}>
							<p className={styles["job-location"]}>
								<span className={styles["icon"]}>
									<Image src={locationIcon} alt='location' />
								</span>
								{data?.location}
							</p>
							<p className={styles["job-salary"]}>
								<span className={styles["icon"]}>
									<Image src={moneyIcon} alt='money' />
								</span>{" "}
								{data?.salary}{" "}
								<span className={styles["salary-details"]}>/{data?.salaryDetail}</span>
							</p>
						</div>
					</div>
					<div className={styles["result-actions"]}>
						<div className={styles["top-actions"]}>
							<Image src={saveIcon} alt='save' />
							<Image src={moreIcon} alt='more' />
						</div>
						<div className={styles["btn-actions"]}>
							<span className={styles["date"]}>{data?.postedDate}</span>
							<div className={styles["btn-group"]}>
								<Button
									className={`btn-secondary-search`}
									icon='/images/icons/list.svg'
									hoverIcon='/images/icons/list-white.svg'
								>
									<a target='_blank' href={data?.jobUrl}>
										Apply Now
									</a>
								</Button>
								<Button onClick={() => push(`/jobs/${data?._id}`)} className='btn-main-grey'>
									Detail Information
								</Button>
							</div>
						</div>
					</div>
				</div>
			) : (
				<Skeleton
					key={data?._id}
					animation='wave'
					sx={{ width: "100%", background: "white" }}
					height={200}
				/>
			)}
		</>
	);
};

export default JobItem;
