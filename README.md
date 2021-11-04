zipcode-jp
==

日本語 / [English](./README_en.md)

日本国内の郵便番号から住所情報を取得します。

## Description

`lookup`関数は住所情報を配列で返却します。  
住所情報が見つからない場合または引数が3文字未満の場合、空配列を返却します。

大口事業所の住所情報は`lookupJigyosyo`関数を利用してください。

また、全国一括データと大口事業所の両方から住所情報を取得するには`lookupAll`関数を利用してください。

引数が7文字未満の場合、前方一致検索をおこないます。

### Data

データソースは[日本郵便の全国一括データ](https://www.post.japanpost.jp/zipcode/dl/readme.html)です。

version 0.2以降では[大口事業所](https://www.post.japanpost.jp/zipcode/dl/jigyosyo/index-zip.html)に対応しました。

### API

#### lookup(zipcode)

- `zipcode` String
- Returns: Array

配列の各要素は以下のキーバリューを持ちます。

| key | value |
| ---- | ---- |
| jis | 全国地方公共団体コード（JIS X0401、X0402）　………　半角数字 |
| oldZipCode | （旧）郵便番号（5桁）　………　半角数字 |
| zipCode | 郵便番号（7桁）　………　半角数字 |
| prefKana | 都道府県名　………　半角カタカナ |
| cityKana | 市区町村名　………　半角カタカナ |
| townKana | 市区町村名　………　半角カタカナ |
| pref | 都道府県名　………　漢字 |
| city | 市区町村名　………　漢字 |
| town | 町域名　………　漢字 |
| multiZipCode | 一町域が二以上の郵便番号で表される場合の表示（「1」は該当、「0」は該当せず） |
| koaza | 小字毎に番地が起番されている町域の表示（「1」は該当、「0」は該当せず） |
| block | 丁目を有する町域の場合の表示　（「1」は該当、「0」は該当せず） |
| multiTown | 一つの郵便番号で二以上の町域を表す場合の表示（「1」は該当、「0」は該当せず） |
| update | 更新の表示（「0」は変更なし、「1」は変更あり、「2」廃止（廃止データのみ使用）） |
| reason | 変更理由　（「0」は変更なし、「1」市政・区政・町政・分区・政令指定都市施行、「2」住居表示の実施、「3」区画整理、「4」郵便区調整等、「5」訂正、「6」廃止（廃止データのみ使用）） |

#### lookupJigyosyo(zipcode)

- `zipcode` String
- Returns: Array

配列の各要素は以下のキーバリューを持ちます。

| key | value |
| ---- | ---- |
| jis | 大口事業所の所在地のJISコード　………　半角数字 |
| jigyosyoKana | 大口事業所名　………　半角カタカナ |
| jigyosyo | 大口事業所名　………　漢字 |
| pref | 都道府県名　………　漢字 |
| city | 市区町村名　………　漢字 |
| town | 町域名　………　漢字 |
| unit | 小字名、丁目、番地等 |
| zipCode | 大口事業所個別番号（7桁）………　半角数字 |
| oldZipCode | 旧郵便番号（5桁）………　半角数字 |
| office | 取扱局　………　漢字 |
| codeType | 個別番号の種別の表示（「0」大口事業所、「1」私書箱） |
| multiCode | 複数番号の有無（「0」複数番号無し、「1」複数番号を設定している場合の個別番号の1、「2」複数番号を設定している場合の個別番号の2、「3」複数番号を設定している場合の個別番号の3。一つの事業所が同一種別の個別番号を複数持つ場合に複数番号を設定しているものとします。） |
| reviseCode | 修正コード（「0」修正なし、「1」新規追加、「5」廃止） |

#### lookupAll(zipcode)

- `zipcode` String
- Returns: Array

配列の各要素は以下のキーバリューを持ちます。

| key | value |
| ---- | ---- |
| type | 住所情報の取得元（`ken_all`は[日本郵便の全国一括データ](https://www.post.japanpost.jp/zipcode/dl/readme.html)、`jigyosyo`は[大口事業所](https://www.post.japanpost.jp/zipcode/dl/jigyosyo/index-zip.html)）
| jis | 全国地方公共団体コード（JIS X0401、X0402）または大口事業所の所在地のJISコード　………　半角数字 |
| oldZipCode | （旧）郵便番号（5桁）　………　半角数字 |
| zipCode | 郵便番号または大口事業所個別番号（7桁）………　半角数字 |
| prefKana | 都道府県名　………　半角カタカナ（大口事業所の場合、空文字列） |
| cityKana | 市区町村名　………　半角カタカナ（大口事業所の場合、空文字列） |
| townKana | 市区町村名　………　半角カタカナ（大口事業所の場合、空文字列） |
| pref | 都道府県名　………　漢字 |
| city | 市区町村名　………　漢字 |
| town | 町域名　………　漢字 |
| unit | 小字名、丁目、番地等（全国一括データの場合、空文字列） |
| jigyosyoKana | 大口事業所名　………　半角カタカナ（全国一括データの場合、空文字列） |
| jigyosyo | 大口事業所名　………　漢字（全国一括データの場合、空文字列） |
| office | 取扱局　………　漢字（全国一括データの場合、空文字列） |
| multiZipCode | 一町域が二以上の郵便番号で表される場合の表示（「1」は該当、「0」は該当せず）（大口事業所の場合、空文字列） |
| koaza | 小字毎に番地が起番されている町域の表示（「1」は該当、「0」は該当せず）（大口事業所の場合、空文字列） |
| block | 丁目を有する町域の場合の表示　（「1」は該当、「0」は該当せず） |
| multiTown | 一つの郵便番号で二以上の町域を表す場合の表示（「1」は該当、「0」は該当せず）（大口事業所の場合、空文字列） |
| update | 更新の表示（「0」は変更なし、「1」は変更あり、「2」廃止（廃止データのみ使用））（大口事業所の場合、空文字列） |
| reason | 変更理由　（「0」は変更なし、「1」市政・区政・町政・分区・政令指定都市施行、「2」住居表示の実施、「3」区画整理、「4」郵便区調整等、「5」訂正、「6」廃止（廃止データのみ使用））（大口事業所の場合、空文字列） |
| codeType | 個別番号の種別の表示（「0」大口事業所、「1」私書箱）（全国一括データの場合、空文字列） |
| multiCode | 複数番号の有無（「0」複数番号無し、「1」複数番号を設定している場合の個別番号の1、「2」複数番号を設定している場合の個別番号の2、「3」複数番号を設定している場合の個別番号の3。一つの事業所が同一種別の個別番号を複数持つ場合に複数番号を設定しているものとします。）（全国一括データの場合、空文字列） |
| reviseCode | 修正コード（「0」修正なし、「1」新規追加、「5」廃止）（全国一括データの場合、空文字列） |

## Usage

v0.3以降ではCommonJSだけでなく、ES Modulesに対応しました。

### CommonJS

```js
const zipcode = require('@s1r-j/zipcode-jp');

zipcode.lookup('1000001');
// [
//   {
//     jis: '13101',
//     oldZipCode: '100  ',
//     zipCode: '1000001',
//     prefKana: 'ﾄｳｷｮｳﾄ',
//     cityKana: 'ﾁﾖﾀﾞｸ',
//     townKana: 'ﾁﾖﾀﾞ',
//     pref: '東京都',
//     city: '千代田区',
//     town: '千代田',
//     multiZipCode: '0',
//     koaza: '0',
//     block: '0',
//     multiTown: '0',
//     update: '0',
//     reason: '0'
//   }
// ]
```

### ES Modules

```js
import zipcode from '@s1r-j/zipcode-jp';

zipcode.lookup('1000001');
// [
//   {
//     jis: '13101',
//     oldZipCode: '100  ',
//     zipCode: '1000001',
//     prefKana: 'ﾄｳｷｮｳﾄ',
//     cityKana: 'ﾁﾖﾀﾞｸ',
//     townKana: 'ﾁﾖﾀﾞ',
//     pref: '東京都',
//     city: '千代田区',
//     town: '千代田',
//     multiZipCode: '0',
//     koaza: '0',
//     block: '0',
//     multiTown: '0',
//     update: '0',
//     reason: '0'
//   }
// ]
```

## Install

[npm](https://www.npmjs.com/package/@s1r-j/zipcode-jp)

[![npm version](https://badge.fury.io/js/%40s1r-j%2Fzipcode-jp.svg)](https://badge.fury.io/js/%40s1r-j%2Fzipcode-jp)

## Licence

[MIT](https://opensource.org/licenses/mit-license.php)  

## Author

[s1r-J](https://github.com/s1r-J)
