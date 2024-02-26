export const PopUpAlert = ({ isSuccess, variable }: { isSuccess: boolean, variable: string }) => {
    return (
      <div className={`popUpAlert ${isSuccess ? 'success' : 'error'}`}>
        {isSuccess ? (
          <div className="alertGood">
            <i className="bi bi-check-circle"></i>
            <p>{variable}</p>
          </div>
        ) : (
          <div className="alertBad">
            <i className="bi bi-exclamation-circle"></i>
            <p>{variable}</p>
          </div>
        )}
      </div>
    );
  };
  