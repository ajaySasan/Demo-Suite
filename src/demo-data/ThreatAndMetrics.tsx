import React, { useState, useEffect } from "react";
import axios from "axios";

interface Device {
  ID: number;
  mac_address: string;
}

interface ApiResponse {
  data: Device[];
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
  operatorId: any;
}

const ThreatsAndMetrics: React.FC<ThreatsAndMetrics> = ({
  demoDate,
  showAlert,
  operatorId,
}) => {
  // States

  const [demoMessage, setDemoMessage] = useState<string>("");
  const [demoRunning, setDemoRunning] = useState<boolean>(false);
  const [demoInterval, setDemoInterval] = useState<any>(null);
  const [idsArray, setIdsArray] = useState<any[]>([]);
  let interval: NodeJS.Timeout;
  const [dateFilter, setDateFilter] = useState<DateFilter>({
    past24Hours: 10,
    past7Days: 20,
    past30Days: 30,
    past60Days: 40,
  });

  // Database API

  const apiURL = "https://apibeta.blackdice.io";
  const endpointMetrics = "/svc/mock/create-many-device-metrics";
  const endpointThreat = "/svc/mock/create-many-threats";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6NjQ2LCJzZXNzaW9uVG9rZW4iOnsiaWQiOjE3Njk0LCJzZXNzaW9uIjoiMTdiNDk0OWMxYzc4NGRkOWQ3ODE0YzRiZmNkNTBlYzIiLCJ1IjoiYjI4ZWU2MmFhNjgwYmRjZjUwZDNkMGIxZDgwNzczZmQ1MTNhN2JiMiIsInVwZGF0ZWRBdCI6IjIwMjQtMDMtMDdUMTQ6NDE6MjUuNjczWiIsImNyZWF0ZWRBdCI6IjIwMjQtMDMtMDdUMTQ6NDE6MjUuNjczWiJ9LCJpYXQiOjE3MDk4MjI0ODV9.iY7cKJjJEg0UsGySFGdCPrfeg0D9BdKc5RP2TFrvWtY";
  const header = {
    "auth-token": token,
  };
  const deviceIdOperator: any = `/op/operatordevices/${operatorId}?size=200`;

  // Threat Type Ratio Split

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
    const numDates24Hours = Math.ceil(
      (dateFilter.past24Hours / 100) * totalResult
    );
    const numDates7Days = Math.ceil((dateFilter.past7Days / 100) * totalResult);
    const numDates30Days = Math.ceil(
      (dateFilter.past30Days / 100) * totalResult
    );
    const numDates60Days = Math.ceil(
      (dateFilter.past60Days / 100) * totalResult
    );

    const allDates = [] as string[];

    const formatDate = (date: Date) => {
      return date.toISOString().slice(0, 19).replace("T", " ");
    };

    const demoDate = new Date();

    const past24Hours = new Date(demoDate.getTime() - 24 * 60 * 60 * 1000);
    const past7Days = new Date(demoDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    const past30Days = new Date(demoDate.getTime() - 30 * 24 * 60 * 60 * 1000);
    const past60Days = new Date(demoDate.getTime() - 60 * 24 * 60 * 60 * 1000);

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

    allDates.push(
      ...dates24Hours,
      ...dates7Days,
      ...dates30Days,
      ...dates60Days
    );

    const randomIndex = Math.floor(Math.random() * allDates.length);
    return allDates[randomIndex];
  };

  const fetchData = async (deviceId?: number) => {
    try {
      const response = await axios.get<ApiResponse>(
        `${apiURL}${deviceIdOperator}`,
        {
          headers: header,
        }
      );
      const deviceData = response.data.data;

      const formattedIdsArray = deviceData.map((item: any) => ({
        deviceId: item.ID,
        mac: item.mac_address,
      }));

      setIdsArray(formattedIdsArray);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (operatorId !== undefined) {
      fetchData(operatorId);
    } else {
      fetchData();
    }
  }, [operatorId]);

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
    const past24Hours = 24 * 60 * 60 * 1000;
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

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!idsArray.length) {
      alert(
        "No Device Id available. Please wait for data to load or try a different operator."
      );
      return;
    }
    const numMetrics = 24;
    const totalPercentage = Object.values(initialThreatPercentages).reduce(
      (acc, val) => acc + val,
      0
    );

    if (totalPercentage !== 100) {
      alert("Total percentage must equal 100");
      return;
    }

    if (!metricData) {
      alert("Enter the amount of Metric Data you want to populate");
    } else {
      const metrics: Metric[] = [];
      const threats: threats[] = [];

      const totalMetricsPerThreatType: { [key: string]: number } = {};
      const totalThreatsPerThreatType: { [key: string]: number } = {};

      Object.entries(initialThreatPercentages).forEach(([key, percentage]) => {
        totalMetricsPerThreatType[key] = Math.floor(
          (numMetrics * percentage) / 100
        );
        totalThreatsPerThreatType[key] = Math.floor(
          (numMetrics * percentage) / 100
        );
      });

      Object.entries(totalMetricsPerThreatType).forEach(([key, numMetrics]) => {
        for (let i = 0; i < numMetrics; i++) {
          const randomDeviceId: any =
            idsArray[Math.floor(Math.random() * idsArray.length)];
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
            updatedAt: updatedAtDate,
            rxBitRateAverage: randomRxBitRateAverage(),
            txBitRateAverage: randomTxBitRateAverage(),
            signalNum: signalNum(),
          });
        }
      });

      Object.entries(totalThreatsPerThreatType).forEach(([key, numThreats]) => {
        const threatIndex = threat.filter((item) => item.key === key);
        for (let i = 0; i < numThreats; i++) {
          const randomThreat = randomizeThreat(threatIndex);
          const createdAtDate = generateRandomDates(metricData);
          const randomDeviceId: any =
            idsArray[Math.floor(Math.random() * idsArray.length)];
          const updatedAtDate = updatedAt(new Date(createdAtDate));

          if (randomThreat) {
            const threat = {
              deviceId: randomDeviceId.deviceId,
              threatType: randomThreat.threatType,
              key: randomThreat.key,
              description: `demo.${randomThreat.key}.com blocked by BlackDice Shield`,
              action: "WARN:BLOCK_SITE",
              createdAt: createdAtDate,
              updatedAt: updatedAtDate,
            };
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

  // Demo message

  const startDemo: any = {
    preventDefault: () => {},
    target: {
      value: "",
    },
  };

  const startDemoLoop = () => {
    if (!idsArray.length) {
      alert(
        "No Device Id available. Please wait for data to load or try a different operator."
      );
    } else {
      setDemoRunning(true);
      handleSubmit(startDemo);
      setDemoMessage("Demo has begun");

      console.log("Entering Demo mode");
      const newInterval = setInterval(handleSubmit, 4000);
      setDemoInterval(newInterval);

      setTimeout(() => {
        clearInterval(interval);
        setDemoRunning(false);
        console.log("Demo stopped after 60 minutes.");
      }, 60 * 60 * 1000);
    }
  };

  const stopDemoLoop = () => {
    if (demoInterval) {
      clearInterval(demoInterval);
      setDemoRunning(false);
      console.log("Demo stopped manually.");
      showAlert(false, "Demo Stopped");
      setDemoMessage("Demo has stopped");
      setTimeout(() => {
        setDemoMessage("");
      }, 5000);
    }
  };

  return (
    <div>
      <button type="button" onClick={startDemoLoop}>
        START DEMO
      </button>
      <button type="button" onClick={stopDemoLoop}>
        STOP DEMO
      </button>
      {demoMessage && (
        <p
          className={`message ${
            demoMessage.includes("begun")
              ? "neon-green"
              : demoMessage.includes("stopped")
              ? "warning-red"
              : ""
          }`}
        >
          {demoMessage}
        </p>
      )}
    </div>
  );
};

export default ThreatsAndMetrics;
