console.log("notesApi.js loaded");

export function fetchNotesList() {
    return fetch("/api/notes/").then(res => res.json());
}

export function fetchNoteDetail(id) {
    return fetch(`/api/notes/${id}`).then(res => res.json());
}
