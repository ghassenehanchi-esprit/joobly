import type { optionItems } from "@/lib/types/componentTypes";

export type FilterDefinition = {
        key: string;
        defaultSelectedIds: string[];
        queryKey: string;
        items: optionItems[];
        headerTitle: string;
        icon: string;
};
