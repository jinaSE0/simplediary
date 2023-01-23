import React, { useCallback, useEffect, useRef, useState } from "react";

const DiaryEditor = ({ onCreate }) => {
  //현재 문제점 : 삭제하기를 눌러도 다이어리 에디터가 렌더됨(앱컴포넌트가생성될때 onCreate가 두 번 생성)
  // 언제 렌더링되는지 파악하기위해 useEffect사용
  // useEffect(() => {
  //   console.log("다이어리에디터렌더");
  // });
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
      //alert를 띄우는 것보다 ux적으로 더 나음
      return; //리턴을 시켜줘서 더이상의 진행이 되지않도록 써줌
    }

    if (state.content.length < 1) {
      contentInput.current.focus();
      return;
    }

    onCreate(state.author, state.content, state.emotion);
    alert("저장성공");
    setState({
      author: "",
      content: "",
      emotion: 1,
    });
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
export default React.memo(DiaryEditor);
