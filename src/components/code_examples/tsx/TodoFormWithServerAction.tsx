// src/components/TodoForm.tsx
'use client';
// import { createTodo } from '@/app/actions'; // 実際のプロジェクトではパスを調整
import { experimental_useFormState as useFormState, experimental_useFormStatus as useFormStatus } from 'react-dom';

// ダミーのcreateTodo関数 (型チェックとコード補完のため)
async function createTodo(prevState: any, formData: FormData): Promise<{ error?: string | null, success?: boolean }> {
  console.log('Dummy createTodo called with formData:', formData.get('title'));
  const title = formData.get('title') as string;
  if (!title) {
    return { error: 'タイトルは必須です。' };
  }
  // 実際にはサーバーアクションを呼び出す
  // await new Promise(resolve => setTimeout(resolve, 500)); // 擬似的な遅延
  // return { success: true };
  return { error: 'これはダミーの実装です' };
}


const initialState = { error: null, success: false };

function SubmitButton() {
  const { pending } = useFormStatus();
  return <button type="submit" disabled={pending} className="btn btn-primary mt-2">{pending ? '送信中...' : '追加'}</button>;
}

export function TodoForm() {
  const [state, formAction] = useFormState(createTodo, initialState);

  return (
    <form action={formAction}>
      <input type="text" name="title" required className="input input-bordered w-full max-w-xs" />
      <SubmitButton />
      {state?.error && <p className="text-red-500 mt-2">{state.error}</p>}
      {state?.success && <p className="text-green-500 mt-2">Todoを追加しました！</p>}
    </form>
  );
}

// export default TodoForm; // CodePreviewTabsで表示する際は通常デフォルトエクスポートは不要
