import React from "react";
import { useDropzone } from "react-dropzone";
import styles from "./dropzone.module.scss";
import Image from "next/image";
import file from "@/public/images/icons/file.svg";
const Dropzone = ({ onFileSelect }: { onFileSelect: (file: File) => void }) => {
	const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
		onDrop: (acceptedFiles) => {
			if (acceptedFiles.length > 0) {
				onFileSelect(acceptedFiles[0]);
			}
		},
		maxFiles: 1,
	});
	const files = acceptedFiles.map((file: any) => (
		<li key={file.path}>
			{file.path} - {file.size} bytes
		</li>
	));

	return (
		<section className={styles["dropzone-container"]}>
			<p className={styles["dropzone-container__label"]}>CV/Resume</p>
			<div {...getRootProps({ className: styles["dropzone"] })}>
				<input {...getInputProps()} />
				<Image src={file} width={32} height={32} alt='' />
				<h1>Drop file here</h1>
				<p>(.pdf, .docx, .doc, .txt)</p>
			</div>
			<aside>
				<ul>{files}</ul>
			</aside>
		</section>
	);
};

export default Dropzone;
