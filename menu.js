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

    const mark = document.createElement('div');
    mark.className = 'mark';
    const span = document.createElement('span');
    span.textContent = '!';
    span.className = 'exmark';
    mark.appendChild(span);
    record.appendChild(mark);

    let impEl = null;
    let subjectEl = null;

    for (const [prop, val] of Object.entries(item)) {
      if (prop === 'imp') {
        impEl = document.createElement('div');
        impEl.className = 'imp';
        impEl.textContent = val;
        continue;
      }

      if (prop === 'subject') {
        subjectEl = document.createElement('div');
        subjectEl.className = 'subject';
        subjectEl.textContent = val;

        const tri = document.createElement('div');
        tri.className = 'tri';
        record.appendChild(tri);
        continue;
      }

      const el = document.createElement('div');
      el.className = prop;
      el.innerHTML = prop === 'date' || prop === 'from' ? val : val;
      record.appendChild(el);
    }

    // impとsubjectを縦に並べる subject-block にまとめる
    if (impEl || subjectEl) {
      const subjectBlock = document.createElement('div');
      subjectBlock.className = 'subject-block';
      if (impEl) subjectBlock.appendChild(impEl);
      if (subjectEl) subjectBlock.appendChild(subjectEl);
      record.appendChild(subjectBlock);
    }

    info_list.appendChild(record);
  }
});
