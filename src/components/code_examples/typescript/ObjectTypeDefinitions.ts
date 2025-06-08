// typeエイリアスの例
// Userという名前の型を定義
type User = {
  id: number;
  name: string;
  email?: string; // '?' を付けるとオプショナル（あってもなくても良い）プロパティになる
  isAdmin: boolean;
  registerDate: Date;
};

const user1: User = {
  id: 1,
  name: "山田さん",
  isAdmin: false,
  registerDate: new Date("2023-01-15"),
};

// user1.email は undefined

const user2: User = {
  id: 2,
  name: "鈴木さん",
  email: "suzuki@example.com",
  isAdmin: true,
  registerDate: new Date("2023-02-20"),
};

// interfaceの例
// Articleという名前のインターフェースを定義
interface Article {
  title: string;
  content: string;
  readonly authorId: number; // readonly を付けると変更不可になる
  tags?: string[];
  publicationDate: Date;
}

const myArticle: Article = {
  title: "TypeScript入門",
  content: "TypeScriptは素晴らしい...",
  authorId: 101,
  tags: ["プログラミング", "TypeScript"],
  publicationDate: new Date(),
};

// myArticle.authorId = 102; // エラー！ readonlyプロパティは変更できない
