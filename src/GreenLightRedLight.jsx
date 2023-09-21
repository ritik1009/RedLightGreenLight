import { useState, useEffect } from "react";

const GreenLightRedLight = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [boxColor, setBoxColor] = useState("red");
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timer, setTimer] = useState(0);
  const [scoreboard,setScoreboard] = useState([]);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    difficulty: "easy",
  });
  let n; // Number of clicks required to win
  if (userData.difficulty === "easy") {
    n = 10;
  } else if (userData.difficulty === "medium") {
    n = 15;
  } else {
    n = 25;
  }
  const y = 40; // Time limit in seconds
  //   const colorChangeInterval = 500; // Change color every 0.5 seconds
  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  useEffect(() => {
    let interval;

    if (gameStarted && !gameOver) {
      const rndInt = randomIntFromInterval(1000,2000)
      interval = setInterval(changeBoxColor, rndInt);
    } else if (gameOver) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [gameStarted, gameOver]);

  useEffect(() => {
    if (timer > y * 1000) {
      endGame(false);
    }
  }, [timer, y]);

  const changeBoxColor = () => {
    if (boxColor === "red") {
      setBoxColor("green");
    } else {
      setBoxColor("red");
    }
  };

  const handleBoxClick = () => {
    if (boxColor === "green" && !gameOver) {
      setScore(score + 1);
      if (score + 1 === n) {
        endGame(true);
      }
      changeBoxColor();
    } else if (boxColor === "red" && !gameOver) {
      endGame(false);
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setGameOver(false);
    setTimer(0);
  };

  const endGame = (win) => {
    setGameStarted(false);
    setGameOver(true);
    if (win) {
      setScoreboard([
        ...scoreboard,
        {
          name: userData.name,
          level: userData.difficulty,
          completedat: (timer/1000).toFixed(1),
        },
      ]);
      alert("You win!");
      console.log(scoreboard)
    } else {
      alert("Game Over!");
    }
  };

  useEffect(() => {
    if (gameStarted) {
      const interval = setInterval(() => {
        setTimer(timer + 1000);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [gameStarted, timer]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    startGame();
  };

  const boxStyles = {
    width: "200px",
    height: "200px",
    backgroundColor: boxColor,
    margin: "20px auto",
    cursor: "pointer",
  };

  const buttonStyles = {
    backgroundColor: "blue",
    color: "white",
    border: "none",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
  };

  return (
    <div
      style={{
        textAlign: "center",
        backgroundImage: "/bg.jpg",
      }}
      className="flex flex-col bg-[url('BG.jpg')] min-h-screen bg-center bg-no-repeat bg-cover py-6"
    >
      {gameStarted ? (
        <div className="flex flex-col gap-5 backdrop-blur-sm w-[85%] sm:w-[60%] mx-auto bg-[#ffffff70] shadow-md mt-8 py-6 rounded-xl">
          <h1 className=" text-xl md:text-4xl font-bold text-gray-800 px-1">
            Green Light, Red Light
          </h1>
          <div style={boxStyles} onClick={handleBoxClick}></div>
          <p className="text-xl font-semibold">
            Time left: {((y * 1000 - timer) / 1000).toFixed(1)}s
          </p>
          <p className="text-xl font-semibold">Score: {score}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-5 backdrop-blur-sm w-[85%] md:w-[60%] mx-auto bg-[#ffffff70] shadow-md mt-8 pt-4 rounded-xl">
          <h1 className=" text-2xl md:text-4xl font-bold text-gray-800">
            User Registration
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 mx-auto  w-[90%] sm:w-[85%] py-3 sm:py-10"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center  sm:justify-between gap-1 sm:gap-5">
              <label className="text-base sm:text-base md:text-xl font-semibold">
                Name:
              </label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                required
                className="w-[100%] sm:w-[70%] bg-slate-100 text-base sm:text-base md:text-xl p-1 px-1 sm:px-2"
              />
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center  sm:justify-between gap-1 sm:gap-5">
              <label className="text-base sm:text-base md:text-xl font-semibold">
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                required
                className="w-[100%] sm:w-[70%] bg-slate-100 text-base sm:text-base md:text-xl p-1 px-1 sm:px-2"
              />
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center  sm:justify-between gap-1 sm:gap-5">
              <label className="text-base sm:text-base md:text-xl font-semibold">
                Phone:
              </label>
              <input
                type="tel"
                name="mobileNumber"
                value={userData.mobileNumber}
                onChange={handleInputChange}
                required
                className="w-[100%] sm:w-[70%] bg-slate-100 text-base sm:text-base md:text-xl p-1 px-1 sm:px-2"
              />
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center  sm:justify-between gap-1 sm:gap-5">
              <label className="text-base sm:text-base md:text-xl font-semibold">
                Difficulty Level:
              </label>
              <select
                name="difficulty"
                value={userData.difficulty}
                onChange={handleInputChange}
                className="w-[100%] sm:w-[70%] bg-slate-100 text-base sm:text-base md:text-xl p-1 px-1 sm:px-2"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <button style={buttonStyles} type="submit">
              Start Game
            </button>
          </form>
          <div className=" flex flex-col gap-5 mx-auto  w-[90%] sm:w-[85%] py-5 sm:py-10">
            <p className="text-2xl md:text-4xl font-bold text-gray-800">
              ScoreBoard
            </p>
            <table className=" border border-black text-base sm:text-base md:text-xl">
              <tr className="border border-black">
                <th>Name</th>
                <th>Level</th>
                <th>Completed At</th>
              </tr>
              {scoreboard.map((score, idx) => {
                return (
                  <tr key={idx} className="border border-black ">
                    <td>{score.name}</td>
                    <td>{score.level}</td>
                    <td>{score.completedat}</td>
                  </tr>
                );
              })}
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default GreenLightRedLight;
