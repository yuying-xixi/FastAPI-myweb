import {fetchNotesList} from "/static/js/api/notesApi.js";

// 渲染
window.addEventListener("DOMContentLoaded", () => {
    loadNotes();
    manageNotes();
});


// 格式化时间
function formatDate(isoString) {
    const date = new Date(isoString);
    const pad = n => n.toString().padStart(2, "0");

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} `
         + `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

// 渲染笔记页面
export function loadNotes() {
    fetchNotesList().then(notes => {
        const container = document.getElementById("notesList");
        if (!container) return;
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
    });
}


// 渲染个人笔记管理
export function manageNotes() {
    fetchNotesList().then(notes => {
            const notesTable = document.getElementById("notesTable");
            if (!notesTable) return;
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
            })
        }
    )
}


