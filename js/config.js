/**
 * krauthair サイト共通の仮データ。
 * 確定情報が出たらこのファイルだけを書き換えれば全ページに反映される。
 */
window.KRAUTHAIR_CONFIG = {
  siteName: "krauthair",
  siteNameReading: "クラウトヘア",

  copy: {
    heroMain: "髪を整え、心をほどく。",
    heroSub: "あなただけの時間が流れる、群馬・高崎の小さな隠れ家サロン。",
  },

  contact: {
    // TODO: 確定後に差し替え
    instagramHandle: "@krauthair",
    instagramUrl: "https://www.instagram.com/krauthair/",
    instagramDmUrl: "https://www.instagram.com/direct/t/krauthair/",
    tel: "027-000-0000",
    telHref: "tel:0270000000",
  },

  hours: {
    open: "10:00",
    close: "17:00",
    note: "完全予約制",
    closedDays: "未定", // TODO: 確定後に差し替え
  },

  owner: {
    // 実際のプロフィールが決まったら enabled を true にして各項目を入力してください。
    // false のままだと、サイトには「準備中」の仮デザインが表示されます。
    enabled: false,
    name: "",      // 例: "店主　◯◯ ◯◯"
    message: "",   // ご本人の言葉によるメッセージ。段落を分けたい場合は空行（\n\n）で区切ってください
    photo: "",     // 例: "assets/images/owner/owner-01.jpg"
  },

  reservation: {
    // "open"  : 通常どおり予約ボタン（Instagram DM／電話）を表示
    // "paused": ボタンを隠し、pausedMessage の案内文だけを表示する
    status: "open",
    pausedMessage: "ただいま、ご予約の受付を一時的に停止しております。受付再開次第、Instagramにてお知らせいたします。",
  },

  access: {
    prefecture: "群馬県",
    city: "高崎市",
    addressNote: "詳しい住所は、ご予約確定後に個別にご案内いたします。", // TODO: 住所確定後に番地まで差し替え
    directionsNote: "最寄り駅・バス停からのアクセスは、住所確定後にご案内いたします。", // TODO: 確定後に差し替え（例: "〇〇駅から徒歩5分"）
    parkingNote: "駐車場の有無は、確定次第こちらでご案内いたします。", // TODO: 確定後に差し替え
    mapEmbedUrl: "", // TODO: 住所確定後に Google マップ埋め込みURL（src）を設定するとマップが自動表示される
  },

  menu: {
    hair: [
      { name: "カット", desc: "丁寧なカウンセリングから仕上げまで", price: "¥6,600〜", time: "60分〜" },
      { name: "カット＋カラー", desc: "髪と頭皮に配慮したカラーリング", price: "¥13,200〜", time: "120分〜", featured: true },
      { name: "カット＋パーマ", desc: "質感とスタイルに合わせたデザインパーマ", price: "¥15,400〜", time: "150分〜" },
      { name: "トリートメント", desc: "髪の内側から補修するケアメニュー", price: "¥4,400〜", time: "30分〜" },
    ],
    spa: [
      { name: "クレイヘッドスパ", desc: "自然由来のクレイで頭皮を整える", price: "¥7,700〜", time: "50分" },
      { name: "クレイスパ＋足湯", desc: "足湯とあわせて心身をゆるめる特別メニュー", price: "¥9,900〜", time: "70分", featured: true },
    ],
  },

  products: [
    { name: "オーセンティックオイル", desc: "自然な香りで髪をまとめるヘアオイル" },
    { name: "オーセンティックバター", desc: "髪と頭皮をやさしく保湿するヘアバター" },
    { name: "LOA", desc: "素材にこだわったヘアケアライン" },
    { name: "track", desc: "日々のケアに寄り添うアイテム" },
  ],
};
