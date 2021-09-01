import styled from "styled-components";

const map = new Map();
const Tomato = styled.li`
  background-color: rgba(227, 26, 0, 1);
`;
// map["tomato"] = <li>TEST </li>;
// const Circle = styled.div`
//   width: 5rem;
//   height: 5rem;
//   background: ${(props) => props.color || "black"};
//   border-radius: 50%;
// `;

export const IngredientList = (ingredienName) => {
  return <Tomato>TEST</Tomato>;
  //   return <{ingredienName} />
  //   return map[ingredienName];
};
//background-color: white;

/*
방법 생각해보기
버튼 클릭 -> () => 색상 지정 (DB에도 저장) => 색상 표시

에서, 버튼 클릭에 따라 어떻게 색상을 지정할 것인지 고민해보기.
*/
