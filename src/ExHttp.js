import React, { useEffect, useState } from 'react';
import { factoryMockApi, reqres, fetchFakeList, fetchList } from './service';
import './style.css';

export function ExHttp() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

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
      setItems(Array.prototype.slice.call(result));
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
      <ul className="table">
        {items.map((item) => (
          <>
            <li className="row" key={item.id}>
              <big className="cell">{item.productName}</big>
            </li>
            <li className="row" key={item.id}>
              <small className="cell">{item.unitPrice}eur</small>
            </li>
          </>
        ))}
      </ul>
    );
  }
}
