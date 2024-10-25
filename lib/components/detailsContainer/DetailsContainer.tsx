"use client";
import React from "react";
import Paper from "@/lib/components/paper/Paper";
import styles from "./deatilsContainer.module.scss";
import detailsBg from "@/public/images/detailsBg.svg";
import addArchive from "@/public/images/icons/archive-add.svg";
import shareButton from "@/public/images/icons/shareButton.svg";
import Image from "next/image";
import Button from "@/lib/components/button/button";
import Divider from "@/lib/components/devider/divider";
import KeyValueComponent from "@/lib/components/keyValueComponent/keyValueComponent";
import { useRouter } from "next/navigation";
import { useClient } from "@/lib/hooks/useClient";

const DetailsContainer = ({ data }: any) => {
	const jobDetails = [
		{
			key: "Job Role",
			value: data?.jobTitle || "N/A",
		},
		{
			key: "Work Type",
			value: data?.workType || "N/A",
		},
		{
			key: "Salary",
			value: data?.salary ? `$ ${data?.salary} ${data?.currency} (${data?.salaryDetail})` : "N/A",
		},
		{
			key: "Education",
			value: data?.education || "N/A",
		},
		{
			key: "Job Type",
			value: data?.jobTime || "N/A",
		},
		{
			key: "Work Location",
			value: `${data?.location}${data?.country?.label ? "," + data?.country?.label : ""}` || "N/A",
		},
	];

	const companyInfo = [
		{
			key: "CEO Company",
			value: data?.companyDetails?.ceoCompany || "N/A",
		},
		{
			key: "Founded",
			value: data?.companyDetails?.founded || "N/A",
		},
		{
			key: "Company Size",
			value: data?.companyDetails?.companySize || "N/A",
		},
	];

	const { back } = useRouter();
	const isClient = useClient();
	return (
		<>
			{isClient && (
				<section className={styles["job-details-page"]}>
					<section className={styles["job-details-wrapper"]}>
						<Paper className='details-component-paper'>
							<div className={styles["job-banner"]}>
								<Image alt='' src={detailsBg} layout='fill' className={styles["job-details-bg"]} />
							</div>
							<section className={styles["job-details-page-info"]}>
								<div className={styles["job-details-page-actions"]}>
									<Image alt='' src={addArchive} width={44} height={44} />
									<Image alt='' src={shareButton} width={44} height={44} />
								</div>
								<div className={styles["job-general-details"]}>
									<div>
										<p className={styles["job-general-job-title"]}>{data?.jobTitle}</p>
										<a
											target='_blank'
											href={data?.jobUrl}
											className={styles["job-general-job-url"]}
										>
											{data?.jobUrl}
										</a>
									</div>
									<div className={styles["job-general-buttons"]}>
										<Button style={{ width: "145px" }} className={`btn-grey-outlined`}>
											Report Job
										</Button>
										<a href={data?.jobUrl} target='_blank' rel='noopener noreferrer'>
											<Button
												style={{ width: "145px" }}
												className={`btn-secondary-search`}
												hoverIcon='/images/icons/list-white.svg'
											>
												Apply Now
											</Button>
										</a>
									</div>
								</div>
								<Divider />
								<KeyValueComponent data={jobDetails || []} />
								{data?.advertisedDate && (
									<div className={styles["job-date-info"]}>
										<p>{`Advertised since ${data?.advertisedDate}`}</p>
										<p>{`Closed on ${data?.closeDate}`}</p>
									</div>
								)}
								<div className={styles["job-description"]}>
									<p className={styles["job-description-title"]}>Job Description</p>
									<p
										dangerouslySetInnerHTML={{ __html: data?.description }}
										className={styles["job-description-content"]}
									/>
								</div>
								<Divider />
								<div className={styles["job-check-details"]}>
									<p>
										Please check the information above before applying for a job <span>*</span>
									</p>
								</div>
							</section>
						</Paper>
						{data?.companyDetails?.ceoCompany && (
							<Paper className='details-component-paper'>
								<section className={styles["job-company-details"]}>
									<KeyValueComponent minWidth={"235px"} data={companyInfo || []} />
								</section>
							</Paper>
						)}
					</section>
					<div className={styles["job-details-bottom-buttons"]}>
						<Button
							onClick={() => back()}
							style={{ width: "185px", height: "46px" }}
							className={`btn-green-outlined`}
						>
							Back
						</Button>
					</div>
				</section>
			)}
		</>
	);
};

export default DetailsContainer;
