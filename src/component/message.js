import { formatRelative } from "date-fns";

const formatDate = (date) => {
  let formattedDate = "";
  if (date) {
    // Convert the date in words relative to the current date
    formattedDate = formatRelative(date, new Date());
    // Uppercase the first letter
    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }
  return formattedDate;
};

const Message = ({ at = null, text = "", displayName = "", photoURL = "", isSender = false }) => {
  if (!text) return null;

  return (
    <div className={"d-flex"+ (isSender?" flex-row-reverse ":" ")}>
      {photoURL ? (
      
        <img
          src={photoURL}
          alt="Avatar"
          className={"rounded-full"+(!isSender ? " mr-4":"")}
          width={45}
          height={45}
        />
      ) : null}

      <div className="d-flex flex-column">
        {at?.seconds ? (
          <span className={isSender?"text-right px-3":""} style={{fontSize :".5em"}}>{formatDate(new Date(at.seconds * 1000))}</span>
        ) : null}
        {displayName ? (
          <p>
            {displayName}:<span className="px-3"> {text} </span>
          </p>
        ) : <p>{text}</p>}
      </div>
    </div>
  );
};

export default Message;
