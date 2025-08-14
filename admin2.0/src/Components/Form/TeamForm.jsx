import React, { useEffect, useState } from "react";
import {
  STORAGE_KEYS,
  classNames,
  fileToDataUrl,
  readLS,
  writeLS,
} from "../utils/utils";

const TeamForm = ({ initial = null, onSaved, onClose }) => {
  const isEdit = !!initial;
  const [name, setName] = useState(initial?.name || "");
  const [designation, setDesignation] = useState(initial?.designation || "");
  const [image, setImage] = useState(initial?.image || null);
  const [email, setEmail] = useState(initial?.email || "");
  const [linkedin, setLinkedin] = useState(initial?.linkedin || "");
  const [saving, setSaving] = useState(false);
  const [members, setMembers] = useState(() => readLS(STORAGE_KEYS.team));
  useEffect(() => writeLS(STORAGE_KEYS.team, members), [members]);

  async function onImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUrl = await fileToDataUrl(file);
    setImage(dataUrl);
  }

  function validate() {
    if (!name.trim()) return "Name is required";
    if (!designation.trim()) return "Designation is required";
    return null;
  }

  function onSubmit(e) {
    e.preventDefault();
    const err = validate();
    if (err) return alert(err);
    setSaving(true);

    const payload = {
      id: isEdit ? initial.id : crypto.randomUUID(),
      name: name.trim(),
      designation: designation.trim(),
      email: email.trim() || null,
      linkedin: linkedin.trim() || null,
      image,
      createdAt: isEdit ? initial.createdAt : Date.now(),
      updatedAt: Date.now(),
    };

    if (isEdit) {
      setMembers((prev) =>
        prev.map((m) => (m.id === payload.id ? payload : m))
      );
    } else {
      setMembers((prev) => [payload, ...prev]);
    }

    setSaving(false);
    if (onSaved) onSaved(payload);
    if (onClose) onClose();
  }
  return (
    <div className="p-6 space-y-6">
      {" "}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {isEdit ? "Edit Team Member" : "Add Team Member"}
          </h1>
          <p className="text-sm text-muted-foreground">
            Upload a profile photo, name and designation. Links are optional.
          </p>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-sm text-gray-500">
            Close
          </button>
        )}
      </div>
      <form
        onSubmit={onSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        <div className="lg:col-span-2 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-black/10 bg-white/70 px-3 py-2 focus:outline-none"
                placeholder="e.g. Md. Cowsar Ahmed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Designation
              </label>
              <input
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                className="w-full rounded-xl border border-black/10 bg-white/70 px-3 py-2 focus:outline-none"
                placeholder="e.g. Full‑Stack Developer"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Email (optional)
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="w-full rounded-xl border border-black/10 bg-white/70 px-3 py-2 focus:outline-none"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                LinkedIn (optional)
              </label>
              <input
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                className="w-full rounded-xl border border-black/10 bg-white/70 px-3 py-2 focus:outline-none"
                placeholder="https://linkedin.com/in/username"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Profile Image
            </label>
            <input type="file" accept="image/*" onChange={onImageChange} />
            {image && (
              <img
                src={image}
                alt="preview"
                className="mt-3 h-32 w-32 object-cover rounded-xl border border-black/5"
              />
            )}
          </div>

          <div className="pt-2">
            <button
              disabled={saving}
              className={classNames(
                "inline-flex items-center rounded-xl bg-black text-white px-4 py-2",
                saving && "opacity-60 cursor-not-allowed"
              )}
            >
              {saving ? "Saving..." : isEdit ? "Update Member" : "Save Member"}
            </button>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="rounded-2xl bg-white/60 border border-black/5 p-4">
            <h3 className="font-semibold mb-3">Team</h3>
            <ul className="space-y-3 max-h-[520px] overflow-auto pr-1">
              {members.length === 0 && (
                <li className="text-sm text-gray-500">No members yet.</li>
              )}
              {members.map((m) => (
                <li
                  key={m.id}
                  className="grid grid-cols-[auto,1fr,auto] items-center gap-3"
                >
                  {m.image ? (
                    <img
                      src={m.image}
                      alt={m.name}
                      className="h-10 w-10 rounded-md object-cover border border-black/5"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-md bg-gray-100 grid place-items-center text-xs">
                      N/A
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">{m.name}</div>
                    <div className="text-xs text-gray-500 truncate">
                      {m.designation}
                    </div>
                  </div>
                  <span className="text-xs rounded-md px-2 py-1 border border-black/10">
                    {m.email ? "Email" : ""}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TeamForm;
