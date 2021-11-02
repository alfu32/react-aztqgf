import React, { useEffect, useState } from 'react';
import { factoryMockApi, reqres, fetchFakeList, fetchList } from './service';

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
      setItems(result.data);
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
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} <small>{item.price}eur</small>
          </li>
        ))}
      </ul>
    );
  }
}
