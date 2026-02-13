const EnemyCar = ({ x, y }) => {
  return (
    <div
      style={{
        width: "50px",
        height: "100px",
        backgroundColor: "yellow",
        position: "absolute",
        top: `${y}px`,
        left: "50%",
        transform: `translateX(${x}px) translateX(-50%)`,
        borderRadius: "8px"
      }}
    />
  );
};

export default EnemyCar;
