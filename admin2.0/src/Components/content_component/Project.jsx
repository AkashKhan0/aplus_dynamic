import React, { useEffect, useState } from "react";
import ProjectForm from "../Form/ProjectForm";
import { STORAGE_KEYS, readLS, writeLS } from "../utils/utils";

const Project = () => {
  const [projects, setProjects] = useState(() => readLS(STORAGE_KEYS.projects));
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => writeLS(STORAGE_KEYS.projects, projects), [projects]);

  function remove(id) {
    if (!confirm("Delete this project?")) return;
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }

  function openNew() {
    setEditing(null);
    setShowForm(true);
  }

  function openEdit(p) {
    setEditing(p);
    setShowForm(true);
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={openNew}
            className="rounded-xl bg-black text-white px-4 py-2"
          >
            + Add New
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.length === 0 && (
          <div className="text-sm text-gray-500">
            No projects yet. Click Add New to create one.
          </div>
        )}
        {projects.map((p) => (
          <div key={p.id} className="rounded-lg border p-4 bg-white/70">
            {p.cover && (
              <img
                src={p.cover}
                alt={p.name}
                className="h-40 w-full object-cover rounded-md mb-3"
              />
            )}
            <div className="flex items-start gap-3">
              <div className="min-w-0">
                <div className="font-medium truncate">{p.name}</div>
                <div className="text-xs text-gray-500 truncate">
                  {p.tools?.join(", ")}
                </div>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <button
                  onClick={() => openEdit(p)}
                  className="text-xs px-2 py-1 border rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() =>
                    navigator.clipboard?.writeText(JSON.stringify(p))
                  }
                  className="text-xs px-2 py-1 border rounded"
                >
                  Export
                </button>
                <button
                  onClick={() => remove(p.id)}
                  className="text-xs px-2 py-1 border rounded text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 grid place-items-start p-6 z-50">
          <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-auto">
            <ProjectForm
              initial={editing}
              onClose={() => setShowForm(false)}
              onSaved={(p) => {
                setProjects((prev) => {
                  const exists = prev.find((x) => x.id === p.id);
                  if (exists) return prev.map((x) => (x.id === p.id ? p : x));
                  return [p, ...prev];
                });
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Project;
