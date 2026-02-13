import React, { useEffect, useState } from "react";
import useGameEngine from "./useGameEngine";
import Car from "./Car";
import EnemyCar from "./Enemycar";

const Game = () => {
  const { playerX, enemies,gameOver,score,resetGame  } = useGameEngine();
  //const[score,setscore]=useState(0);
  // useEffect(()=>{
  //   enemies.forEach(function(){
  //     setscore((prev)=>prev+1);
  //   })
  //   if(gameOver){
  //     setscore(0);
  //   }
  // },[enemies])
  return (
    <div
      style={{
        width: "400px",
        height: "600px",
        margin: "40px auto",
        perspective: "1000px",
        overflow: "hidden",
        background: "linear-gradient(to bottom, #4facfe, #87CEEB)"
      }}
    >
      {score}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          transform: "rotateX(60deg)",
          transformOrigin: "bottom",
          background: "#333"
        }}
      >
        {/*{score}*/}
        
        <Car x={playerX} />

        {enemies.map((enemy) => (
          <EnemyCar key={enemy.id} x={enemy.x} y={enemy.y} />
        ))}
{gameOver && (
  <button onClick={resetGame} style={{ position: "absolute", top: 20 }}>
    Restart
  </button>
)}


      </div>
    </div>
  );
};

export default Game;
