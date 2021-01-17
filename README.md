zipcode-jp
==

日本語 / [English](./README_en.md)

日本国内の郵便番号から住所情報を取得します。

## Description

`lookup`関数は住所情報を配列で返却します。  
住所情報が見つからない場合または引数が3文字未満の場合、空配列を返却します。

引数が7文字未満の場合、前方一致検索をおこないます。

### Data

データソースは[日本郵便](https://www.post.japanpost.jp/zipcode/dl/readme.html)です。

現在、このモジュールは[大口事業所](https://www.post.japanpost.jp/zipcode/dl/jigyosyo/index-zip.html)には対応していません。

### properties

| key | value |
| ---- | ---- |
| jis | 全国地方公共団体コード（JIS X0401、X0402）………　半角数字 |
| oldZipCode | （旧）郵便番号（5桁）………………………………………　半角数字 |
| zipCode | 郵便番号（7桁）………………………………………　半角数字 |
| prefKana | 都道府県名　…………　半角カタカナ |
| cityKana | 市区町村名　…………　半角カタカナ |
| townKana | 市区町村名　…………　半角カタカナ |
| pref | 都道府県名　…………　漢字 |
| city | 市区町村名　…………　漢字 |
| town | 町域名　………………　漢字 |
| multiZipCode | 一町域が二以上の郵便番号で表される場合の表示（「1」は該当、「0」は該当せず） |
| koaza | 小字毎に番地が起番されている町域の表示（「1」は該当、「0」は該当せず） |
| block | 丁目を有する町域の場合の表示　（「1」は該当、「0」は該当せず） |
| multiTown | 一つの郵便番号で二以上の町域を表す場合の表示（「1」は該当、「0」は該当せず） |
| update | 更新の表示（「0」は変更なし、「1」は変更あり、「2」廃止（廃止データのみ使用）） |
| reason | 変更理由　（「0」は変更なし、「1」市政・区政・町政・分区・政令指定都市施行、「2」住居表示の実施、「3」区画整理、「4」郵便区調整等、「5」訂正、「6」廃止（廃止データのみ使用）） |

## Usage

```js
const zipcode = require('zipcode-jp');

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
