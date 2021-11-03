import React, { useEffect, useState } from 'react';
import { factoryMockApi, reqres, fetchFakeList, fetchList } from './service';
import './style.css';

export function ExHttp() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [catalog, setCatalog] = useState([]);
  const [cart, setCart] = useState({});
  const addProductToCart = (catalogItem) => {
    const newCart = { ...cart };
    newCart[catalogItem.id] = {
      catalogItem,
      quantity: (newCart[catalogItem.id] || { quantity: 0 }).quantity + 1,
    };
    setCart(newCart);
  };
  const removeProductFromCart = (item) => {
    const newCart = { ...cart };
    if (newCart[item.catalogItem.id].quantity > 1) {
      newCart[item.catalogItem.id].quantity -= 1;
    } else {
      if (confirm(`remove ${item.catalogItem.productName} from cart ?`)) {
        delete newCart[item.catalogItem.id];
      }
    }
    setCart(newCart);
  };
  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(async () => {
    let result = null;
    try {
      result = await factoryMockApi(
        '6180fc328bfae60017adfd31',
        'products'
      ).all();
      console.log(result);
      setIsLoaded(true);
      setCatalog(Array.prototype.slice.call(result));
    } catch (error) {
      setIsLoaded(true);
      setError(error);
    }
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    let total = Object.values(cart).reduce(
      (acc, v, i, a) => {
        acc.pcs += v.quantity;
        acc.price += v.quantity * v.catalogItem.unitPrice;
        return acc;
      },
      { pcs: 0, price: 0, avg: 0 }
    );
    total.avg = new Number(total.price / (total.pcs || 1)).toFixed(2);
    return (
      <>
        <h4>Cart</h4>
        <table className="table">
          <tr className="row" key={'00'}>
            <th className="cell">productName</th>
            <th className="cell">unitPrice[eur]</th>
            <th className="cell">quantity[pcs]</th>
            <th className="cell">total[eur]</th>
            <th>
              <button onClick={() => addProductToCart(item)}>empty</button>
            </th>
          </tr>
          {Object.values(cart).map((item) => (
            <>
              <tr className="row" key={'0' + item.catalogItem.id}>
                <td className="cell">{item.catalogItem.productName}</td>
                <td className="cell">{item.catalogItem.unitPrice}eur</td>
                <td className="cell">{item.quantity}pcs</td>
                <td className="cell">
                  {item.quantity * item.catalogItem.unitPrice}eur
                </td>
                <td>
                  <button onClick={() => removeProductFromCart(item)}>-</button>
                </td>
              </tr>
            </>
          ))}
          <tr>
            <th>total</th>
            <th>{total.avg}</th>
            <th>{total.pcs}</th>
            <th>{total.price}</th>
          </tr>
        </table>
        <h4>Catalog</h4>
        <table className="table">
          {catalog.map((item) => (
            <>
              <tr className="row" key={'a' + item.id}>
                <td className="cell">{item.productName}</td>
                <td rowSpan={2}>
                  <button onClick={() => addProductToCart(item)}>
                    add to cart
                  </button>
                </td>
              </tr>
              <tr className="row" key={'b' + item.id}>
                <td className="cell">{item.unitPrice}eur</td>
              </tr>
            </>
          ))}
        </table>
      </>
    );
  }
}
