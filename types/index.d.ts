declare type SearchParamProps = {
    params: { [key: string]: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

declare interface RegisterProps {
    name?: string;
    email: string;
    password: string;
    image?: string;
    admin?: boolean,
}

declare interface UserTypes {
	name: string;
	email: string;
	image: string;
}

