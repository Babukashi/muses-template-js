'use strict';

document.addEventListener('DOMContentLoaded', async () => {
  const username = sessionStorage.username; //ログイン
  if (!username) {
    window.alert('ログインしてください'); //名前がないとアラートが出る
    location.href = 'login.html'; //login.htmlにページ遷移する
  } //4.23開始
  document.querySelector('#user_name span').textContent = username; //入力したユーザーネームが表示されるようになる

  const res = await fetch('data.json'); //data.jsonからデータを取得
  const obj = await res.json();
  const data = obj.list;
  console.log(data);

  document.querySelectorAll('span.unread').forEach((el) => (el.textContent = data.length)); //未読の件数を格納

  const info_list = document.querySelector('div#info_list');

  for (const item of data) {
    const record = document.createElement('div');
    record.className = 'record';
    for (const [prop, val] of Object.entries(item)) {
      const el = document.createElement('div');
      if (prop == 'from') {
        //連絡の出所
        el.innerHTML = val; //改行の<br>が文字列として出力されないようにするため
      } else {
        el.textContent = val; //from以外のkeyは文字列
      }
      el.className = prop;

      if (prop == 'subject') {
        //連絡の題名
        const tri = document.createElement('div');
        tri.textContent = '&nbsp;'; //改行を防ぐためのもの(赤丸と題名が横並びになってくれるように使われている)
        tri.className = 'tri';
        record.appendChild(tri);

        const mark = document.createElement('div');
        mark.className = 'mark';
        const span = document.createElement('span');
        span.textContent = '!';
        span.className = 'exmark'; //題名の前のビックリマーク
        mark.appendChild(span);
        record.appendChild(mark);
      }
      record.appendChild(el);
    }
    info_list.appendChild(record);
  } //Musesの連絡を表示
});
