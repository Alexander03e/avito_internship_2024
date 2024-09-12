import { ChangeEventHandler, ReactElement } from "react";
import styles from './order-filter.module.scss'
import { Select } from "common/components/ui/Select";
import { OrderStatus } from "common/types/orders";
import { getOrderStatus } from "../Card/utils/getOrderStatus";
import { useOrderStateSelector } from "common/context/selectors";
import { useAppContext } from "common/context/hooks";

export const OrderFilter = (): ReactElement => {
    const { currentFilter } = useOrderStateSelector()

    const { updateOrderState } = useAppContext()

    const filterData = Object.entries(OrderStatus).map(([, key]) => ({
            name: getOrderStatus(key),
            value: key
        }))

    const handleChangeFilter: ChangeEventHandler<HTMLSelectElement> = (event) => {
        updateOrderState({currentFilter: event.target.value})
    }

    return (
        <div className={styles.wrapper}>
            <Select items={filterData} currentValue={currentFilter} onChange={handleChangeFilter} title='Фильтр по статусу'/>
        </div>
    )
}