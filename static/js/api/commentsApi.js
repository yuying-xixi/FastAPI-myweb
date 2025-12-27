const API_BASE = "/api/comments";

export async function fetchComments(note_id) {
    const res = await fetch(`${API_BASE}/note/${note_id}`);
    return res.json();
}

export async function createComment(data) {
    const res = await fetch(`${API_BASE}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return res.json();
}

export async function deleteComment(id) {
    const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
    return res.json();
}
