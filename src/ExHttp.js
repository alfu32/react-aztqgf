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
    return (
          <>
          <h4>Cart</h4>
      <table className="table">
        {Object.values(cart).map((item) => (
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
