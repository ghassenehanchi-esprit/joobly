import React from "react";
import styles from "./postJobActions.module.scss";
import Image from "next/image";

interface PostJobActionsPropsTypes {
	image: any;
	color: string;
	data: string[];
}
const PostJobActions = ({ image, color, data }: PostJobActionsPropsTypes) => {
	return (
		<section className={styles["post-job-actions"]}>
			{data.map((item, index) => (
				<div key={index} className={styles["post-job-actions__wrapper"]}>
					<Image width={22} height={20} src={image} alt='' />
					<p style={{ color: `${color}` }}>{item}</p>
				</div>
			))}
		</section>
	);
};

export default PostJobActions;
