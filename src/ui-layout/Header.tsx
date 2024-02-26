export const Header = () => {
  const blackDiceImg = require("../images/Black Dice Logo.png");
  return (
    <div>
      <header className="title">
        <div className="inlineHeader">
          <img src={blackDiceImg} className="blackDiceLogo" alt="Black Dice" />
          <h1>Demo Suite</h1>
        </div>
        <h3>
          Empower your sales demos with real-time cyber resilience. Demo data,
          real protection – experience security in action.
        </h3>
        <div></div>
      </header>
    </div>
  );
};
