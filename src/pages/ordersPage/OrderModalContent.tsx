import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import 'antd/dist/antd.css'; // 引入 Ant Design 的 CSS 样式

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

interface OrderModalContentProps {
  order: Order;
  closeModal: () => void;
}

const OrderModalContent: React.FC<OrderModalContentProps> = ({
  order,
  closeModal,
}) => {
  const [tempOrder, setTempOrder] = useState<Order>({ ...order });
  const [isPaid, setIsPaid] = useState<boolean>(order.is_paid);

  useEffect(() => {
    setTempOrder(order);
    setIsPaid(order.is_paid);
  }, [order]);

  const handleUpdateOrder = () => {
    // updateOrder(tempOrder);
    closeModal();
  };

  return (
    <Modal
      visible={true}
      title="訂單細節"
      onCancel={closeModal}
      footer={[
        <button
          key="cancel"
          className="btn btn-outline-secondary"
          onClick={closeModal}
        >
          取消
        </button>,
        <button
          key="confirm"
          className="btn btn-primary"
          onClick={handleUpdateOrder}
        >
          確認
        </button>,
      ]}
    >
      <div className="row">
        <div className="col-md-4">
          <h3>用戶資料</h3>
          <table className="table">
            <tbody>
              <tr>
                <th style={{ width: '100px' }}>姓名</th>
                <td>{tempOrder.user.name}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{tempOrder.user.email}</td>
              </tr>
              <tr>
                <th>電話</th>
                <td>{tempOrder.user.tel}</td>
              </tr>
              <tr>
                <th>地址</th>
                <td>{tempOrder.user.address}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-md-8">
          <h3>訂單細節</h3>
          <table className="table">
            <tbody>
              <tr>
                <th style={{ width: '100px' }}>訂單編號</th>
                <td>{tempOrder.id}</td>
              </tr>
              <tr>
                <th>下單時間</th>
                <td>{new Date(tempOrder.create_at).toLocaleDateString()}</td>
              </tr>
              <tr>
                <th>付款時間</th>
                <td>
                  {tempOrder.paid_date ? (
                    new Date(tempOrder.paid_date).toLocaleDateString()
                  ) : (
                    <span>時間不正確</span>
                  )}
                </td>
              </tr>
              <tr>
                <th>付款狀態</th>
                <td>
                  {tempOrder.is_paid ? (
                    <strong className="text-success">已付款</strong>
                  ) : (
                    <span className="text-muted">尚未付款</span>
                  )}
                </td>
              </tr>
              <tr>
                <th>總金額</th>
                <td>${tempOrder.total}</td>
              </tr>
            </tbody>
          </table>
          <h3>選購商品</h3>
          <table className="table">
            <thead>
              <tr>
                <th>商品名稱</th>
                <th>數量 / 單位</th>
                <th className="text-end">總價</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(tempOrder.products).map(([key, product]) => (
                <tr key={key}>
                  <td>{product.title}</td>
                  <td>{product.qty} / {product.unit}</td>
                  <td className="text-end">${product.final_total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  );
};

export default OrderModalContent;


// success, bootstrap
// import React, { useEffect, useState } from 'react';
// import withModal from '../../HOC/withModal';

// interface Order {
//   id: number;
//   user: {
//     name: string;
//     email: string;
//     tel: string;
//     address: string;
//   };
//   create_at: string;
//   paid_date?: string | null;
//   is_paid: boolean;
//   total: number;
//   products: {
//     id: number;
//     // product: {
//     //   title: string;
//     // };
//     title: string;

//     qty: number;
//     unit: string;
//     final_total: number;
//   }[];
// }

// interface OrderModalContentProps {
//   order: Order;
//   closeModal: () => void;
//   // updateOrder: (order: Order) => void;
// }

// const OrderModalContent: React.FC<OrderModalContentProps> = ({
//   order,
//   closeModal,
//   // updateOrder,
// }) => {
//   const [tempOrder, setTempOrder] = useState<Order>({ ...order });
//   const [isPaid, setIsPaid] = useState<boolean>(order.is_paid);
//   console.log("tempOrder", tempOrder); // todo stday
//   useEffect(() => {
//     setTempOrder(order);
//     setIsPaid(order.is_paid);
//   }, [order]);

//   const handleUpdateOrder = () => {
//     // updateOrder(tempOrder);
//     closeModal();
//   };

//   return (
//     <div className="modal fade" id="productModal" tabIndex={-1} role="dialog" aria-hidden="true">
//       <div className="modal-dialog modal-xl" role="document">
//         <div className="modal-content border-0">
//           <div className="modal-header bg-dark text-white">
//             <h5 className="modal-title">訂單細節</h5>
//             <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
//           </div>
//           <div className="modal-body">
//             <div className="row">
//               <div className="col-md-4">
//                 <h3>用戶資料</h3>
//                 <table className="table">
//                   <tbody>
//                     <tr>
//                       <th style={{ width: '100px' }}>姓名</th>
//                       <td>{tempOrder.user.name}</td>
//                     </tr>
//                     <tr>
//                       <th>Email</th>
//                       <td>{tempOrder.user.email}</td>
//                     </tr>
//                     <tr>
//                       <th>電話</th>
//                       <td>{tempOrder.user.tel}</td>
//                     </tr>
//                     <tr>
//                       <th>地址</th>
//                       <td>{tempOrder.user.address}</td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//               <div className="col-md-8">
//                 <h3>訂單細節</h3>
//                 <table className="table">
//                   <tbody>
//                     <tr>
//                       <th style={{ width: '100px' }}>訂單編號</th>
//                       <td>{tempOrder.id}</td>
//                     </tr>
//                     <tr>
//                       <th>下單時間</th>
//                       <td>{new Date(tempOrder.create_at).toLocaleDateString()}</td>
//                     </tr>
//                     <tr>
//                       <th>付款時間</th>
//                       <td>
//                         {tempOrder.paid_date ? (
//                           new Date(tempOrder.paid_date).toLocaleDateString()
//                         ) : (
//                           <span>時間不正確</span>
//                         )}
//                       </td>
//                     </tr>
//                     <tr>
//                       <th>付款狀態</th>
//                       <td>
//                         {tempOrder.is_paid ? (
//                           <strong className="text-success">已付款</strong>
//                         ) : (
//                           <span className="text-muted">尚未付款</span>
//                         )}
//                       </td>
//                     </tr>
//                     <tr>
//                       <th>總金額</th>
//                       <td>${tempOrder.total}</td>
//                     </tr>
//                   </tbody>
//                 </table>
//                 <h3>選購商品</h3>
//                 <table className="table">
//                   <thead>
//                     <tr>
//                       <th>商品名稱</th>
//                       <th>數量 / 單位</th>
//                       <th className="text-end">總價</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {Object.entries(tempOrder.products).map(([key, product]) => (
//                       <tr key={key}>
//                         <td>{product.title}</td>
//                         <td>{product.qty} / {product.unit}</td>
//                         <td className="text-end">${product.final_total}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//           <div className="modal-footer">
//             <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal" onClick={closeModal}>
//               取消
//             </button>
//             <button type="button" className="btn btn-primary" onClick={handleUpdateOrder}>
//               確認
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default withModal(OrderModalContent);
