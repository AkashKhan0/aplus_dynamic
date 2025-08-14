import React, { useEffect, useState } from "react";
import TeamForm from "../Form/TeamForm";
import { STORAGE_KEYS, readLS, writeLS } from "../utils/utils";

const Team = () => {
  const [members, setMembers] = useState(() => readLS(STORAGE_KEYS.team));
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => writeLS(STORAGE_KEYS.team, members), [members]);

  function remove(id) {
    if (!confirm("Delete this member?")) return;
    setMembers((prev) => prev.filter((m) => m.id !== id));
  }

  function openNew() {
    setEditing(null);
    setShowForm(true);
  }

  function openEdit(m) {
    setEditing(m);
    setShowForm(true);
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Team</h1>
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
        {members.length === 0 && (
          <div className="text-sm text-gray-500">
            No team members yet. Click Add New to create one.
          </div>
        )}
        {members.map((m) => (
          <div
            key={m.id}
            className="rounded-lg border p-4 bg-white/70 flex items-center gap-3"
          >
            {m.image ? (
              <img
                src={m.image}
                alt={m.name}
                className="h-20 w-20 object-cover rounded-md"
              />
            ) : (
              <div className="h-20 w-20 bg-gray-100 rounded-md grid place-items-center">
                N/A
              </div>
            )}
            <div className="flex-1">
              <div className="font-medium">{m.name}</div>
              <div className="text-sm text-gray-500">{m.designation}</div>
              <div className="mt-2 flex gap-2">
                {m.email && (
                  <a className="text-xs underline" href={`mailto:${m.email}`}>
                    Email
                  </a>
                )}
                {m.linkedin && (
                  <a
                    className="text-xs underline"
                    href={m.linkedin}
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => openEdit(m)}
                className="text-xs px-2 py-1 border rounded"
              >
                Edit
              </button>
              <button
                onClick={() => remove(m.id)}
                className="text-xs px-2 py-1 border rounded text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 grid place-items-start p-6 z-50">
          <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-auto">
            <TeamForm
              initial={editing}
              onClose={() => setShowForm(false)}
              onSaved={(m) => {
                setMembers((prev) => {
                  const exists = prev.find((x) => x.id === m.id);
                  if (exists) return prev.map((x) => (x.id === m.id ? m : x));
                  return [m, ...prev];
                });
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;
