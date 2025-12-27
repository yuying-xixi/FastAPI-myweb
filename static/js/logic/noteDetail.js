import {fetchNoteDetail} from "/static/js/api/notesApi.js";
import {fetchComments, createComment} from "/static/js/api/commentsApi.js";
import "https://cdn.jsdelivr.net/npm/marked/marked.min.js";

function formatDate(isoString) {
    const date = new Date(isoString);
    const pad = n => n.toString().padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} `
         + `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

function getNoteIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return Number(params.get("note_id"));
}

async function renderComments(noteId) {
    const comments = await fetchComments(noteId);
    const commentList = document.querySelector(".comment-list");
    commentList.innerHTML = "";
    comments.forEach(c => {
        const div = document.createElement("div");
        div.classList.add("comment");
        div.innerHTML = `<strong>用户${c.user_id}</strong>: ${c.comment_content}`;
        commentList.appendChild(div);
    });
}

function renderNote(note) {
    const container = document.getElementById("noteContent");
    container.innerHTML = `
        <h1 id="title-1">${note.note_title}</h1>
        <p class="text-muted">${formatDate(note.note_update_time)}</p>
        <hr>
        <div id="note-body"></div>
    `;
    document.getElementById("note-body").innerHTML = marked.parse(note.note_content);
}

function generateOutline() {
    const container = document.getElementById("noteContent");
    const outlineList = document.getElementById("outlineList");
    outlineList.innerHTML = "";

    const headings = container.querySelectorAll("#note-body h1, #note-body h2, #note-body h3, #note-body h4, #note-body h5");
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

    const outlineLinks = outlineList.querySelectorAll("a");
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    outlineLinks.forEach(link => link.classList.remove("active"));
                    const activeLink = outlineList.querySelector(`a[href="#${entry.target.id}"]`);
                    if(activeLink) activeLink.classList.add("active");
                }
            });
        },
        { rootMargin: "-50% 0px -50% 0px" }
    );

    headings.forEach(h => observer.observe(h));
}

document.addEventListener("DOMContentLoaded", async () => {
    const noteId = getNoteIdFromURL();
    if (!noteId) {
        document.getElementById("noteContent").innerText = "无效的笔记 ID";
        return;
    }

    try {
        const note = await fetchNoteDetail(noteId);
        renderNote(note);
        generateOutline();
        renderComments(noteId);

        const submitBtn = document.querySelector(".comment-section button.btn-primary");
        const textarea = document.querySelector(".comment-section textarea");

        submitBtn.addEventListener("click", async () => {
            const content = textarea.value.trim();
            if (!content) return alert("评论不能为空");

            await createComment({
                note_id: noteId,
                user_id: 1, // 模拟用户ID
                comment_content: content
            });

            textarea.value = "";
            renderComments(noteId);
        });

    } catch(e) {
        console.error(e);
        document.getElementById("noteContent").innerText = "加载失败";
    }
});