import { useMemo, useRef, useState, useEffect, useCallback } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

function App() {
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    const initData = res.slice(0, 19).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 3) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++,
      };
    });

    setData(initData);
  };

  useEffect(() => {
    getData();
  }, []);

  //useMemo를 쓰면 안되는 이유 ; 값을 반환하기 때문,
  //onCreate라는 함수 자체를 보내야하므로 useCallback사용
  //메모이제이션된 콜백함수를 반환해줌
  const onCreate = useCallback((author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    setData((data) => [newItem, ...data]);
    //함수형업데이트
  }, []);

  const onRemove = useCallback((targetId) => {
    setData((data) => data.filter((it) => it.id !== targetId));
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    setData((data) =>
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  }, []);

  //함수가 어떤 결과값을 리턴하고 그 연산과정을 최적화하고 싶을때 useMemo를 사용함
  //이 경우에는 처음 렌더링 될때와 데이터를 불러올때 연산이 두 번되기때문에 useMemo사용
  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((it) => it.emotion >= 2).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / badCount) * 100;
    return { goodCount, badCount, goodRatio };
  }, [data.length]);
  //useMemo의 리턴값은 함수가아니라 결과값이기때문에 getDiaryAnalysis처럼 함수로 호출 안함
  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <div>전체일기 : {data.length}</div>
      <div>기분 좋은 일기 : {goodCount}</div>
      <div>기분 나쁜 일기 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}</div>
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
    </div>
  );
}

export default App;
