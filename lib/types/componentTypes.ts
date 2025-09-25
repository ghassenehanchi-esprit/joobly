import bronze from "@/public/images/logos/bronzePlan.svg";
import { BASIC_PLAN_PERMISSIONS } from "@/lib/constant/constants";

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
    language: string;
    workType: string;
	jobCategory: string;
    jobTime: string;
    salary: number;
	salaryLabel: string;
    currency: string;
    salaryDetail: string;
    advertisedDate: string;
	experienceLevel: string;
    postedDate: string;
    closeDate: string
    education: string;
    companyDetails: {
        ceoCompany: string;
        founded: string;
        companySize: string;
        companyWebsite: string;
	},
	views: number;
    jobPostAuthorId: string;
    createdAt?: Date;
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
	points: number;
	percent: string;
	value?: string;
	active: boolean;
	price?: number | string;
};
export interface JobsPagePropsTypes {
        params?: { value: string | number };
        searchParams?: {
                jobTitle: string | string[] | undefined;
                workType: string | string[] | undefined;
                jobTime: string | string[] | undefined;
                jobCategory: string | string[] | undefined;
                language: string | string[] | undefined;
                location: string | string[] | undefined;
                education: string | string[] | undefined;
                experienceLevel: string | string[] | undefined;
                salary: string | string[] | undefined;
                salaryLabel: string | string[] | undefined;
        };
}
export type PackageType = {
	title: string;
	points: number;
	percent: string;
	value?: string;
	active: boolean;
	price?: number;
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
