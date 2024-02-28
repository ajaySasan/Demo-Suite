// This code gets specific ID or ranges between certain IDs

import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import { PopUpAlert } from "../PopUpAlert";

const apiURL = "https://apidev.blackdice.io";
const endpointMetrics = "/svc/mock/create-many-device-metrics";
const endpointThreat = "/svc/mock/create-many-threats";

const deviceIdEndpoint = "/pa/devices/all"; // may need to change !?!?!?!?!?

// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6NTIwLCJzZXNzaW9uVG9rZW4iOnsiaWQiOjcwNTgsInNlc3Npb24iOiJjNzEzNTAxNTNkOTBhMGI1NDY1M2U1M2I2ZjE4MGMyMCIsInUiOiIyYTI1YTQyYTQ5MzEwY2RjZjAzMzM1OGMzYWY5YTk1MDFiMGUwOTEyIiwidXBkYXRlZEF0IjoiMjAyNC0wMi0xNFQxMjo1NzoxNC4yMTNaIiwiY3JlYXRlZEF0IjoiMjAyNC0wMi0xNFQxMjo1NzoxNC4yMTNaIn0sImlhdCI6MTcwNzkxNTQzNH0.GBDe1PNnqYfWYae1XQi74rv2qykN9fCzxGPYbgafrfg";

// const header = {
//   "auth-token": token,
// };

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6NTYzLCJzZXNzaW9uVG9rZW4iOnsiaWQiOjcyNDEsInNlc3Npb24iOiIzMGMzMDc2NDcyZjIwMDIzMDRiNmE5OGYzYjRmZGZhNSIsInUiOiI5YmQ3YTcyMGQzN2FkZjUyZDI4YjJlYjY0ZTlmZTBlMzMzMWZiODk4IiwidXBkYXRlZEF0IjoiMjAyNC0wMi0yM1QxMzoyODoxOS42OTlaIiwiY3JlYXRlZEF0IjoiMjAyNC0wMi0yM1QxMzoyODoxOS42OTlaIn0sImlhdCI6MTcwODY5NDg5OX0.LRa-nCJUd_AuoUVyGClwhmX_ujYxkwTGdrjzjLk_lWg";

const header = {
  "auth-token": token,
};

interface DeviceIdMacAddress {
  deviceId: number;
  macAddress: string;
}
interface threats {
  deviceId: number;
  threatType: string;
  key: string;
  description: string;
  action: string;
  createdAt: any;
  updatedAt: any;
}
interface Metric {
  deviceId: number;
  mac: string;
  signal: string;
  txBitrate: number;
  rxBitrate: number;
  txBytes: number;
  rxBytes: number;
  createdAt: any;
  updatedAt: any;
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

interface ThreatsAndMetrics {
  demoDate: string;
  showAlert: (success: boolean, message: string) => void;
}

export const Metrics: React.FC<ThreatsAndMetrics> = ({
  demoDate,
  showAlert,
}) => {
  const [alertWindow, setAlertWindow] = useState<boolean | null>(null);
  const [threatPercentages, setThreatPercentages] = useState<{
    [key: string]: number;
  }>({
    app_fw: 10, // Default percentages for each threat type
    dev_fw: 10,
    mw_site: 10,
  });

  const initialThreatPercentages: { [key: string]: number } = {
    app_fw: 5,
    dev_fw: 2,
    mw_site: 10,
    dev_ab: 8,
    unauth: 2,
    app_blk: 3,
    data_leak: 6,
    dev_vuln: 24,
    c2_site: 1,
    ras_site: 12,
    ph_site: 2,
    bot_site: 13,
    sp_site: 1,
    ad_site: 2,
    fas_site: 9,
  };

  // const handleThreatPercentageChange = (
  //   event: React.ChangeEvent<HTMLInputElement>,
  //   threatKey: string
  // ) => {
  //   const newValue = parseFloat(event.target.value);
  //   // Update the percentage for the specified threat type
  //   setThreatPercentages({ ...threatPercentages, [threatKey]: newValue });
  // };
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

  // Number of Issues

  const [metricData, setMetricDate] = useState<number>(1);

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

  const generateRandomDates = (totalResult: number) => {
    const numDates24Hours = Math.ceil((dateFilter.past24Hours / 100) * totalResult);
    const numDates7Days = Math.ceil((dateFilter.past7Days / 100) * totalResult);
    const numDates30Days = Math.ceil((dateFilter.past30Days / 100) * totalResult);
    const numDates60Days = Math.ceil((dateFilter.past60Days / 100) * totalResult);
  
    const allDates = [] as string[];
  
    const formatDate = (date: Date) => {
      return date.toISOString().slice(0, 19).replace("T", " ");
    };
  
    const demoDate = new Date(); //Declares today's date.
  
    const past24Hours = new Date(demoDate.getTime() - (24 * 60 * 60 * 1000));
    const past7Days = new Date(demoDate.getTime() - (7 * 24 * 60 * 60 * 1000));
    const past30Days = new Date(demoDate.getTime() - (30 * 24 * 60 * 60 * 1000));
    const past60Days = new Date(demoDate.getTime() - (60 * 24 * 60 * 60 * 1000));
  
    const dates24Hours = Array.from({ length: numDates24Hours }, () =>
      formatDate(randomDate24Hours(demoDate))
    );
    const dates7Days = Array.from({ length: numDates7Days }, () =>
      formatDate(random7Days(demoDate, past24Hours))
    );
    const dates30Days = Array.from({ length: numDates30Days }, () =>
      formatDate(random30Days(demoDate, past7Days))
    );
    const dates60Days = Array.from({ length: numDates60Days }, () =>
      formatDate(random60Days(demoDate, past30Days))
    );
  
    allDates.push(...dates24Hours, ...dates7Days, ...dates30Days, ...dates60Days);
  
    // Select a random date from allDates
    const randomIndex = Math.floor(Math.random() * allDates.length);
    return allDates[randomIndex];
  };
  
  

  // console.log(datePercentages(10))
// create a function to randomly select dates based on their percentages! ref to dateFilter.
  
  const [numIds, setNumIds] = useState<number>();
  const [idsArray, setIdsArray] = useState<any[]>([]);
  const [idsArrayMetrics, setIdsArrayMetrics] = useState<any[]>([]);
  const [userInputDeviceId, setUserInputDeviceId] = useState<
    number | undefined
  >();

  const fetchData = async (deviceId?: number) => {
    try {
      const response = await axios.get<any[]>(`${apiURL}${deviceIdEndpoint}`, {
        headers: header,
      });

      let filteredIdsArray = response.data;

      if (deviceId) {
        filteredIdsArray = response.data.filter((item) => item.id === deviceId);
      } else {
        // Filter the response to select only deviceIds between 16160 and 16175
        filteredIdsArray = response.data.filter((item) => {
          const deviceId = item.id;
          return deviceId;
        });
      }

      // Map the filtered results to required format
      const formattedIdsArray = filteredIdsArray.map((item) => ({
        deviceId: item.id,
        mac: item.macAddress,
      }));

      setIdsArray(formattedIdsArray);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (userInputDeviceId !== undefined) {
      fetchData(userInputDeviceId);
    } else {
      fetchData();
    }
  }, [userInputDeviceId, numIds]); // Fetch data whenever numIds or userInputDeviceId changes

  const handleInputDeviceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUserInputDeviceId(parseInt(event.target.value));
  };

  // Metrics Device ID - LIMIT OF 12

  // const fetchLimitedDeviceIds = async () => {
  //   try {
  //     const response = await axios.get<any[]>(`${apiURL}${deviceIdEndpoint}`, {
  //       headers: header,
  //     });

  //     // Filter the response to select only deviceIds between 16160 and 16175
  //     const filteredIdsArray = response.data.filter((item) => {
  //       const deviceId = item.id;
  //       return deviceId >= 16170 && deviceId <= 16170;
  //     });

  //     // Map the filtered results to required format
  //     const limitedIdsArray = filteredIdsArray.map((item) => ({
  //       deviceId: item.id,
  //       mac: item.macAddress,
  //     }));

  //     setIdsArrayMetrics(limitedIdsArray); // Update state with limited device IDs for metrics
  //   } catch (error) {
  //     console.error("Error fetching limited data:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchLimitedDeviceIds();
  // }, []);

  // const handleDeviceIdChange = (event: any) => {
  //   setNumIds(parseInt(event.target.value, 10));
  // };

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

  const updatedAt = (createdAtDate: Date) => {
    const past24Hours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    const randomUpdate = Math.floor(Math.random() * past24Hours);
    const updatedAtDate = new Date(createdAtDate.getTime() + randomUpdate);

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

  const dateRatio = generateRandomDates(metricData);

  // Expanded

  const [expand, setExpand] = useState<boolean>(false);

  const handleExpand = () => {
    setExpand(!expand);
  };

  // Threats

  // Number of Threats

  const numOfThreats = (threats: threats[], amountOfThreats: number) => {
    let threatJson = {
      threats: [] as threats[],
    };

    for (let i = 0; i < amountOfThreats; i++) {
      const threat = {
        deviceId: threats[i].deviceId,
        threatType: threats[i].threatType,
        key: threats[i].key,
        description: threats[i].description,
        action: threats[i].action,
        createdAt: threats[i].createdAt,
        updatedAt: threats[i].updatedAt,
      };

      threatJson.threats.push(threat);
    }

    console.log(threatJson);
  };

  // detete

  useEffect(() => {
    fetchData();
  }, [numIds]); // Fetch data whenever numIds changes

  // List of Threats

  const threat: any[] = [
    {
      key: "app_fw",
      threatType: "Apps firewalled",
    },
    {
      key: "dev_fw",
      threatType: "Device firewalled",
    },
    {
      key: "mw_site",
      threatType: "Malware site blocked",
    },
    {
      key: "dev_ab",
      threatType: "Device abnormality identified",
    },
    {
      key: "unauth",
      threatType: "Unauthorised access request refused",
    },
    {
      key: "app_blk",
      threatType: "App install blocked",
    },
    {
      key: "data_leak",
      threatType: "Suspicious data leak",
    },
    {
      key: "dev_vuln",
      threatType: "Device vulnerability found",
    },
    {
      key: "c2_site",
      threatType: "Command and Control server blocked",
    },
    {
      key: "ras_site",
      threatType: "Remote access server blocked",
    },
    {
      key: "ph_site",
      threatType: "Phishing site blocked",
    },
    {
      key: "bot_site",
      threatType: "Botnet site blocked",
    },
    {
      key: "sp_site",
      threatType: "Spam generator site blocked",
    },
    {
      key: "ad_site",
      threatType: "Adware site blocked",
    },
    {
      key: "fas_site",
      threatType: "File hosting site blocked",
    },
  ];

  // Function to randomize threats

  const randomizeThreat = (threatIndex: any[]) => {
    const randomThreat: number = Math.floor(Math.random() * threatIndex.length);
    return threatIndex[randomThreat];
  };

  // Submit Request
  const randomNumBetween1And100 = () => {
    return Math.floor(Math.random() * 100) + 1;
  };
  
  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    const numMetrics = 12; // Number of metrics to be posted every 3 seconds
    const totalPercentage = Object.values(initialThreatPercentages).reduce(
      (acc, val) => acc + val,
      0
    );
  
    if (totalPercentage !== 100) {
      alert("Total percentage must equal 100");
      return; // Exit the function if total percentage is not 100
    }
  
    if (!metricData) {
      alert("Enter the amount of Metric Data you want to populate");
    } else {
      const metrics: Metric[] = [];
      const threats: threats[] = [];
  
      for (let i = 0; i < numMetrics; i++) {
        // Generate metrics
        const randomDeviceId: any = idsArray[Math.floor(Math.random() * idsArray.length)];
        const createdAtDate = generateRandomDates(metricData);
        const updatedAtDate = updatedAt(new Date(createdAtDate));

        metrics.push({
            deviceId: randomDeviceId.deviceId,
            mac: randomDeviceId.mac,
            signal: randomSignal(),
            txBitrate: txBitrate(),
            rxBitrate: rxBitrate(),
            txBytes: txByte(),
            rxBytes: rxByte(),
            createdAt: createdAtDate,
            updatedAt: updatedAtDate, // Assuming updatedAt depends on createdAt
            rxBitRateAverage: randomRxBitRateAverage(),
            txBitRateAverage: randomTxBitRateAverage(),
            signalNum: signalNum(),
        });
    }
    
    // Generate threats based on percentages
    Object.entries(initialThreatPercentages).forEach(([key, percentage]) => {
        const numThreats = Math.floor((numMetrics * percentage) / 50);
        const threatIndex = threat.filter((item) => item.key === key);
    
        for (let i = 0; i < numThreats; i++) {
            const randomThreat = randomizeThreat(threatIndex);
            const createdAtDate = generateRandomDates(metricData);
            const randomDeviceId: any = idsArray[Math.floor(Math.random() * idsArray.length)];
            const updatedAtDate = updatedAt(new Date(createdAtDate));

            if (randomThreat) {
                const threat = {
                    deviceId: randomDeviceId.deviceId,
                    threatType: randomThreat.threatType,
                    key: randomThreat.key,
                    description: `demo.${randomThreat.key}.com blocked by BlackDice Shield`,
                    action: "WARN:BLOCK_SITE",
                    createdAt: createdAtDate,
                    updatedAt: updatedAtDate, // Assuming updatedAt depends on createdAt
                };
                //console.log(createdAtDate);

                threats.push(threat);
            } else {
                console.log(`No matching threat found for key: ${key}`);
            }
        }
    });
    console.log(metrics);
    console.log(threats);
  
      // Post metrics
      axios
        .post(apiURL + endpointMetrics, {
          metrics: metrics,
        })
        .then((response) => {
          console.log(response.data);
          if (response.status >= 200 && response.status < 300) {
            showAlert(true, "Threats and Metrics successfully created");
          } else {
            showAlert(false, "Error creating Threats and Metrics");
          }
        })
        .catch((err) => {
          console.log(err);
          showAlert(false, "Error creating Threats and Metrics ");
        });
  
      // Post threats
      axios
        .post(apiURL + endpointThreat, {
          threats: threats,
        })
        .then((response) => {
          console.log(response.data);
          if (response.status >= 200 && response.status < 300) {
            showAlert(true, "Threats and Metrics successfully created");
          } else {
            showAlert(false, "Error creating Threats and Metrics");
          }
        })
        .catch((err) => {
          console.log(err);
          showAlert(false, "Error creating Threats and Metrics");
        });
    }
  };
  // Returns JSX

  // Start the demo loop
  const [demoRunning, setDemoRunning] = useState<boolean>(false);
  let interval: NodeJS.Timeout;
  const [demoInterval, setDemoInterval] = useState<any>(null);

  // Start the demo loop

  const startDemo: any = {
    preventDefault: () => {},
    target: {
      value: "",
    },
  };

  const startDemoLoop = () => {
    setDemoRunning(true);
    handleSubmit(startDemo);

    console.log("Entering Demo mode");
    const newInterval = setInterval(handleSubmit, 1000); // Call handleSubmit every 5 seconds
    setDemoInterval(newInterval); // Store the interval ID in state

    // Stop the demo loop after 60 minutes
    setTimeout(() => {
      clearInterval(interval); // Clear the interval
      setDemoRunning(false);
      console.log("Demo stopped after 60 minutes.");
    }, 60 * 60 * 1000);
  };

  // Stop the demo loop
  const stopDemoLoop = () => {
    if (demoInterval) {
      clearInterval(demoInterval); // Clear the interval
      setDemoRunning(false);
      console.log("Demo stopped manually.");
      showAlert(false, "Demo Stopped");
    }
  };

  return (
    <div>
      <input
        type="number"
        className="deviceIdInput"
        value={userInputDeviceId}
        placeholder="Device ID"
        onChange={handleInputDeviceChange}
      />

      <button type="button" onClick={startDemoLoop}>
        START DEMO
      </button>
      <button type="button" onClick={stopDemoLoop}>
        STOP DEMO
      </button>
    </div>
  );
};

export default Metrics;
