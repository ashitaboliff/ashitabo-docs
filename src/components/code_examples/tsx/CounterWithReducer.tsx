'use client';
import { useReducer } from 'react';

// Stateの型
type CounterState = {
  count: number;
};

// Actionの型 (ユニオン型で複数のアクションを表現)
type CounterAction =
  | { type: 'increment'; payload?: number }
  | { type: 'decrement'; payload?: number }
  | { type: 'reset' };

// 初期状態
const initialState: CounterState = { count: 0 };

// Reducer関数: 現在のStateとActionを受け取り、新しいStateを返す
function reducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case 'increment':
      return { count: state.count + (action.payload || 1) };
    case 'decrement':
      return { count: state.count - (action.payload || 1) };
    case 'reset':
      return initialState;
    default:
      // TypeScriptがexhaustive checkを促すため、ここではnever型を返すか、エラーを投げる
      // または、actionが取りうる全ての型をcaseで網羅していることを確認する
      const exhaustiveCheck: never = action;
      throw new Error(`Unknown action: ${exhaustiveCheck}`);
  }
}

function CounterWithReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>カウント: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+1</button>
      <button onClick={() => dispatch({ type: 'increment', payload: 5 })}>+5</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-1</button>
      <button onClick={() => dispatch({ type: 'reset' })}>リセット</button>
    </div>
  );
}
export default CounterWithReducer;
