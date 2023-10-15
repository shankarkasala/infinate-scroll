import React, { useState, useEffect, useRef } from 'react';
import './style.css';

export default function App() {
  const [data, setData] = useState([]);
  const divRef = useRef();
  let count = 0;
  const previousData = useRef([]); // Store the previous data

  useEffect(() => {
    const eWatch = divRef.current;

    if (!eWatch) {
      // Element is not available yet, you can handle this case
      return;
    }

    let observ = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && e.intersectionRatio > 0) {
          // Load data only if it's currently empty
          if (data.length === 0) {
            setTimeout(() => {
              loadData(5);
            }, 1000);
          }
        }
      });
    });

    observ.observe(eWatch);
  }, [data]);

  const loadData = (n) => {
    let items = [];
    for (let i = 0; i < n; i++) {
      items.push('item' + count++);
    }

    previousData.current = [...previousData.current, ...items]; // Store previous data
    setData(previousData.current); // Update the data state
  };

  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
      <div className="container">
        {data &&
          data.map((res) => {
            return (
              <div className="item" key={res}>
                {res}
              </div>
            );
          })}
      </div>
      <div ref={divRef} className="element-to-watch">
        Loading...
      </div>
    </div>
  );
}
