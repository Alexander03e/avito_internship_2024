import { OrderStatus } from "common/types/orders";

export const getOrderStatus = (status: number) => {
    switch (status) {
        case OrderStatus.Created:
            return "Создан";
        case OrderStatus.Paid:
            return "Оплачен";
        case OrderStatus.Transport:
            return "В доставке";
        case OrderStatus.DeliveredToThePoint:
            return "Доставлен в пункт выдачи";
        case OrderStatus.Received:
            return "Получен";
        case OrderStatus.Archived:
            return "В архиве";
        case OrderStatus.Refund:
            return "Возврат";
        default:
            return "Неизвестный статус";
    }
}