console.log("notesApi.js loaded");
const API_BASE = "/api/notes";

export async function fetchNotesList() {
    const res = await fetch(`${API_BASE}`);
    return res.json();
}

export async function fetchNoteDetail(id) {
    const res = await fetch(`${API_BASE}/${id}`);
    return res.json();
}

export async function createNote(data) {
    const res = await fetch(`${API_BASE}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return res.json();
}

export async function updateNote(id, data) {
    const res = await fetch(`${API_BASE}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return res.json();
}

export async function deleteNote(id) {
    const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
    return res.json();
}