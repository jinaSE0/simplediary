import DiaryItem from "./DiaryItem";

const DiaryList = ({ diaryList }) => {
  console.log(diaryList);
  return (
    <div className="DiaryList">
      <h2>일기리스트</h2>
      <h4>{diaryList.length}개의 일기가 있습니다.</h4>
      <div>
        {diaryList.map((it) => (
          //map의 두번째 인자로 ,idx를 줘서 keyprop으로 사용해도 되지만
          // 수정과정에서 꼬일 수 있으니 데이터 자체에 고유한 값을 넣어주자!
          <DiaryItem key={it.id} {...it} />
        ))}
      </div>
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};
//defaultprops: undefined로 보내질 수도 있는 프롭스들의 기본값을 설정해서 오류를 방지함

export default DiaryList;
