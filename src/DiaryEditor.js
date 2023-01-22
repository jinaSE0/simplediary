import { useRef, useState } from "react";

const DiaryEditor = () => {
  const authorInput = useRef();
  const contentInput = useRef();
  const [state, setState] = useState({
    author: "",
    content: "",
    emotion: 1,
  });
  //state에서 관리할 수 있는 값이 여러개일때 한 번에 처리할 수 있음

  //이벤트핸들러로 상태변화도 한꺼번에 처리할 수 있음 *는 한꺼번에 처리하지 않는 경우
  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    if (state.author.length < 1) {
      authorInput.current.focus();
      return; //리턴을 시켜줘서 더이상의 진행이 되지않도록 써줌
    }

    if (state.content.length < 1) {
      contentInput.current.focus();
      return;
    }

    alert("저장성공");
  };
  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input
          ref={authorInput}
          name="author"
          value={state.author}
          onChange={handleChangeState}
          //*
          //   onChange={(e) => {
          //     setState({ author: e.target.value, content: state.content });
          //   }}
        />
      </div>
      <div>
        <textarea
          ref={contentInput}
          name="content"
          value={state.content}
          onChange={handleChangeState}
          //*
          //관리할 것이  많으면 이렇게 전개연산자를 사용하면 더 좋겠지, spread연산자는 순서 주의해서 써야함 덮어씌워지지않게
          // onChange={(e) => {
          //     setState({ ...state, content: e.target.value });
          //}}
        />
      </div>
      <div>
        <select
          name="emotion"
          value={state.emotion}
          onChange={handleChangeState}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>저장하기</button>
      </div>
    </div>
  );
};
export default DiaryEditor;
