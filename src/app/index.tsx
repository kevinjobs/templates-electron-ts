import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {Routes, Route, Link} from "react-router-dom";
import {
  decrement,
  increment,
  incrementByAmount,
  incrementByAmountAsync,
  selectCount,
} from "@store/slices/couter.slice";
import store, { AppDispatch } from "@store/index";
import {fetchUserInfo} from "@api/user";
import HomePage from "@pages/home";
import NotFound from "@pages/not-found";

function AppSon() {
  const count = useSelector(selectCount);
  return <div>{count}</div>;
}

function App() {
  const dispatch = useDispatch<AppDispatch>();

  const [isVisible, setIsVisible] = React.useState(false);
  const [apiData, setApiData] = React.useState(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsVisible(!isVisible);
  };

  return (
    <div className="my-app" style={{ textAlign: "center" }}>
      <h2>hello, world!</h2>
      <div>
        <button onClick={handleClick}>
          {isVisible ? "hidden" : "show"} banner
        </button>
      </div>
      <div id="banner" style={{ visibility: isVisible ? "visible" : "hidden" }}>
        <p>这个条幅可以在修改时保持状态，你可以尝试修改</p>
      </div>
      <p>测试 react-redux 的功能</p>
      <button onClick={() => dispatch(increment())}>+1</button>
      <button onClick={() => dispatch(decrement())}>-1</button>
      <button onClick={() => dispatch(incrementByAmount(10))}>+10</button>
      <button onClick={() => store.dispatch(incrementByAmountAsync(20))}>
        +20 Async (1000ms later)
      </button>
      <div>
        <AppSon />
      </div>
      <div>
        <button onClick={() => {
          fetchUserInfo().then((res: { code: number; msg: string }) => setApiData(res));
        }}>api: get</button>
        <span>code: { apiData?.code }, msg: { apiData?.msg }</span>
      </div>
      <div>
        <h3>Routes</h3>
        <Link to={"/home"}>Home</Link>
        <Link to={"/blog"}>Blog</Link>
        <Link to={"/about"}>About</Link>
        <Routes>
          <Route element={<HomePage />} path={"/home"} />
          <Route element={<NotFound />} path={"*"} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
