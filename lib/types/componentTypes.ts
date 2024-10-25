import bronze from "@/public/images/logos/bronzePlan.svg";
import { BRONZE_PLAN_PERMISSIONS } from "@/lib/constant/constants";

export type ButtonProps = {
	onClick?: () => void;
	style?: React.CSSProperties;
	className?: string;
	disabled?: boolean;
	type?: "button" | "submit" | "reset";
	icon?: string;
	children: any;
	hoverIcon?: string;
};

export interface optionItems {
	id: string;
	label: string | number;
}

export type DropdownProps = {
	onClick?: () => void;
	queryPushing?: any;
	style?: React.CSSProperties;
	className?: string;
	icon?: any;
	items: optionItems[];
	headerTitle: string;
	defaultSelected?: number | string;
};

export type JobData = {
	id?: number;
	_id?: string;
	jobTitle: string;
	description: string;
	jobUrl: string;
	location: string;
	salary?: number | string;
	currency?: string;
	salaryDetail?: string;
	postedDate?: string;
	workType?: string;
	education?: string;
	jobTime?: string;
	advertisedDate?: string;
	closeDate?: string;
	companyDetails?: {
		ceoCompany?: string;
		founded?: string;
		companySize?: string;
		companyWebsite?: string;
	};
};

export type KayValueDataType = {
	key: string;
	value: string | number;
};

export type CountryType = {
	code: string;
	label: string;
	phone: string;
	suggested?: boolean;
};
export type PermissionsDataType = {
	name: string;
	permission: boolean;
};

export type PlanContainerDataType = {
	title: string;
	logo: any;
	data: PermissionsDataType[];
	planPrice: number;
	isActive: boolean;
};

export type ServicePlanType = {
	title: string;
	price: number;
};
export interface JobsPagePropsTypes {
	params?: { value: string | number };
	searchParams?: {
		location: string | undefined;
		jobTitle: string | undefined;
		workType: string | undefined;
		salary: string | undefined;
	};
}
export type PackageType = {
	title: string;
	percent: string;
	value: string;
	active: boolean;
};
export type UserMenuProps = {
	items: {
		id: string;
		label: string;
		path: string;
	}[];
	user: {
		token: string;
		username: string;
		email: string;
	};
};
