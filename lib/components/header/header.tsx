import React from "react";
import "./header.scss";
import Button from "../button/button";
import Link from "next/link";
import Image from "next/image";
import LoginBtn from "../loginBtn/loginBtn";
import { TiThMenu } from "react-icons/ti";

const TopHeader = () => {
	return (
		<div className='header'>
			<div className='header-top'>
				<div className='search-post-group flex gap-2 -ml-3 xl:gap-12 items-center'>
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
					{/*hrader nav links*/}
					<div className="text-sm xl:text-base hidden lg:flex gap-2 xl:gap-12 text-baseBlack50 ">
						<Link href='/' className='flex items-center gap-1'>
								<Image
								className='w-5 h-5 package-image'
								src={"/images/icons/home.svg"}
								width={26}
								height={26}
								alt='packages'
								/>
								<span className="text-nowrap">Home</span>
						</Link>
						<Link href='/jobs' className='flex items-center gap-1'>
								<Image
								className='w-5 h-5 package-image'
								src={"images/icons/findJob.svg"}
								width={26}
								height={26}
								alt='packages'
								/>
								<span className="text-nowrap">Find a job</span>
						</Link>
						<Link href='/post-job-info' className='flex items-center gap-1'>
								<Image
								className='w-5 h-5 package-image'
								src={"/images/icons/listing.svg"}
								width={26}
								height={26}
								alt='packages'
								/>
								<span className="text-nowrap">Post a job</span>
						</Link>
						<Link href='/packages' className='flex items-center gap-1'>
								<Image
									className='w-5 h-5 package-image'
									src={"/images/icons/package-icon.svg"}
									width={26}
									height={26}
									alt='packages'
								/>
								<span className="text-nowrap">Packages</span>
						</Link>
					</div>
					
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
				<TiThMenu className="burger-menu-button"/>
			</div>
		</div>
	);
};

export default TopHeader;
