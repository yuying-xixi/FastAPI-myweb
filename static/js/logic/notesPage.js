import { fetchNotesList, fetchNoteDetail, createNote, updateNote, deleteNote } from "/static/js/api/notesApi.js";

// 格式化时间
function formatDate(isoString) {
    const date = new Date(isoString);
    const pad = n => n.toString().padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

// 渲染笔记列表
export async function loadNotes() {
    const notes = await fetchNotesList();
    const container = document.getElementById("notesList");
    container.innerHTML = "";
    notes.forEach(note => {
        const card = `
            <div class="card h-100 shadow-sm mt-3">
                <div class="card-body">
                    <h5 class="card-title">${note.note_title}</h5>
                    <p class="card-text text-muted"><small>${formatDate(note.note_update_time)}</small></p>
                    <p class="card-text">暂无笔记简介描述</p>
                    <a href="/static/html/note_api.html?note_id=${note.note_id}" class="btn btn-primary btn-sm">查看详情</a>
                </div>
            </div>
        `;
        container.innerHTML += card;
    });
}

// 渲染笔记管理表格
export async function manageNotes() {
    const notes = await fetchNotesList();
    const notesTable = document.getElementById("notesTable");
    notesTable.innerHTML = "";
    notes.forEach(note => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${note.note_id}</td>
            <td>${note.note_title}</td>
            <td>${formatDate(note.note_create_time)}</td>
            <td>${formatDate(note.note_update_time)}</td>
            <td>${note.note_view_count}</td>
            <td>${note.note_like_count}</td>
            <td>
                <button class="btn btn-sm btn-warning me-1 edit-note" data-id="${note.note_id}">编辑</button>
                <button class="btn btn-sm btn-danger delete-note" data-id="${note.note_id}">删除</button>
            </td>
        `;
        notesTable.appendChild(tr);
    });

    // 编辑按钮
    document.querySelectorAll(".edit-note").forEach(btn => {
        btn.addEventListener("click", async () => {
            const noteId = btn.dataset.id;
            const note = await fetchNoteDetail(noteId);
            document.querySelector("#editNoteForm [name=note_id]").value = note.note_id;
            document.querySelector("#editNoteForm [name=title]").value = note.note_title;
            document.querySelector("#editNoteForm [name=content]").value = note.note_content;
            const modal = new bootstrap.Modal(document.getElementById("editNoteModal"));
            modal.show();
        });
    });

    // 删除按钮
    document.querySelectorAll(".delete-note").forEach(btn => {
        btn.addEventListener("click", () => {
            const noteId = btn.dataset.id;
            const modal = new bootstrap.Modal(document.getElementById("deleteNoteModal"));
            modal.show();

            document.getElementById("confirmDeleteNote").onclick = async () => {
                await deleteNote(noteId);
                modal.hide();
                manageNotes();
                loadNotes();
            };
        });
    });
}

// 新增笔记提交
document.getElementById("addNoteForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
        user_id: 1,  // 假设用户ID固定
        note_title: form.title.value,
        note_content: form.content.value
    };
    await createNote(data);
    const modal = bootstrap.Modal.getInstance(document.getElementById("addNoteModal"));
    modal.hide();
    form.reset();
    manageNotes();
    loadNotes();
});

// 编辑笔记提交
document.getElementById("editNoteForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const noteId = form.note_id.value;
    const data = {
        note_title: form.title.value,
        note_content: form.content.value
    };
    await updateNote(noteId, data);
    const modal = bootstrap.Modal.getInstance(document.getElementById("editNoteModal"));
    modal.hide();
    manageNotes();
    loadNotes();
});

// 页面加载
window.addEventListener("DOMContentLoaded", () => {
    loadNotes();
    manageNotes();
});