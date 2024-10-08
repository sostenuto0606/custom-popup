var popupimg = '';
var imgWidth = 0;
var imgHeight = 0;
window.onload = function () {
  // PC用
  window.addEventListener("mouseout", function(e) {
    if (!e.toElement && !e.relatedTarget && e.clientY < 10) {
      // オブジェクト外になったらポップアップ表示
      fnc_popup_control();
    }
  });
  // モバイル用
  // 初回読み込み時に履歴にエントリを追加
  history.pushState(null, null, location.href);
  // popstate イベントリスナーの設定
  window.addEventListener('popstate', function(e) {
    // ポップアップ表示
    fnc_popup_control();
  });
  // ポップアップ表示画像読込
  popupimg = document.getElementsByName("popupimg")[0].value;
  // 画像オブジェクトを作成してサイズを取得
  const readimg = new Image();
  readimg.src = popupimg;
  // 画像がロードされたら、サイズを取得しポップアップを表示
  readimg.onload = function() {
    imgWidth = readimg.width;
    imgHeight = readimg.height;
  };
};

// ポップアップ制御
function fnc_popup_control() {
  if (sessionStorage.getItem('gorgpop') === null) {
    // ポップアップ表示履歴無しの場合
    // 遷移先URL
    const targeturl = document.getElementsByName("targeturl")[0].value;
    Swal.fire({
      html: `<a class="full-screen-image" href=${targeturl} target="_blank">
               <img class="imgpop" src=${popupimg}>
             </a>`,
      position : 'center',      //表示位置
      showCloseButton: true,    //閉じるボタン表示
      showConfirmButton: false, //OKボタン非表示
      allowOutsideClick: false, //枠外クリックで閉じない
      allowEscapeKey: false,    //Escで閉じない
      width: imgWidth,          //横幅
      customClass: {
        popup: 'custom-popup-class',             // ポップアップのカスタムクラスを追加
        closeButton: 'custom-close-button-class' // 閉じるボタンのカスタムクラスを追加
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.close) {
        // 閉じるボタンが押された場合の処理
        // 閲覧済ストレージ保存
        sessionStorage.setItem('gorgpop', '1');
        // 履歴エントリをクリア
        history.pushState(null, null, null);
      }
    });
  }
  // 画像がクリックされたときにポップアップを閉じる
  const clickimg = document.querySelector('.full-screen-image');
  if (clickimg) {
    clickimg.addEventListener('click', () => {
      // 閲覧済ストレージ保存
      sessionStorage.setItem('gorgpop', '1');
      Swal.close(); // ポップアップを閉じる
      // 履歴エントリをクリア
      history.pushState(null, null, null);
    });
  }
}
