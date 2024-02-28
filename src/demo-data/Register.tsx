import axios from "axios";
import React, { useState, useEffect } from "react";

interface Register {
  email: string;
  pass: string;
  serialNumber: string;
}

interface RegisterProps {
  showAlert: (success: boolean, message: string) => void;
}

export const Register: React.FC<RegisterProps> = ({ showAlert }) => {
  const [alertWindow, setAlertWindow] = useState<boolean | null>(null);

  // State

  const [accountNum, setAccountNum] = useState<any>(0);

  // Input Change

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (accountNum < 0) {
      alert("You cannot enter a number less an 0");
    } else setAccountNum(value);
  };

  // Number of Accounts

  const numOfAccounts = (register: Register[], amountOfAccounts: number) => {
    let accountJson = {
      register: [] as Register[],
    };

    for (let i = 0; i < amountOfAccounts; i++) {
      const accounts = {
        email: register[i].email,
        pass: register[i].pass,
        serialNumber: register[i].serialNumber,
      };
      accountJson.register.push(accounts);
    }
    console.log(accountJson.register);
  };

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

  // Surnames

  const lastNames: string[] = [
    "Smith",
    "Jones",
    "Williams",
    "Brown",
    "Taylor",
    "Davies",
    "Evans",
    "Wilson",
    "Thomas",
    "Johnson",
    "Roberts",
    "Walker",
    "Robinson",
    "Clark",
    "Wright",
    "Mitchell",
    "Lewis",
    "Jackson",
    "Harris",
    "King",
    "Green",
    "Baker",
    "Turner",
    "White",
    "Edwards",
    "Collins",
    "Hill",
    "Clarke",
    "Morris",
    "Thompson",
  ];

  // Creates a random email address

  const emailAddress = () => {
    const randomFirstName: number = Math.floor(
      Math.random() * firstNames.length
    );
    const randomLastName: number = Math.floor(Math.random() * lastNames.length);

    const firstNameResult: string = firstNames[randomFirstName];
    const lastNameResult: string = lastNames[randomLastName];

    const emailSyntax: string = Array.from(
      { length: Math.floor(Math.random() * 5) + 1 },
      () => {
        const chars = "0123456789!-_";
        return chars[Math.floor(Math.random() * chars.length)];
      }
    ).join("");

    const emailHook: string[] = [
      "@demo.net",
      "@demo.co.uk",
      "@demo.com",
      "@demo.uk",
      "@demo.ai",
    ];
    const randomEmailHook: number = Math.floor(
      Math.random() * emailHook.length
    );
    const emailResult = emailHook[randomEmailHook];

    const email: string = `${firstNameResult}${lastNameResult}${emailSyntax}${emailResult}`;

    return email;
  };

  // Randomly generates a password

  const passwordSyntax: string = Array.from(
    { length: Math.floor(Math.random() * (16 - 8 + 1)) + 8 },
    () => {
      const passChars: string =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!£$%&*-_=+@#?";
      return passChars[Math.floor(Math.random() * passChars.length)];
    }
  ).join("");

  const password: string = passwordSyntax;

  // Define a set to store generated serial numbers

  const serialSet: Set<string> = new Set();

  // Randomly generates a serial number

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

  // Activate Account

  const activateAccount = async (verificationLink: string) => {
    try {
      await axios.get(verificationLink);
      console.log("Account Activated:");
    } catch (error) {
      console.log("Error activating account:", error);
    }
  };

  // Submit Request

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!accountNum) {
      alert("Enter the amount of Accounts you want to populate");
    } else {
      const numAccounts = parseInt(accountNum);

      for (let i = 0; i < numAccounts; i++) {
        const email = emailAddress();
        const pass = password;
        const serialNum = serialNumber();

        const userData = {
          email,
          pass,
          serialNumber: serialNum,
          referer: "dev.blackdice.io"
        };

        const apiURL = "https://apidev.blackdice.io";
        const endpointThreat = "/pa/auth/register";

        try {
          const response = await axios.post(apiURL + endpointThreat, userData )
          // const response = await axios.post(apiURL + endpointThreat, userData, {
          //   headers: { referer: "dev.blackdice.io" },
          // });
          console.log(response.data);

          if (response.status >= 200 && response.status < 300) {
            showAlert(true, "Accounts successfully created");
            const notificationLink = response.data.notificationLink;
            await activateAccount(notificationLink);
          } else {
            showAlert(false, "Error creating Accounts");
          }
        } catch (error) {
          console.error(error);
          showAlert(false, "Error creating Accounts");
        }

        numOfAccounts([userData], 1);
      }
    }
  };

  // Return JSX Values

  return (
    <div className="createAccount">
      <h2>Create Account</h2>
      <form id="createAccountForm" onSubmit={handleSubmit}>
        <i className="bi bi-person-circle" />
        <label className="register">Generate User Account:</label>
        <i className="bi bi-person-circle" />

        <input
          type="number"
          placeholder="Amount of Accounts"
          value={accountNum}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
