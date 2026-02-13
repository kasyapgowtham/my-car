const Car = ({ x }) => {
  return (
    <div
      style={{
        width: "50px",
        height: "100px",
        backgroundColor: "red",
        position: "absolute",
        bottom: "40px",
        left: "50%",
        transform: `translateX(${x}px) translateX(-50%)`,
        borderRadius: "8px"
      }}
    />
  );
};

export default Car;
