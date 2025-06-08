// 文字列型 (string)
let userName: string = "あしたぼ太郎";
// userName = 123; // エラー！ 文字列型に数字は代入できない

// 数値型 (number)
let age: number = 20;
// age = "20歳"; // エラー！

// 真偽値型 (boolean)
let isActive: boolean = true;
// isActive = "yes"; // エラー！

// 配列型 (要素の型[])
let hobbies: string[] = ["読書", "映画鑑賞"];
let scores: Array<number> = [80, 95, 72]; // Array<要素の型> という書き方もできる

// オブジェクト型 (具体的な形は後述)
let userProfile: object = { name: "花子", age: 25 };

// any型 (どんな型でもOK、でも非推奨！)
let anything: any = "なんでも入る";
anything = 100;
anything = false; // エラーにならないが、型の恩恵を受けられない

// null と undefined
let noValue: null = null;
let notAssigned: undefined = undefined;
