import React, { useEffect, useState } from "react";
import {
  STORAGE_KEYS,
  classNames,
  fileToDataUrl,
  readLS,
  writeLS,
} from "../utils/utils";

const ProjectForm = ({ initial = null, onSaved, onClose }) => {
  const isEdit = !!initial;
  const [name, setName] = useState(initial?.name || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [toolsText, setToolsText] = useState(
    (initial?.tools || []).join(", ") || ""
  );
  const [url, setUrl] = useState(initial?.url || "");
  const [status, setStatus] = useState(initial?.status || "Planned");
  const [cover, setCover] = useState(initial?.cover || null);
  const [gallery, setGallery] = useState(initial?.images || []);
  const [saving, setSaving] = useState(false);
  const [projects, setProjects] = useState(() => readLS(STORAGE_KEYS.projects));

  useEffect(() => writeLS(STORAGE_KEYS.projects, projects), [projects]);

  async function onCoverChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUrl = await fileToDataUrl(file);
    setCover(dataUrl);
  }

  async function onGalleryChange(e) {
    const files = Array.from(e.target.files || []);
    const urls = await Promise.all(files.map(fileToDataUrl));
    setGallery((prev) => [...prev, ...urls]);
  }

  function validate() {
    if (!name.trim()) return "Project name is required";
    if (!description.trim()) return "Description is required";
    return null;
  }

  async function onSubmit(e) {
    e.preventDefault();
    const err = validate();
    if (err) return alert(err);
    setSaving(true);

    const payload = {
      id: isEdit ? initial.id : crypto.randomUUID(),
      name: name.trim(),
      description: description.trim(),
      tools: toolsText
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      url: url.trim() || null,
      status,
      cover,
      images: gallery,
      createdAt: isEdit ? initial.createdAt : Date.now(),
      updatedAt: Date.now(),
    };

    if (isEdit) {
      setProjects((prev) =>
        prev.map((p) => (p.id === payload.id ? payload : p))
      );
    } else {
      setProjects((prev) => [payload, ...prev]);
    }

    setSaving(false);
    if (onSaved) onSaved(payload);
    if (onClose) onClose();
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {isEdit ? "Edit Project" : "Add a New Project"}
          </h1>
          <p className="text-sm text-muted-foreground">
            Upload details, images, and tools/technologies used.
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
          <div>
            <label className="block text-sm font-medium mb-1">
              Project Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-black/10 bg-white/70 px-3 py-2 focus:outline-none"
              placeholder="e.g. Luxury Travel Platform"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              className="w-full rounded-xl border border-black/10 bg-white/70 px-3 py-2 focus:outline-none"
              placeholder="Brief overview of the project goals, features, and results."
            />
          </div>

          <div>
            l
            <label cassName="block text-sm font-medium mb-1">
              Tools & Technologies (comma separated)
            </label>
            <input
              value={toolsText}
              onChange={(e) => setToolsText(e.target.value)}
              className="w-full rounded-xl border border-black/10 bg-white/70 px-3 py-2 focus:outline-none"
              placeholder="React, TailwindCSS, Node.js, Firebase"
            />
            {!!toolsText && (
              <div className="mt-2 flex flex-wrap gap-2">
                {toolsText
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean)
                  .map((t) => (
                    <span
                      key={t}
                      className="text-xs rounded-full bg-gray-100 px-2 py-1"
                    >
                      {t}
                    </span>
                  ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Project URL (optional)
              </label>
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full rounded-xl border border-black/10 bg-white/70 px-3 py-2 focus:outline-none"
                placeholder="https://example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-xl border border-black/10 bg-white/70 px-3 py-2 focus:outline-none"
              >
                <option>Planned</option>
                <option>Ongoing</option>
                <option>Completed</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Cover Image
              </label>
              <input type="file" accept="image/*" onChange={onCoverChange} />
              {cover && (
                <img
                  src={cover}
                  alt="cover preview"
                  className="mt-3 h-32 w-full object-cover rounded-xl border border-black/5"
                />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Gallery Images (multiple)
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={onGalleryChange}
              />
              {gallery?.length > 0 && (
                <div className="mt-3 grid grid-cols-4 gap-2">
                  {gallery.map((g, i) => (
                    <img
                      key={i}
                      src={g}
                      alt={`gallery-${i}`}
                      className="h-20 w-full object-cover rounded-lg border border-black/5"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="pt-2">
            <button
              disabled={saving}
              className={classNames(
                "inline-flex items-center rounded-xl bg-black text-white px-4 py-2",
                saving && "opacity-60 cursor-not-allowed"
              )}
            >
              {saving
                ? "Saving..."
                : isEdit
                ? "Update Project"
                : "Save Project"}
            </button>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="rounded-2xl bg-white/60 border border-black/5 p-4">
            <h3 className="font-semibold mb-3">Saved Projects</h3>
            <ul className="space-y-3 max-h-[520px] overflow-auto pr-1">
              {projects.length === 0 && (
                <li className="text-sm text-gray-500">No items yet.</li>
              )}
              {projects.map((p) => (
                <li key={p.id} className="flex items-center gap-3">
                  {p.cover && (
                    <img
                      src={p.cover}
                      alt={p.name}
                      className="h-10 w-10 rounded-md object-cover border border-black/5"
                    />
                  )}
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">{p.name}</div>
                    <div className="text-xs text-gray-500 truncate">
                      {p.tools?.join(", ")}
                    </div>
                  </div>
                  <span className="ml-auto text-[10px] rounded-full px-2 py-0.5 bg-gray-100">
                    {p.status}
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

export default ProjectForm;
