import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import { PopUpAlert } from "../PopUpAlert";

const apiURL = "https://apidev.blackdice.io";
const endpointThreat = "/svc/mock/create-many-device-metrics";
const deviceIdEndpoint = "/pa/devices/all"; // may need to change !?!?!?!?!?
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6NTIwLCJzZXNzaW9uVG9rZW4iOnsiaWQiOjcwNTgsInNlc3Npb24iOiJjNzEzNTAxNTNkOTBhMGI1NDY1M2U1M2I2ZjE4MGMyMCIsInUiOiIyYTI1YTQyYTQ5MzEwY2RjZjAzMzM1OGMzYWY5YTk1MDFiMGUwOTEyIiwidXBkYXRlZEF0IjoiMjAyNC0wMi0xNFQxMjo1NzoxNC4yMTNaIiwiY3JlYXRlZEF0IjoiMjAyNC0wMi0xNFQxMjo1NzoxNC4yMTNaIn0sImlhdCI6MTcwNzkxNTQzNH0.GBDe1PNnqYfWYae1XQi74rv2qykN9fCzxGPYbgafrfg";

const header = {
  "auth-token": token,
};

interface DeviceIdMacAddress {
  deviceId: number;
  macAddress: string;
}

interface Metric {
  deviceId: number;
  mac: string;
  signal: string;
  txBitrate: number;
  rxBitrate: number;
  txBytes: number;
  rxBytes: number;
  createdAt: string;
  updatedAt: string;
  rxBitRateAverage: string;
  txBitRateAverage: string;
  signalNum: number;
}
interface DateFilter {
  past24Hours: number;
  past7Days: number;
  past30Days: number;
  past60Days: number;
}

interface MetricProps {
  demoDate: string;
  showAlert: (success: boolean, message: string) => void;
}

export const Metrics: React.FC<MetricProps> = ({ demoDate, showAlert }) => {
  const [alertWindow, setAlertWindow] = useState<boolean | null>(null);

  // States

  const [threatDataNum, setThreatDate] = useState<number>(0);
  const [dateFilter, setDateFilter] = useState<DateFilter>({
    past24Hours: 10,
    past7Days: 20,
    past30Days: 30,
    past60Days: 40,
  });

  // Percentages

  const percentValue = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: keyof DateFilter
  ) => {
    const newValue = parseFloat(event.target.value);
    const updateValue = { ...dateFilter, [field]: newValue };
    setDateFilter(updateValue);
  };
  const [metricData, setMetricDate] = useState<number>(0);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!demoDate!) {
      alert("Please select a Demo Date");
    } else if (metricData < 0) {
      alert("You cannot enter a number less an 0");
    } else {
      const value = parseInt(event.target.value);
      setMetricDate(value);
    }
  };

  // Date Filters

  const randomDate24Hours = (newDate: Date) => {
    const random24Hours = Math.floor(Math.random() * 86400000);
    const randomDate = new Date(newDate.getTime() - random24Hours);
    return randomDate;
  };

  const random7Days = (newDate: Date, past24Hours: Date) => {
    const random7Days = 8 * 24 * 60 * 60 * 1000;
    let randomPast7Days = Math.floor(Math.random() * random7Days);
    let random7DaysResult = new Date(newDate.getTime() - randomPast7Days);
    if (
      random7DaysResult.getTime() >= past24Hours.getTime() &&
      random7DaysResult.getTime() <= newDate.getTime()
    ) {
      random7DaysResult = new Date(newDate.getTime() - randomPast7Days);
    }

    return random7DaysResult;
  };

  const random30Days = (newDate: Date, past7Days: Date) => {
    const random30Days = 31 * 24 * 60 * 60 * 1000;
    let randomPast30Days = Math.floor(Math.random() * random30Days);
    let random30DaysResult = new Date(newDate.getTime() - randomPast30Days);

    if (
      random30DaysResult.getTime() >= past7Days.getTime() &&
      random30DaysResult.getTime() <= newDate.getTime()
    ) {
      random30DaysResult = new Date(newDate.getTime() - randomPast30Days);
    }

    return random30DaysResult;
  };

  const random60Days = (newDate: Date, past30Days: Date) => {
    const random60Days = 61 * 24 * 60 * 60 * 1000;
    let randomPast60Days = Math.floor(Math.random() * random60Days);
    let random60DaysResult = new Date(newDate.getTime() - randomPast60Days);

    if (
      random60DaysResult.getTime() >= past30Days.getTime() &&
      random60DaysResult.getTime() <= newDate.getTime()
    ) {
      random60DaysResult = new Date(newDate.getTime() - randomPast60Days);
    }

    return random60DaysResult;
  };

  // Splits date categories into percentages

  const datePercentages = (totalResult: number) => {
    const numDates24Hours = Math.ceil(dateFilter.past24Hours * totalResult);
    const numDates7Days = Math.ceil(dateFilter.past7Days * totalResult);
    const numDates30Days = Math.ceil(dateFilter.past30Days * totalResult);
    const numDates60Days = Math.ceil(dateFilter.past60Days * totalResult);

    const formatDate = (date: Date) => {
      return date.toISOString().slice(0, 19).replace("T", " ");
    };

    const date = new Date(demoDate); //Declares todays date.
    //const date = new Date(demoDate);

    const past24Hours = randomDate24Hours(date);
    const past7Days = random7Days(date, past24Hours);
    const past30Days = random30Days(date, past7Days);
    const past60Days = random30Days(date, past30Days);

    const dates24Hours = Array.from({ length: numDates24Hours }, () =>
      formatDate(randomDate24Hours(date))
    );
    const dates7Days = Array.from({ length: numDates7Days }, () =>
      formatDate(random7Days(date, past24Hours))
    );
    const dates30Days = Array.from({ length: numDates30Days }, () =>
      formatDate(random30Days(date, past7Days))
    );
    const dates60Days = Array.from({ length: numDates60Days }, () =>
      formatDate(random60Days(date, past30Days))
    );

    const allDates = [
      ...dates24Hours,
      ...dates7Days,
      ...dates30Days,
      ...dates60Days,
    ].slice(0, totalResult);

    return allDates;
  };

  // Device ID and Mac Address to MAP through existing devices ////////////////////////////////// MAP THROUGH DB GET REQUEST

  // const deviceIdMacAddress: DeviceIdMacAddress[] = [
  //   { deviceId: 16116, macAddress: "A1:95:93:7B:EC:79" },
  //   { deviceId: 16168, macAddress: "94:11:08:BB:47:BB" },
  //   { deviceId: 16169, macAddress: "0C:D4:95:DD:42:14" },
  //   { deviceId: 16176, macAddress: "c0:a6:00:6e:9d:c2" },
  //   { deviceId: 16638, macAddress: "47:A1:5E:41:CD:91" },
  //   { deviceId: 16167, macAddress: "70:4C:75:42:52:BE" },
  //   { deviceId: 16227, macAddress: "78:85:F5:19:5C:9E" },
  //   { deviceId: 16115, macAddress: "CE:D2:4B:C1:99:BB" },
  //   { deviceId: 16114, macAddress: "E1:2A:FE:38:C4:C7" },
  // ];

  const [numIds, setNumIds] = useState<number>();
  const [idsArray, setIdsArray] = useState<any[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get<any[]>(`${apiURL}${deviceIdEndpoint}`, {
        headers: header,
      });
      const idsArray = response.data.slice(0, numIds).map((item) => ({
        deviceId: item.id,
        mac: item.macAddress,
      }));
      setIdsArray(idsArray);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [numIds]); // Fetch data whenever numIds changes

  const handleDeviceIdChange = (event: any) => {
    setNumIds(parseInt(event.target.value, 10));
  };

  // Metric Data

  const randomSignal = () => {
    const signalStrength = ["weak", "medium", "strong"];
    const randomIndex = Math.floor(Math.random() * signalStrength.length);
    return signalStrength[randomIndex];
  };

  const txBitrate = () => {
    return Math.floor(Math.random() * 100) + 1;
  };

  const rxBitrate = () => {
    return Math.floor(Math.random() * 100) + 1;
  };

  const txByte = () => {
    return Math.floor(Math.random() * (1000000000 - 100000 + 1)) + 100000;
  };

  const rxByte = () => {
    return Math.floor(Math.random() * (1000000000 - 100000 + 1)) + 100000;
  };

  const randomRxBitRateAverage = () => {
    const rxBitRateAverage = ["low", "medium", "high"];
    const randomRxIndex = Math.floor(Math.random() * rxBitRateAverage.length);
    return rxBitRateAverage[randomRxIndex];
  };

  const randomTxBitRateAverage = () => {
    const txBitRateAverage = ["low", "medium", "high"];
    const randomTxIndex = Math.floor(Math.random() * txBitRateAverage.length);
    return txBitRateAverage[randomTxIndex];
  };

  const signalNum = () => {
    return Math.floor(Math.random() * (-25 - -90 + 1)) + -90;
  };

  // Updated at Time

  const updatedAt = (createdAt: Date) => {
    const past24Hours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    const randomUpdate = Math.floor(Math.random() * past24Hours);
    const updatedAtDate = new Date(createdAt.getTime() + randomUpdate);

    return updatedAtDate.toISOString().slice(0, 19).replace("T", " ");
  };

  // Number of Metrics

  const numOfMetrics = (metrics: Metric[], amountOfMetrics: number) => {
    let metricJson = {
      metrics: [] as Metric[],
    };

    for (let i = 0; i < amountOfMetrics; i++) {
      const metricRes = {
        deviceId: metrics[i].deviceId,
        mac: metrics[i].mac,
        signal: metrics[i].signal,
        txBitrate: metrics[i].txBitrate,
        rxBitrate: metrics[i].rxBitrate,
        txBytes: metrics[i].txBytes,
        rxBytes: metrics[i].rxBytes,
        createdAt: metrics[i].createdAt,
        updatedAt: metrics[i].updatedAt,
        rxBitRateAverage: metrics[i].rxBitRateAverage,
        txBitRateAverage: metrics[i].txBitRateAverage,
        signalNum: metrics[i].signalNum,
      };
      metricJson.metrics.push(metricRes);
    }
    console.log(metricJson);
  };

  const dateRatio = datePercentages(metricData);

  // Expanded

  const [expand, setExpand] = useState<boolean>(false);

  const handleExpand = () => {
    setExpand(!expand);
  };

  // Submit Request

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    //    event.preventDefault();

    const totalValue = Object.values(dateFilter).reduce(
      (acc, val) => acc + val,
      0
    );

    if (totalValue !== 100) {
      alert("Total must equal 100");
      return; // Exit the function if total value is not 100
    }

    if (!metricData) {
      alert("Enter the amout of Metric Data you want to populate");
    } else {
      const metrics: Metric[] = dateRatio.map((metricDate) => {
        const randomDeviceId: any =
          idsArray[Math.floor(Math.random() * idsArray.length)];

        const updatedAtDate = updatedAt(new Date(metricDate));

        return {
          deviceId: randomDeviceId.deviceId,
          mac: randomDeviceId.mac,
          signal: randomSignal(),
          txBitrate: txBitrate(),
          rxBitrate: rxBitrate(),
          txBytes: txByte(),
          rxBytes: rxByte(),
          createdAt: metricDate,
          updatedAt: updatedAtDate,
          rxBitRateAverage: randomRxBitRateAverage(),
          txBitRateAverage: randomTxBitRateAverage(),
          signalNum: signalNum(),
        };
      });

      console.log(metrics);

      axios
        .post(apiURL + endpointThreat, {
          metrics: metrics,
        })
        .then((response) => {
          console.log(response.data);
          if (response.status >= 200 && response.status < 300) {
            showAlert(true, "Metrics successfully created");
          } else {
            showAlert(false, "Error creating Metrics");
          }
        })
        .catch((err) => {
          console.log(err);
          showAlert(false, "Error creating Metrics");
        });
    }
  };

  // Returns JSX

  return (
    <div className="metrics">
      <h2>Metrics</h2>
      <form id="metricForm">
        <i className="bi bi-graph-up" />
        <label>Amount of Metrics:</label>
        <i className="bi bi-graph-up" />
        <input
          type="number"
          placeholder="Metrics"
          value={metricData}
          onChange={handleInputChange}
        />
        <div>
          <i className="bi bi-pc-display" />
          <label>Amount of Devices:</label>
          <i className="bi bi-phone" />
          <input
            type="number"
            placeholder="Amount of Devices"
            value={numIds}
            onChange={handleDeviceIdChange}
          />
        </div>
        <div className="inlineButton">
          <button type="button" onClick={handleSubmit}>
            Submit
          </button>
          <button type="button" onClick={handleExpand}>
            {expand ? "Show Less" : "Show More"}
          </button>
        </div>

        <div className={`dateContent ${expand ? "expand" : ""}`}>
          <h2>Date Filter (%)</h2>
          <h3>Past 24 Hours</h3>
          <input
            type="number"
            value={dateFilter.past24Hours}
            onChange={(e) => percentValue(e, "past24Hours")}
          />
          <h3>Past 7 Days</h3>
          <input
            type="number"
            value={dateFilter.past7Days}
            onChange={(e) => percentValue(e, "past7Days")}
          />
          <h3>Past 30 Days</h3>
          <input
            type="number"
            value={dateFilter.past30Days}
            onChange={(e) => percentValue(e, "past30Days")}
          />
          <h3>Past 60 Days</h3>
          <input
            type="number"
            value={dateFilter.past60Days}
            onChange={(e) => percentValue(e, "past60Days")}
          />
        </div>
      </form>
    </div>
  );
};

export default Metrics;
