# Conventional Commits 1.0.0

## 摘要

Conventional Commits 規範是一種基於提交訊息（commit messages）的輕量級約定。它提供了一組簡單的規則來建立明確的提交歷史；這使得在其之上編寫自動化工具變得更加容易。這個約定與 [SemVer](http://semver.org/) 相輔相成，通過在提交訊息中描述功能、修復和破壞性變更。

提交訊息的結構如下：

* * * * *

```
<類型>[可選的範圍]: <描述>

[可選的正文]

[可選的頁尾]
```

* * * * *

提交包含以下結構元素，以向您的函式庫使用者傳達意圖：

1. **fix:** *類型* 為 `fix` 的提交表示修復了程式碼庫中的一個 bug（這與語意化版本控制中的 [`PATCH`](http://semver.org/#summary) 相關）。
2. **feat:** *類型* 為 `feat` 的提交表示在程式碼庫中引入了一個新功能（這與語意化版本控制中的 [`MINOR`](http://semver.org/#summary) 相關）。
3. **BREAKING CHANGE:** 在頁尾具有 `BREAKING CHANGE:` 的提交，或者在類型/範圍後附加 `!` 的提交，表示引入了破壞性的 API 變更（與語意化版本控制中的 [`MAJOR`](http://semver.org/#summary) 相關）。BREAKING CHANGE 可以是任何 *類型* 提交的一部分。
4. 允許使用 `fix:` 和 `feat:` 以外的 *類型*，例如 [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional)（基於 [Angular 約定](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines)）推薦使用 `build:`、`chore:`、`ci:`、`docs:`、`style:`、`refactor:`、`perf:`、`test:` 等。
5. *頁尾* 除了 `BREAKING CHANGE: <description>` 之外，還可以提供其他資訊，並遵循類似 [git trailer 格式](https://git-scm.com/docs/git-interpret-trailers) 的約定。

Conventional Commits 規範不強制要求其他類型，並且在語意化版本控制中沒有隱式影響（除非它們包含 BREAKING CHANGE）。可以為提交的類型提供一個範圍（scope），以提供額外的上下文資訊，範圍包含在括號內，例如 `feat(parser): add ability to parse arrays`。

## 範例

### 包含描述和破壞性變更頁尾的提交訊息

```
feat: allow provided config object to extend other configs

BREAKING CHANGE: `extends` key in config file is now used for extending other config files
```

### 包含 `!` 以引起對破壞性變更注意的提交訊息

```
feat!: send an email to the customer when a product is shipped
```

### 包含範圍和 `!` 以引起對破壞性變更注意的提交訊息

```
feat(api)!: send an email to the customer when a product is shipped
```

### 同時包含 `!` 和 BREAKING CHANGE 頁尾的提交訊息

```
chore!: drop support for Node 6

BREAKING CHANGE: use JavaScript features not available in Node 6.
```

### 沒有正文的提交訊息

```
docs: correct spelling of CHANGELOG
```

### 包含範圍的提交訊息

```
feat(lang): add Polish language
```

### 包含多段落正文和多個頁尾的提交訊息

```
fix: prevent racing of requests

Introduce a request id and a reference to latest request. Dismiss
incoming responses other than from latest request.

Remove timeouts which were used to mitigate the racing issue but are
obsolete now.

Reviewed-by: Z
Refs: #123
```

## 規範

本文檔中的關鍵詞 "MUST"、"MUST NOT"、"REQUIRED"、"SHALL"、"SHALL NOT"、"SHOULD"、"SHOULD NOT"、"RECOMMENDED"、"MAY" 和 "OPTIONAL" 應按照 [RFC 2119](https://www.ietf.org/rfc/rfc2119.txt) 中的描述進行解釋。

1. 提交必須以類型為前綴，類型由名詞 `feat`、`fix` 等組成，後跟可選的範圍、可選的 `!` 以及必要的冒號和空格。
2. 當提交為您的應用程式或函式庫添加新功能時，必須使用類型 `feat`。
3. 當提交代表您的應用程式的錯誤修復時，必須使用類型 `fix`。
4. 類型後可以提供一個範圍。範圍必須由描述程式碼庫部分的各詞組成，並用括號括起來，例如 `fix(parser):`。
5. 描述必須緊跟在類型/範圍前綴後的冒號和空格之後。描述是對程式碼變更的簡短總結，例如 *fix: array parsing issue when multiple spaces were contained in string*。
6. 簡短描述之後可以提供較長的提交正文，以提供有關程式碼變更的額外上下文資訊。正文必須在描述之後空一行開始。
7. 提交正文是自由格式的，可以由任意數量的以換行符分隔的段落組成。
8. 正文之後空一行可以提供一個或多個頁尾。每個頁尾必須由一個單詞標記組成，後跟 `:<空格>` 或 `<空格>#` 分隔符，再後跟字串值（這受到 [git trailer 約定](https://git-scm.com/docs/git-interpret-trailers) 的啟發）。
9. 頁尾的標記必須使用 `-` 來代替空白字符，例如 `Acked-by`（這有助於區分頁尾部分和多段落正文）。`BREAKING CHANGE` 是一個例外，它也可以用作標記。
10. 頁尾的值可以包含空格和換行符，並且在觀察到下一個有效的頁尾標記/分隔符對時必須終止解析。
11. 破壞性變更必須在提交的類型/範圍前綴中指出，或者作為頁尾中的條目指出。
12. 如果作為頁尾包含，破壞性變更必須由大寫文本 BREAKING CHANGE 組成，後跟冒號、空格和描述，例如 *BREAKING CHANGE: environment variables now take precedence over config files*。
13. 如果包含在類型/範圍前綴中，破壞性變更必須通過緊接在 `:` 之前的 `!` 來指示。如果使用了 `!`，則可以從頁尾部分省略 `BREAKING CHANGE:`，並且應使用提交描述來描述破壞性變更。
14. 在您的提交訊息中可以使用 `feat` 和 `fix` 以外的類型，例如 *docs: update ref docs.*。
15. 構成 Conventional Commits 的資訊單元在實作時不得區分大小寫，但 BREAKING CHANGE 必須為大寫。
16. 當用作頁尾中的標記時，BREAKING-CHANGE 必須與 BREAKING CHANGE 同義。
17. 描述必須使用繁體中文 (zh-tw) 撰寫。
