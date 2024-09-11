import { ChangeEventHandler, ReactElement } from "react";
import styles from './order-sort.module.scss'
import { Select } from "common/components/ui/Select";

import { useOrderStateSelector } from "common/context/selectors";
import { useAppContext } from "common/context/hooks";
import { priceSortVariants } from "./consts";

export const OrderPriceSort = (): ReactElement => {
    const { currentPriceSort } = useOrderStateSelector()

    const { updateOrderState } = useAppContext()

    const handleChangeFilter: ChangeEventHandler<HTMLSelectElement> = (event) => {
        updateOrderState({currentPriceSort: event.target.value})
    }

    return (
        <div className={styles.wrapper}>
            <Select items={priceSortVariants} currentValue={currentPriceSort} onChange={handleChangeFilter} title='Сортировать по цене'/>
        </div>
    )
}