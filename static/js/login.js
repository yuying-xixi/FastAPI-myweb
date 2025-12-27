console.log("login.js loaded");
document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const user_name = document.getElementById("floatingInput").value.trim();
  const password = document.getElementById("floatingPassword").value.trim();

  if (!user_name || !password) {
    alert("用户名和密码不能为空！");
    return;
  }

  try {
    const res = await fetch("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_name, password })
    });

    if (!res.ok) {
      const err = await res.json();
      return alert(err.detail);
    }

    const data = await res.json();
    alert(`登录成功！欢迎 ${data.user_name}，身份：${data.role}`);

    // 保存 token 或 user info 到 localStorage
    localStorage.setItem("currentUser", JSON.stringify(data));

    // 登录后跳转到主页或个人页
    window.location.href = "/static/html/home_api.html";

  } catch (err) {
    console.error(err);
    alert("登录失败，请检查控制台");
  }
});