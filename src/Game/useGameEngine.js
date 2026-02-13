import { useEffect, useRef, useState, useCallback } from "react";

const GAME_WIDTH = 400;
const PLAYER_Y = 500;
const PLAYER_WIDTH = 50;
const PLAYER_HEIGHT = 100;
const ENEMY_WIDTH = 50;
const ENEMY_HEIGHT = 100;

const LANES = [-120, 0, 120];

const useGameEngine = () => {
  const requestRef = useRef(null);
  const gameOverRef = useRef(false);
  const keys = useRef({});
  const lastTimeRef = useRef(0);
  const playerXRef = useRef(0);

  const [playerX, setPlayerX] = useState(0);
  const [speed, setSpeed] = useState(4);
  const [enemies, setEnemies] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const[score,setScore]=useState(0);

  // Keyboard input
  useEffect(() => {
    const down = (e) => (keys.current[e.key] = true);
    const up = (e) => (keys.current[e.key] = false);

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);

    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  useEffect(() => {
    playerXRef.current = playerX;
  }, [playerX]);
  useEffect(() => {
  gameOverRef.current = gameOver;
}, [gameOver]);


  const checkCollision = (enemy) => {
    const playerLeft = GAME_WIDTH / 2 + playerXRef.current - PLAYER_WIDTH / 2;
    const playerRight = playerLeft + PLAYER_WIDTH;

    const enemyLeft = GAME_WIDTH / 2 + enemy.x - ENEMY_WIDTH / 2;
    const enemyRight = enemyLeft + ENEMY_WIDTH;

    const vertical =
      enemy.y + ENEMY_HEIGHT > PLAYER_Y &&
      enemy.y < PLAYER_Y + PLAYER_HEIGHT;

    const horizontal =
      playerLeft < enemyRight && playerRight > enemyLeft;

    return vertical && horizontal;
  };

  const gameLoop = useCallback((time) => {
    if (gameOverRef.current) return;


    const delta = time - lastTimeRef.current;
    lastTimeRef.current = time;

    // Player movement
    setPlayerX((prev) => {
      const move = delta * 0.4;
      if (keys.current["ArrowLeft"]) return Math.max(prev - move, -150);
      if (keys.current["ArrowRight"]) return Math.min(prev + move, 150);
      return prev;
    });

    // Enemy update
    setEnemies((prev) => {
      let updated = prev
        .map((e) => ({ ...e, y: e.y + speed * (delta / 16) }))
        .filter((e) => e.y < 700);

      if (updated.some(checkCollision)) {
        gameOverRef.current = true;
        setGameOver(true);
        cancelAnimationFrame(requestRef.current);
        setTimeout(()=>{
            setScore(0);
        },1000)
        cancelAnimationFrame(requestRef.current);
        return [];
      }

      if (Math.random() < 0.02) {
        updated.push({
          id: Date.now(),
          x: LANES[Math.floor(Math.random() * LANES.length)],
          y: -ENEMY_HEIGHT,
        });
      }

      return updated;
    });
    setScore((prev)=>prev+1);
    // if(gameOverRef.current){
        
    // }
    setSpeed((s) => s + delta * 0.00001);
    //setScore((prev)=>prev+1);
    requestRef.current = requestAnimationFrame(gameLoop);
  });

 const resetGame = () => {
  cancelAnimationFrame(requestRef.current);

  lastTimeRef.current = 0;
  setEnemies([]);
  setPlayerX(0);
  setSpeed(4);

  gameOverRef.current = false;
  setGameOver(false);

  requestRef.current = requestAnimationFrame(gameLoop);
};


  useEffect(() => {
    requestRef.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(requestRef.current);
  }, [gameLoop]);

  return { playerX, enemies, speed, gameOver, score, resetGame };
};

export default useGameEngine;
