import axios from "axios";

const NotConnected = () => {
  const handleHelloWorldClick = async () => {
    try {
      await axios.get("http://localhost:3001");
      console.log("Success calling backend");
    } catch (error) {
      console.error("Error calling backend:", error);
    }
  };

  return (
    <div>
      <h1>You're not connected</h1>
      <button onClick={handleHelloWorldClick}>Say Hello to Backend</button>
    </div>
  );
};

export default NotConnected;
