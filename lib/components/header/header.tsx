import React from "react";
import "./header.scss";
import Button from "../button/button";
import Link from "next/link";
import Image from "next/image";
import LoginBtn from "../loginBtn/loginBtn";

const TopHeader = () => {
	return (
		<div className='header'>
			<div className='header-top container'>
				<div className='search-post-group'>
					<div className='search-group'>
						<Link href={"/"}>
							<Image
								src={"/images/logos/logo-joobly.svg"}
								alt='search'
								className='header-logo'
								width={200}
								height={200}
							/>
						</Link>
						{/*<input type="text" className='header-search' placeholder='Company, Job Title...' />*/}
					</div>
					<Link href='/' className='header-post-home'>
						Home
					</Link>
					<Link href='/jobs' className='header-post-find'>
						Find a job
					</Link>
					<Link href='/post-job-info' className='header-post-post'>
						Post a job
					</Link>
					<Link href='/packages' className=' flex items-center gap-1 text-[#b8b9b9] ml-[-2rem]'>
						<Image
							className='package-image'
							src={"/images/icons/package-icon.svg"}
							width={26}
							height={26}
							alt='packages'
						/>
						Packages
					</Link>
				</div>
				<div className='post-btn-group'>
					<Link href={"/contact"}>
						<Button
							icon={"images/icons/contact.svg"}
							style={{ maxWidth: "227px", height: "62px", borderRadius: "18px", gap: "10px" }}
							className={`btn-green-outlined`}
						>
							Contact us
						</Button>
					</Link>

					<Link href={"/post-resume"}>
						<Button
							icon={"images/icons/add.svg"}
							style={{ maxWidth: "185px", gap: "10px" }}
							className='btn header-post-resume'
						>
							Post your resume
						</Button>
					</Link>
					<LoginBtn />
				</div>
			</div>
		</div>
	);
};

export default TopHeader;
