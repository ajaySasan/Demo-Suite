import React, { useState, ChangeEvent, useEffect } from "react";
import "./Global.scss";
import { Header } from "./ui-layout/Header";
import { Register } from "./demo-data/Register";
import { Threats } from "./demo-data/Threats";
import { Metrics } from "./demo-data/Metrics";
import { PopUpAlert } from "./PopUpAlert";
import MetricsTest from "./demo-data/MetricsTest";
import { Devices } from "./demo-data/DevicesNew";

function App() {
  const [seeDetails, setSeeDetails] = useState<boolean>(false);
  //const [demoDate, setDemoDate] = useState<string>("");
  const [demoDate, setDemoDate] = useState<string>(
    new Date().toISOString().substr(0, 10)
  ); // Changes default date to today
  const [alertWindow, setAlertWindow] = useState<boolean | null>(null);
  const [alertContent, setAlertContent] = useState<string>("");

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (alertWindow !== null) {
      timer = setTimeout(() => {
        setAlertWindow(null);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [alertWindow]);

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDemoDate(event.target.value);
  };

  const showAlert = (success: boolean, message: string) => {
    setAlertWindow(success);
    setAlertContent(message);
  };

  const [operatorId, setOperatorId] = useState<any>(1);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value)) {
      setOperatorId(value);
    }
  };

  return (
    <div>
      <Header />
      <div className="homePageContainer">
        <div className="appMain"></div>
        <div>
          <label htmlFor="operatorId">Operator ID:</label>
          <input
            type="number"
            id="operatorId"
            value={operatorId !== null ? operatorId : ""}
            onChange={handleInputChange}
          />
        </div>

        <div className="demoButtons">
          <MetricsTest
            demoDate={demoDate}
            showAlert={showAlert}
            operatorId={operatorId}
          />
        </div>
        <button
          className="moreDetailsBtn"
          onClick={() => {
            setSeeDetails(!seeDetails);
          }}
        >
          {seeDetails ? "Hide Details" : "More Details"}
        </button>
        <div className="content">
          {seeDetails && (
            <>
              <div className="demoDate">
                <div className="inline">
                  <h2>Enter Demo Date</h2>
                </div>
                <div>
                  <i className="bi bi-calendar" />

                  <label>Demo Date:</label>
                  <i className="bi bi-calendar" />
                </div>
                <input
                  type="date"
                  placeholder="Demo Date"
                  value={demoDate}
                  onChange={handleDateChange}
                />
              </div>
              <Register showAlert={showAlert} operatorId={operatorId}/>
              <Devices showAlert={showAlert} operatorId={operatorId} />
              <Threats demoDate={demoDate} showAlert={showAlert} />
              <Metrics demoDate={demoDate} showAlert={showAlert} />
            </>
          )}
        </div>
      </div>
      {alertWindow !== null && (
        <PopUpAlert variable={alertContent} isSuccess={alertWindow} />
      )}
    </div>
  );
}

export default App;
