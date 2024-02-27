import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";

const apiURL = "https://apidev.blackdice.io";
const endpointThreat = "/svc/mock/create-many-threats";
const deviceIdEndpoint = "/pa/devices/all"; // may need to change !?!?!?!?!?
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6NTIwLCJzZXNzaW9uVG9rZW4iOnsiaWQiOjcwNTgsInNlc3Npb24iOiJjNzEzNTAxNTNkOTBhMGI1NDY1M2U1M2I2ZjE4MGMyMCIsInUiOiIyYTI1YTQyYTQ5MzEwY2RjZjAzMzM1OGMzYWY5YTk1MDFiMGUwOTEyIiwidXBkYXRlZEF0IjoiMjAyNC0wMi0xNFQxMjo1NzoxNC4yMTNaIiwiY3JlYXRlZEF0IjoiMjAyNC0wMi0xNFQxMjo1NzoxNC4yMTNaIn0sImlhdCI6MTcwNzkxNTQzNH0.GBDe1PNnqYfWYae1XQi74rv2qykN9fCzxGPYbgafrfg";

const header = {
  "auth-token": token,
};

interface threats {
  deviceId: number;
  threatType: string;
  key: string;
  description: string;
  action: string;
  createdAt: string;
  updatedAt: string;
}

interface ThreatsProps {
  demoDate: string;
  showAlert: (success: boolean, message: string) => void;
}

interface DateFilter {
  past24Hours: number;
  past7Days: number;
  past30Days: number;
  past60Days: number;
}

export const Threats: React.FC<ThreatsProps> = ({ demoDate, showAlert }) => {
  const [alertWindow, setAlertWindow] = useState<boolean | null>(null);

  //Percentages

  const [threatDataNum, setThreatDate] = useState<number>(0);
  const [dateFilter, setDateFilter] = useState<DateFilter>({
    past24Hours: 0,
    past7Days: 30,
    past30Days: 30,
    past60Days: 40,
  });

  const percentValue = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: keyof DateFilter
  ) => {
    const newValue = parseFloat(event.target.value);
    const updateValue = { ...dateFilter, [field]: newValue };
    setDateFilter(updateValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!demoDate!) {
      alert("Please select a Demo Date");
    } else if (threatDataNum < 0) {
      alert("You cannot enter a number less an 0");
    } else {
      const value = parseInt(event.target.value);
      setThreatDate(value);
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

  const datePercentages = (
    totalResult: number,
    dateFilter: {
      past24Hours: number;
      past7Days: number;
      past30Days: number;
      past60Days: number;
    }
  ) => {
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

  const dateRatio = datePercentages(threatDataNum, dateFilter);

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

  // List of Device ID's

  // const deviceId: number[] = [ 16114, 16115, 16116, 16167, 16168, 16169, 16176, 16227, 16638, ];

  const [numIds, setNumIds] = useState<number>();
  const [idsArray, setIdsArray] = useState<number[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get<any[]>(`${apiURL}${deviceIdEndpoint}`, {
        headers: header,
      });
      const idsArray = response.data.slice(0, numIds).map((item) => item.id);
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

  // Expanded

  const [expand, setExpand] = useState<boolean>(false);

  const handleExpand = () => {
    setExpand(!expand);
  };

  // Submit Request

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    //event.preventDefault();

    const totalValue = Object.values(dateFilter).reduce(
      (acc, val) => acc + val,
      0
    );

    if (totalValue !== 100) {
      alert("Total must equal 100");
      return; // Exit the function if total value is not 100
    }

    if (!threatDataNum) {
      alert("Enter the amount of Threat Data you want to populate");
    } else {
      const threats: threats[] = dateRatio.map((threatDate) => {
        const randomDeviceId: number =
          idsArray[Math.floor(Math.random() * idsArray.length)];

        const threatResult: any = randomizeThreat(threat); // Calls 'key' and 'threatType'
        const threatWebsite: string = `demo.${threatResult.key}.com blocked by BlackDice Shield`; // Calls 'description'

        return {
          deviceId: randomDeviceId,
          threatType: threatResult.threatType,
          key: threatResult.key,
          description: threatWebsite,
          action: "WARN:BLOCK_SITE",
          createdAt: threatDate,
          updatedAt: threatDate,
        };
      });
      console.log(threats);
      axios
        .post(apiURL + endpointThreat, {
          threats: threats,
        })
        .then((response) => {
          console.log(response.data);
          if (response.status >= 200 && response.status < 300) {
            showAlert(true, "Threats successfully created");
          } else {
            showAlert(false, "Error creating Threats");
          }
        })
        .catch((err) => {
          console.log(err);
          showAlert(false, "Error creating Threats");
        });
    }
  };

  // Return JSX

  return (
    <div className="threats">
      <h2>Threats</h2>
      <form id="threatForm">
        <i className="bi bi-shield-exclamation" />
        <label>Amount of Threats:</label>
        <i className="bi bi-shield-exclamation" />
        <input
          type="number"
          placeholder="Threats"
          value={threatDataNum}
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
