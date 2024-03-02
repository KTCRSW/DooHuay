import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  interface Prize {
    id: string;
    name: string;
    reward: string;
    amount: string;
    number: number[];
  }
  interface RunningNumber {
    id: string;
    name: string;
    reward: string;
    amount: string;
    number: string[];
  }

  const [data, setData] = useState<{ prizes: Prize[]; runningNumbers: RunningNumber[] }>({
    prizes: [],
    runningNumbers: [],
  });

  useEffect(() => {
    const lottoApi = async () => {
      try {
        const res = await axios.get('https://lotto.api.rayriffy.com/latest');
        const responseData = res.data.response;

        setData(responseData);

        responseData.prizes.forEach((prize: Prize) => {
          console.log(prize);
        });

        responseData.runningNumbers.forEach((runningNumber: RunningNumber) => {
          console.log(runningNumber);
        });
      } catch (error) {
        console.error('Error fetching lotto data:', error);
      }
    };

    lottoApi();
  }, []);

  console.log(data);

  return <>
    <main className="mt-[10%]">
      <div className="grid flex items-center justify-center">
        <input type="text" placeholder="กรอกเลข 6 หลัก" className="shadow appearance-none border rounded w-[100%] py-3 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline " />
        <div className=" grid grid-flow-row-dense grid-cols-3 grid-rows-3 flex items-center justify-center">

          {data.prizes.map((prize: Prize) => (
            <div className="p-4 max-w-sm">
              <div className="flex rounded-lg text-bold h-full bg-gray-400 p-8 flex-col">
              <h2 className='text-white text-bold ' key={prize.name}>{prize.name}</h2>
              <hr />
                <div className="flex flex-col justify-between flex-grow">
                  <p className='text-white' key={prize.id}>{prize.number.join(', ')}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </main>
  </>;
}

export default App;
