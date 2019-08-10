(() => {
  const auth = () => {
    const day = 60 * 60 * 24 * 1000;
    const { is_post, lock, passwords, root } = window.AD_CONFIG;

    //判断是否是文章、是否锁上了

    if(is_post === false || lock === true) {
      return;
    }

    let [password, expires] = atob(window.localStorage.getItem('auth')).split(':'),
      now = new Date().getTime();

    //判断密码是否正确？、判断是否过了有效期(includes() 方法用来判断一个数组是否包含一个指定的值，如果是返回 true，否则false。)
    if(passwords.includes(password) && now < expires) {
      return; 
    }

    password = prompt('输入暗号：博客作者的名称首字母小写 (例如: 李三 => ls)');
    password = sha256(password || '');

    if(passwords.includes(password)) {
      expires = now + day * 3;
      window.localStorage.setItem('auth', btoa(`${password}:${expires}`));
    } else {
      alert('您没有阅读权限');
      window.location.href = root;
    }
  };

  // print github and demo info
  console.log(
    '\n%c Theme-AD v2.6.0 %c' + 
    ' 🎉 https://github.com/dongyuanxin/theme-ad 🎉\n' + 
    '\n%c Preview Online %c' + 
    ' 🔍 https://godbmw.com/ 🔍  \n' , 
    'color: #fadfa3; background: #030307; padding:3px 0;', '', 'color: #fadfa3; background: #030307; padding:3px 0;', ''
  );

  // article password auth
  auth();
})();