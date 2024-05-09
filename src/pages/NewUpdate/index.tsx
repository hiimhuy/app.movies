import { getDataNewUpdate } from '@/src/components/NewUpdate'
import { IMovie } from '@/src/model/type'
import React, { useState, useEffect } from 'react'

const NewUpdatePage = () => {
  const [data, setData] = useState<IMovie | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newData: IMovie = await getDataNewUpdate();
        setData(newData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    return () => {
    };
  }, []);

  console.log(data);

  return (
    <div>NewUpdate</div>
  );
}

export default NewUpdatePage;
