import styles from "./OrderPage.module.scss";
import { MainLayout } from "../../layout/mainLayout"; import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Spin } from "antd";
import { AdminLayout } from "../../layout/adminLayout";
// import Pagination from './Pagination';
// import OrderModal from './OrderModal';
// import DeleteModal from './DeleteModal';
import { API_BASE } from "../../redux/helper/apiHelper";
// import withModal from '../../HOC/withModal';
import withModal, { ModalProps } from '../../HOC/withModal';


import OrderModalContent from "./OrderModalContent";
// interface Product {
//   product: {
//     title: string;
//     unit: string;
//   };
//   qty: number;
// }

interface Product {
  title: string;
  qty: number;
  unit: string;
}
interface User {
  email: string;
}

// interface Order {
//   id: number;
//   create_at: string;
//   user: User;
//   products: Product[];
//   total: number;
//   is_paid: boolean;
// }

interface Order {
  id: number;
  user: {
    name: string;
    email: string;
    tel: string;
    address: string;
  };
  create_at: string;
  paid_date?: string | null;
  is_paid: boolean;
  total: number;
  products: {
    id: number;

    title: string;

    qty: number;
    unit: string;
    final_total: number;
  }[];
}

interface Pagination {
  current_page: number;
  total_pages: number;
}

interface OrdersPageProps {

  // openModal: (order: Order) => void;
}

const Orders: React.FC<OrdersPageProps & ModalProps> = ({ openModal, closeModal }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tempOrder, setTempOrder] = useState<Partial<Order>>({});
  const [pagination, setPagination] = useState<Partial<Pagination>>({});
  const [currentPage, setCurrentPage] = useState(1);

  const api = '/admin/orders';

  useEffect(() => {
    getOrders();
  }, [currentPage]);

  const getOrders = async (page: number = 1) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE}${api}?page=${page}`);
      console.log("response.data.orders", response.data.orders); // todo stday
      setOrders(response.data.orders);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Failed to fetch orders', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updatePaid = async (order: Order) => {
    const api = `/admin/order/${order.id}`;
    const paid = { is_paid: order.is_paid };
    setIsLoading(true);
    try {
      const response = await axios.put(api, { data: paid });
      getOrders(currentPage);
      console.log('Updated payment status', response);
    } catch (error) {
      console.error('Failed to update payment status', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteOrder = async () => {
    const api = `/admin/order/${tempOrder.id}`;
    setIsLoading(true);
    try {
      const response = await axios.delete(api);
      getOrders(currentPage);
      console.log('Deleted order', response);
    } catch (error) {
      console.error('Failed to delete order', error);
    } finally {
      setIsLoading(false);
    }
  };

  const openOrderModal = (isNew: boolean, order: Partial<Order>) => {
    // setTempOrder({ ...order });
    // openModal();
    // setModalContent(<OrderModalContent order={order} closeModal={closeModal} />);
    // openModal(<OrderModalContent order={order} />);
    openModal(<OrderModalContent order={order as Order} closeModal={closeModal} />);

  };

  const openDeleteModal = (order: Partial<Order>) => {
    setTempOrder({ ...order });
    // Handle showing the modal here
  };

  return (
    <div>
      {/* <AdminLayout> */}
      <Spin spinning={isLoading}>
        <table className="table mt-4">
          <thead>
            <tr>
              <th>購買時間</th>
              <th>Email</th>
              <th>購買款項</th>
              <th>應付金額</th>
              <th>是否付款</th>
              <th>編輯</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.map((order, key) => (
              <tr key={key} className={!order.is_paid ? 'text-secondary' : ''}>
                <td>{new Date(order.create_at).toLocaleDateString()}</td>
                <td>{order?.user?.email}</td>
                <td>
                  <ul className="list-unstyled">
                    {order && order.products &&
                      Object.entries(order.products).map(([key, product], i) => (
                        <li key={key}>
                          {product.title} 數量：{product.qty} {product.unit}
                        </li>
                      ))
                    }
                  </ul>
                </td>
                <td className="text-right">{order.total}</td>
                <td>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`paidSwitch${order.id}`}
                      checked={order.is_paid}
                      onChange={() => updatePaid(order)}
                    />
                    <label className="form-check-label" htmlFor={`paidSwitch${order.id}`}>
                      {order.is_paid ? '已付款' : '未付款'}
                    </label>
                  </div>
                </td>
                <td>
                  <div className="btn-group">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => openOrderModal(false, order)}
                    >
                      檢視
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => openDeleteModal(order)}
                    >
                      刪除
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <OrderModal order={tempOrder} updatePaid={updatePaid} />
        <DeleteModal item={tempOrder} deleteOrder={deleteOrder} />
        <Pagination pages={pagination} setCurrentPage={setCurrentPage} /> */}
      </Spin>
      {/* </AdminLayout> */}
    </div>
  );
};

const OrdersPage = withModal(Orders);
export { OrdersPage }; 