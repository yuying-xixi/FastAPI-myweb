document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("floatingInput").value.trim();
  const password = document.getElementById("floatingPassword").value.trim();

  if (!email || !password) {
    alert("Email 和密码都要填，不然就只能靠运气登录了。");
    return;
  }

  console.log("Email:", email);
  console.log("Password:", password);

  // 这里预留接口，你可以改成 fetch("/api/login", {...})
  alert("提交成功（当然现在还没连后端）");
});
