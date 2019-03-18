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
### componentWillUnmount & componentDidUpdate & componentDidMountの代替
https://stackoverflow.com/questions/53464595/how-to-use-componentwillmount-in-react-hooks/53465182
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
