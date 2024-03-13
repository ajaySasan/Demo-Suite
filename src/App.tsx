import React, { useState, ChangeEvent, useEffect } from "react";
import { Header } from "./ui-layout/Header";
import { Register } from "./demo-data/Register";
import { Threats } from "./demo-data/Threats";
import { Metrics } from "./demo-data/Metrics";
import { PopUpAlert } from "./PopUpAlert";
import ThreatsAndMetrics from "./demo-data/ThreatAndMetrics";
import { Devices } from "./demo-data/Devices";
import "./Global.scss";

function App() {
  // State
  const [alertWindow, setAlertWindow] = useState<boolean | null>(null);
  const [alertContent, setAlertContent] = useState<string>("");
  const [seeDetails, setSeeDetails] = useState<boolean>(false);
  const [operatorId, setOperatorId] = useState<any>(1);
  const [demoDate, setDemoDate] = useState<string>(
    new Date().toISOString().substr(0, 10)
  );

  //  Alert Window

  const showAlert = (success: boolean, message: string) => {
    setAlertWindow(success);
    setAlertContent(message);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (alertWindow !== null) {
      timer = setTimeout(() => {
        setAlertWindow(null);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [alertWindow]);

  // Demo Date Change

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDemoDate(event.target.value);
  };

  // Operator ID

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
        <div className="operator">
          <label htmlFor="operatorId">Operator ID:</label>
          <input
            type="number"
            id="operatorId"
            value={operatorId !== null ? operatorId : ""}
            onChange={handleInputChange}
          />
        </div>

        <div className="demoButtons">
          <ThreatsAndMetrics
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
              <Register showAlert={showAlert} operatorId={operatorId} />
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
