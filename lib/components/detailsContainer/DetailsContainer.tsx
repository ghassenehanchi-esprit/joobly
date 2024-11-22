"use client";
import React, { useState } from "react";
import Paper from "@/lib/components/paper/Paper";
import styles from "./deatilsContainer.module.scss";
import addArchive from "@/public/images/icons/archive-add.svg";
import shareButton from "@/public/images/icons/shareButton.svg";
import Image from "next/image";
import Button from "@/lib/components/button/button";
import Divider from "@/lib/components/devider/divider";
import KeyValueComponent from "@/lib/components/keyValueComponent/keyValueComponent";
import { useRouter } from "next/navigation";
import { useClient } from "@/lib/hooks/useClient";
import DateConverter from "../dateConverter/DateConverter";
import toast from "react-hot-toast";

const DetailsContainer = ({ data }: any) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  	const currentUrl = encodeURIComponent(window?.location?.href); 


	const socialPlatforms = [
		{
		  name: 'share in Facebook',
		  url: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
		},
		{
		  name: 'share in Twitter',
		  url: `https://twitter.com/intent/tweet?url=${currentUrl}`,
		},
		{
		  name: 'share in LinkedIn',
		  url: `https://www.linkedin.com/shareArticle?url=${currentUrl}`,
		},
		{
		  name: 'share in WhatsApp',
		  url: `https://api.whatsapp.com/send?text=${currentUrl}`,
		},
	  ];


	const jobDetails = [
		{
			key: "Job Role",
			value: data?.jobTitle || "N/A",
		},
		{
			key: "Contract Type",
			value: data?.workType || "N/A",
		},
		{
			key: "Salary",
			value: data?.salary ? `${data?.salary} ${data?.currency} (${data?.salaryDetail})` : "N/A",
		},
		{
			key: "Experience Level",
			value: data?.experienceLevel || "N/A",
		},
		{
			key: "Education",
			value: data?.education || "N/A",
		},
		{
			key: "Working Hours",
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

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	  };

	const { back } = useRouter();
	const isClient = useClient();
	return (
		<>
			{isClient && (
				<div className={styles["job-details-page"]}>
					<div className={styles["job-details-wrapper"]}>
						<Paper className='details-component-paper'>
							<section className={styles["job-details-page-info"]}>
								<div className={styles["job-details-page-actions"]}>
									{/* share popup start */}
								{isDropdownOpen && (
										<div 
										onClick={toggleDropdown}
										className="absolute top-1 -right-8 mt-2 bg-white border border-gray-300 rounded shadow-lg z-10">
										<ul className="p-2 space-y-2">
											{socialPlatforms?.map((platform) => (
											<li key={platform.name}>
												<a
												href={platform.url}
												target="_blank"
												rel="noopener noreferrer"
												className="block text-[#006c53] hover:underline"
												>
												{platform.name}
												</a>
											</li>
											))}
										</ul>
										</div>
      								)}
									{/* share popup end */}
									<Image alt='add archive' src={addArchive} width={44} height={44} />
									<Image 
									onClick={toggleDropdown}
									className="cursor-pointer"
									alt='share button' 
									src={shareButton} 
									width={44} 
									height={44} 
									/>
								</div>
								<div className={styles["job-general-details"]}>
									<div>
										<p className={styles["job-general-job-title"]}>{data?.jobTitle}</p>
										{/*
										<a
											target='_blank'
											href={data?.jobUrl}
											className={styles["job-general-job-url"]}
										>
											{data?.jobUrl}
										</a>
										*/}
										
									</div>
									<div className={styles["job-general-buttons"]}>
										{/*
											<Button style={{ width: "145px" }} className={`btn-grey-outlined`}>
												Report Job
											</Button>
										*/}
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
									<div className={'mb-6 flex justify-between text-sm text-gray-500'}>
										<p className="flex gap-2">Advertised since: {DateConverter({  mongoDate: data?.advertisedDate })}</p>
										{data?.closeDate && (
											<p>Closed on: {DateConverter({  mongoDate: data?.closeDate })}</p>
											)}
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
					</div>
					<div className={styles["job-details-bottom-buttons"]}>
						<Button
							onClick={() => back()}
							style={{ width: "185px", height: "46px" }}
							className={`btn-green-outlined`}
						>
							Back
						</Button>
					</div>
				</div>
			)}
		</>
	);
};

export default DetailsContainer;
