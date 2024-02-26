import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/data');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const responseData = await response.json();
      console.log('Response Data:', responseData); // Add this line for debugging
      setData(responseData.map(item => ({ film_id: item[0], title: item[1], category_id: item[2], name: item[3] })));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  return (
    <div>
      <h1>Backend Data:</h1>
      {data.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Film ID</th>
              <th>Title</th>
              <th>Category ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.film_id}</td>
                <td>{item.title}</td>
                <td>{item.category_id}</td>
                <td>{item.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

export default App;
