# フォルダ構成
- test: firestore.rulesのテスト
- sample: サンプルコード

# クレデンシャルを読み込む(powershell)
$env:GOOGLE_APPLICATION_CREDENTIALS="~/Downloads/practice-da34f-firebase-adminsdk-ueykj-053ff9bed4.json"

# serve
firebase serve --only hosting

# functionsでstorageからファイルを落とす
https://github.com/firebase/functions-samples/blob/d3cbed16f2bcdf087fc7109e037c48459d30b425/quickstarts/thumbnails/functions/index.js#L19-L25