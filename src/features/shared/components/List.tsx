import { ComponentType, ReactElement } from "react";

interface ListProps<T extends object> {
    dataArray: T[];
    ListItem: ComponentType<T>;
}

export default function List<T extends object>({ dataArray, ListItem }: ListProps<T>): ReactElement {
    return (
        <>
            {dataArray.map((data) => (
                <ListItem key={(data as any).id} {...data} />
            ))}
        </>
    );
}
