import classes from "../modules/css/App.module.css";

const UpdateSuccessAlert: React.FC<{
  isSuccess: boolean;
  isError: boolean;
}> = ({ isSuccess, isError }) => {
  return (
    <div className={classes.mainContainer}>
      {isSuccess ? (
        <div className="alert alert-success" role="alert">
          Exchange rate successfully updated
        </div>
      ) : (
        isError && (
          <div className="alert alert-danger" role="alert">
            Failed to update exchange rate
          </div>
        )
      )}
    </div>
  );
};

export default UpdateSuccessAlert;
