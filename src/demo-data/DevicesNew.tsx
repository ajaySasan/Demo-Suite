import axios from "axios";
import React, { useState, useEffect } from "react";

interface Devices {
  name: string;
  description: string;
  macAddress: string;
  phoneNumber: string;
  deviceCategoryId: number;
  webFilter: string;
  rules: any[];
  haandle: number;
}

interface DevicesProps {
  showAlert: (success: boolean, message: string) => void;
  operatorId: any;
}

let numOfHaandles = 300;

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6NjQ2LCJzZXNzaW9uVG9rZW4iOnsiaWQiOjE3NjkzLCJzZXNzaW9uIjoiMTM5MDhhZDI4MDM0NmYxYjBmNzM4MmQwMGM1ZGMwYzkiLCJ1IjoiYjI4ZWU2MmFhNjgwYmRjZjUwZDNkMGIxZDgwNzczZmQ1MTNhN2JiMiIsInVwZGF0ZWRBdCI6IjIwMjQtMDMtMDdUMTQ6MTg6NDcuNTE2WiIsImNyZWF0ZWRBdCI6IjIwMjQtMDMtMDdUMTQ6MTg6NDcuNTE2WiJ9LCJpYXQiOjE3MDk4MjExMjd9.V1SVEvjG9lHZiQdrZaU_FBiuzXOpKOiUVgUQ2DQEMEo";

const header = {
  "auth-token": token,
};

export const Devices: React.FC<DevicesProps> = ({ showAlert, operatorId }) => {
  const getHaandleId = `/op/${operatorId}/cpe_table?size=${numOfHaandles}&sort=id&order=desc`; // CHANGE TO HAANDLE I CREATE

  const [macAddress, setMacAddress] = useState<string>("");
  const [deviceDescr, setDeviceDescr] = useState<string>("");
  const [deviceCat, setDeviceCat] = useState<number>(0);
  const [deviceMsisdn, setDeviceMsisdn] = useState<string>("");
  const [alertWindow, setAlertWindow] = useState<boolean | null>(null);
  const [deviceNum, setDeviceNum] = useState<any>(0);

  // Input Change

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (deviceNum < 0) {
      alert("You cannot enter a number less an 0");
    } else setDeviceNum(value);
  };

  // Number of Accounts

  const numOfDevices = (Devices: Devices[], amountOfAccounts: number) => {
    let deviceJson = {
      Devices: [] as Devices[],
    };

    for (let i = 0; i < amountOfAccounts; i++) {
      const accounts = {
        name: Devices[i].name,
        description: Devices[i].description,
        macAddress: Devices[i].macAddress,
        phoneNumber: Devices[i].phoneNumber,
        deviceCategoryId: Devices[i].deviceCategoryId,
        webFilter: Devices[i].webFilter,
        rules: Devices[i].rules,
        haandle: Devices[i].haandle,
      };
      deviceJson.Devices.push(accounts);
    }
    //console.log(deviceJson.Devices);
  };

  // Descriptions

  const deviceDescriptions: { vendor: string; type: string; cat: number }[] = [
    // Phones
    { vendor: "Apple Inc.", type: "iPhone 5S", cat: 1 },
    { vendor: "Apple Inc.", type: "iPhone 6S Plus", cat: 1 },
    { vendor: "Apple Inc.", type: "iPhone 7 Plus", cat: 1 },
    { vendor: "Apple Inc.", type: "iPhone 8 Plus", cat: 1 },
    { vendor: "Apple Inc.", type: "iPhone X", cat: 1 },
    { vendor: "Apple Inc.", type: "iPhone 11 Pro Max", cat: 1 },
    { vendor: "Samsung", type: "Galaxy S10", cat: 1 },
    { vendor: "Samsung", type: "Galaxy S20", cat: 1 },
    { vendor: "Google", type: "Pixel 4", cat: 1 },
    { vendor: "Google", type: "Pixel 5", cat: 1 },
    { vendor: "OnePlus", type: "OnePlus 9", cat: 1 },
    { vendor: "OnePlus", type: "OnePlus 9 Pro", cat: 1 },
    // Laptops
    { vendor: "Apple Inc.", type: "MacBook Pro 16", cat: 2 },
    { vendor: "Dell", type: "XPS 15", cat: 2 },
    { vendor: "Lenovo", type: "ThinkPad X1 Carbon", cat: 2 },
    { vendor: "HP", type: "Spectre x360", cat: 2 },
    { vendor: "Microsoft", type: "Surface Laptop 4", cat: 2 },
    { vendor: "Asus", type: "ZenBook Pro Duo", cat: 2 },
    // Desktops
    { vendor: "Apple Inc.", type: "iMac 27", cat: 3 },
    { vendor: "Dell", type: "Alienware Aurora R11", cat: 3 },
    { vendor: "HP", type: "OMEN Desktop PC", cat: 3 },
    { vendor: "Lenovo", type: "ThinkCentre M720q", cat: 3 },
    { vendor: "Acer", type: "Aspire TC", cat: 3 },
    { vendor: "Asus", type: "ROG Strix GL12", cat: 3 },
    // Game Consoles
    { vendor: "Sony", type: "PlayStation 5", cat: 4 },
    { vendor: "Microsoft", type: "Xbox Series X", cat: 4 },
    { vendor: "Nintendo", type: "Switch", cat: 4 },
    { vendor: "Sony", type: "PlayStation 4 Pro", cat: 4 },
    { vendor: "Microsoft", type: "Xbox One X", cat: 4 },
    { vendor: "Nintendo", type: "Switch Lite", cat: 4 },
    { vendor: "Sony", type: "PlayStation 4 Slim", cat: 4 },
    { vendor: "Microsoft", type: "Xbox One S", cat: 4 },
    { vendor: "Nintendo", type: "2DS XL", cat: 4 },
    { vendor: "Sony", type: "PlayStation VR", cat: 4 },
    { vendor: "Microsoft", type: "Xbox One", cat: 4 },
    { vendor: "Nintendo", type: "3DS XL", cat: 4 },
    // Smart TV
    { vendor: "Samsung", type: "Smart TV QLED 4K", cat: 5 },
    { vendor: "LG", type: "OLED Smart TV", cat: 5 },
    { vendor: "Sony", type: "BRAVIA Smart TV", cat: 5 },
    { vendor: "TCL", type: "6-Series QLED Roku Smart TV", cat: 5 },
    { vendor: "Hisense", type: "ULED Smart TV", cat: 5 },
    { vendor: "Vizio", type: "P-Series Quantum X Smart TV", cat: 5 },
    { vendor: "Panasonic", type: "HDX Smart TV", cat: 5 },
    { vendor: "Sharp", type: "Aquos Smart TV", cat: 5 },
    // Smart Speakers
    { vendor: "Amazon", type: "Echo Dot (4th Gen)", cat: 6 },
    { vendor: "Google", type: "Google Home Mini", cat: 6 },
    { vendor: "Apple", type: "HomePod Mini", cat: 6 },
    { vendor: "Sonos", type: "One SL", cat: 6 },
    { vendor: "Bose", type: "Home Speaker 300", cat: 6 },
    { vendor: "Samsung", type: "Galaxy Home Mini", cat: 6 },
    { vendor: "Xiaomi", type: "Mi Smart Speaker", cat: 6 },
    { vendor: "Harman Kardon", type: "Invoke", cat: 6 },
    //Tablets
    { vendor: "Apple Inc.", type: "iPad Pro", cat: 7 },
    { vendor: "Samsung", type: "Galaxy Tab S7", cat: 7 },
    { vendor: "Microsoft", type: "Surface Pro 7", cat: 7 },
    { vendor: "Amazon", type: "Fire HD 10", cat: 7 },
    { vendor: "Lenovo", type: "Tab P11 Pro", cat: 7 },
    { vendor: "Huawei", type: "MatePad Pro", cat: 7 },
    { vendor: "Google", type: "Pixel Slate", cat: 7 },
    { vendor: "Asus", type: "ZenPad 3S 10", cat: 7 },
    // Watches
    { vendor: "Apple Inc.", type: "Apple Watch Series 6", cat: 8 },
    { vendor: "Samsung", type: "Galaxy Watch 3", cat: 8 },
    // Printers
    { vendor: "HP", type: "LaserJet Pro MFP M428fdn", cat: 9 },
    { vendor: "Epson", type: "EcoTank ET-4760", cat: 9 },
  ];

  const getRandomDeviceDescription = (): {
    vendor: string;
    type: string;
    cat: number;
  } => {
    const randomIndex = Math.floor(Math.random() * deviceDescriptions.length);
    return deviceDescriptions[randomIndex];
  };

  //console.log(randomDevice])

  // Names

  const firstNames: string[] = [
    "Oliver",
    "Amelia",
    "Harry",
    "Isla",
    "Jack",
    "Ava",
    "George",
    "Mia",
    "Noah",
    "Sophia",
    "Leo",
    "Emily",
    "Jacob",
    "Grace",
    "Charlie",
    "Poppy",
    "Freddie",
    "Isabella",
    "Alfie",
    "Aria",
    "Henry",
    "Ella",
    "William",
    "Lily",
    "Thomas",
    "Harper",
    "James",
    "Evie",
    "Joshua",
    "Millie",
  ];

  const getRandomFirstName = (): string => {
    const randomIndex = Math.floor(Math.random() * firstNames.length);
    return firstNames[randomIndex];
  };

  const getRandomDeviceName = (): string => {
    const randomDevice = getRandomDeviceDescription();
    const randomFirstName = getRandomFirstName();
    return `${randomFirstName}'s`;
  };

  //console.log(getRandomDeviceName());

  //const deviceName = getRandomFirstName();

  //console.log(deviceName)

  // Randomly generates a serial number

  const serialSet: Set<string> = new Set();

  const serialNumber = (): string => {
    const characters: string = "123456789ABCDEF";
    const segments: number = 6;
    const segmentLength: number = 2;

    const generateSegment = (): string => {
      let randomSegment: string = "";
      for (let i = 0; i < segmentLength; i++) {
        const segmentIndex: number = Math.floor(
          Math.random() * characters.length
        );
        randomSegment += characters[segmentIndex];
      }
      return randomSegment;
    };

    const generateUniqueSerial = (): string => {
      let uniqueSerial: string = "";
      for (let i = 0; i < segments; i++) {
        uniqueSerial += (i > 0 ? ":" : "") + generateSegment();
      }
      return uniqueSerial;
    };

    let serialUnique: string = generateUniqueSerial();
    while (serialSet.has(serialUnique)) {
      serialUnique = generateUniqueSerial();
    }
    serialSet.add(serialUnique);
    return serialUnique;
  };

  //console.log(serialNumber());

  // Age group

  const ageGroups = ["UNDER12", "EARLYTEEN", "YOUNGADULT", "NOSHIELD"];

  const getRandomAgeGroup = (): string => {
    const randomIndex = Math.floor(Math.random() * ageGroups.length);
    return ageGroups[randomIndex];
  };

  const randomAgeGroup = getRandomAgeGroup();

  // Phone number

  const generatePhoneNumber = (): string => {
    const prefix = "07";
    const randomDigits = Math.floor(100000000 + Math.random() * 900000000);
    return prefix + randomDigits.toString().substring(0, 9);
  };

  const phoneNumber = generatePhoneNumber();

  // Get Haandle ID

  const [randomId, setRandomId] = useState<number | null>(null);

  // Fetch random ID whenever the component mounts or updates
  const fetchRandomId = async () => {
    try {
      const response = await axios.get(`${apiURL}${getHaandleId}`, {
        headers: header,
      });
      //console.log(response.data); // Log entire response
      const responseData = response.data.data;
      const randomIndex = Math.floor(Math.random() * responseData.length);
      const newRandomId = responseData[randomIndex].ID;
      return newRandomId; // Return the new random ID
    } catch (error) {
      console.error("Error fetching random ID:", error);
      return null;
    }
  };

  // Call fetchRandomId function when component mounts
  useEffect(() => {
    fetchRandomId();
  }, []);

  // Submit Request

  const apiURL = "https://apibeta.blackdice.io";
  const endpointThreat75 = "/pa/devices";
  const endpointThreat25 = "/pa/devices/unconfirmed";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!deviceNum) {
      alert("Enter the amount of Accounts you want to populate");
    } else {
      const numDevices = parseInt(deviceNum);
      const threat75Percentage = 0.75; // 75% of data to endpointThreat75

      for (let i = 0; i < numDevices; i++) {
        // Fetch a new random ID for each device
        const newRandomId = await fetchRandomId();

        const randomDeviceDescription = getRandomDeviceDescription();
        const deviceData = {
          name: `${getRandomDeviceName()} ${randomDeviceDescription.type}`,
          description: randomDeviceDescription.type,
          macAddress: serialNumber(),
          phoneNumber: phoneNumber,
          deviceCategoryId: randomDeviceDescription.cat,
          webFilter: randomAgeGroup,
          rules: [],
          haandle: newRandomId, // Use the new random ID
        };

        // Determine the endpoint to use based on random number
        const randomNumber = Math.random();
        const endpoint =
          randomNumber < threat75Percentage
            ? endpointThreat75
            : endpointThreat25;
        console.log(deviceData);

        // Api Call

        try {
          const response = await axios.post(apiURL + endpoint, deviceData, {
            headers: header,
          });

          if (response.status >= 200 && response.status < 300) {
            showAlert(true, "Devices successfully created");
          } else {
            showAlert(false, "Error creating Devices");
          }
        } catch (error) {
          console.error(error);
          showAlert(false, "Error creating Devices");
        }
      }
    }
  };

  return (
    <div className="createDevice">
      <h2>Create Device</h2>
      <form id="createDeviceForm" onSubmit={handleSubmit}>
        <i className="bi bi-person-circle" />
        <label className="Devices">Generate User Account:</label>
        <i className="bi bi-person-circle" />

        <input
          type="number"
          placeholder="Amount of Devices"
          value={deviceNum}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
