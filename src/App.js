import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

const dummyList = [
  {
    id: 1,
    author: "이정환",
    content: "아아아",
    emotion: 2,
    created_date: new Date().getTime(),
  },
  {
    id: 2,
    author: "이",
    content: "아아f아",
    emotion: 2,
    created_date: new Date().getTime(),
  },
  {
    id: 3,
    author: "이정",
    content: "아d아아",
    emotion: 3,
    created_date: new Date().getTime(),
  },
  {
    id: 4,
    author: "환",
    content: "아아f아",
    emotion: 2,
    created_date: new Date().getTime(),
  },
  {
    id: 5,
    author: "정환",
    content: "d아아아",
    emotion: 1,
    created_date: new Date().getTime(),
  },
];

function App() {
  return (
    <div className="App">
      <DiaryEditor />
      <DiaryList diaryList={dummyList} />
    </div>
  );
}

export default App;
