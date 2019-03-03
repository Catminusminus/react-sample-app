# react-sample-app
「はじめてのフロントエンド開発」のサンプルアプリをReact Hooksにより書き直したもの
## Changes
- tslintではなくtypescript-eslintを使用
- class componentsは不使用
- Context API & useContextによりprops経由のバケツリレー回避
## 学び
### useEffect & async
awaitは現状トップレベルスコープで使うことができない。そこで
```
// Error!
useEffect(async () => {...})
```
とすることはできない。この場合は
```
useEffect(() => {
  (async () => {})()
})
```
とやるとできる。Suspenseを待たれよ。
## Workaround
### arrow function with generics
```
const usePrevious = (value: any) => ...
```
を
```
// Error!
const usePrevious = <T>(value: T) => ...
```
に書き換えた際、JSXの閉じタグと判定されてエラーがでるので
```
const usePrevious = <T extends {}>(value: T) => ...
```
とした。
### createContext & useContext & useState
ContextとしてuseStateの戻り値、特に
```
const [value, useValue] = useState(...)
```
のときのuseValueを渡したいが、createContext時の初期値をどうすればよいのか分からなかった。typescriptの場合型定義から
```
// no default value
const context = createContext()
```
とすることができず、何かを渡す必要がある。しかしuseValueと同じ型の適当な関数を持ってくるのが困難。そこでPartial型を使った。