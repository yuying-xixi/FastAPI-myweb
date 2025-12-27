import {fetchNoteDetail} from "/static/js/api/notesApi.js";
import "https://cdn.jsdelivr.net/npm/marked/marked.min.js";

// ==================== 格式化时间 ====================
function formatDate(isoString) {
    const date = new Date(isoString);
    const pad = n => n.toString().padStart(2, "0");

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} `
         + `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

// ==================== 从 URL 取 note_id ====================
function getNoteIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("note_id");
}

// ==================== 页面加载后执行 ====================
document.addEventListener("DOMContentLoaded", async () => {
    const noteId = Number(getNoteIdFromURL());

    if (!noteId) {
        document.getElementById("noteContent").innerText = "无效的笔记 ID";
        return;
    }

    try {
        const note = await fetchNoteDetail(noteId);
        renderNote(note);  // 渲染笔记
        generateOutline(); // ✅ 修改1：在笔记渲染后立即生成大纲
    } catch (e) {
        console.error(e);
        document.getElementById("noteContent").innerText = "加载失败";
    }
});

// ==================== 渲染笔记 ====================
function renderNote(note) {
    const container = document.getElementById("noteContent");

    const html = `
        <h1 id="title-1">${note.note_title}</h1>
        <p class="text-muted">${formatDate(note.note_update_time)}</p>
        <hr>
        <div id="note-body"></div>
    `;

    container.innerHTML = html;

    // Markdown → HTML
    const noteBody = document.getElementById("note-body");
    noteBody.innerHTML = marked.parse(note.note_content);
}

// ==================== 生成大纲 ====================
function generateOutline() {
    const container = document.getElementById("noteContent");
    const outlineList = document.getElementById("outlineList");
    outlineList.innerHTML = ""; // 先清空

    // ✅ 修改2：包含 note-body 内的所有标题
    const headings = container.querySelectorAll("h1, h2, h3, h4, h5");

    headings.forEach((h, index) => {
        if (!h.id) h.id = `heading-${index}`;
        const li = document.createElement("li");
        li.style.marginLeft = (parseInt(h.tagName.substring(1)) - 1) * 10 + "px";

        const a = document.createElement("a");
        a.href = `#${h.id}`;
        a.textContent = h.textContent;
        a.classList.add("d-block", "text-decoration-none");

        li.appendChild(a);
        outlineList.appendChild(li);
    });

    // 高亮当前标题
    const outlineLinks = outlineList.querySelectorAll("a");
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    outlineLinks.forEach((link) => link.classList.remove("active"));
                    const activeLink = outlineList.querySelector(
                        `a[href="#${entry.target.id}"]`
                    );
                    if (activeLink) activeLink.classList.add("active");
                }
            });
        },
        { rootMargin: "-50% 0px -50% 0px" }
    );

    headings.forEach((h) => observer.observe(h));
}