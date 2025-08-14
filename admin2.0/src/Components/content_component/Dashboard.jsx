import React, { useMemo } from "react";
import { STORAGE_KEYS, readLS, writeLS } from "../utils/utils";

const Dashboard = () => {
  const projects = readLS(STORAGE_KEYS.projects);
  const team = readLS(STORAGE_KEYS.team);

  const metrics = useMemo(() => {
    const total = projects.length;
    const completed = projects.filter((p) => p.status === "Completed").length;
    const ongoing = projects.filter((p) => p.status === "Ongoing").length;
    const planned = projects.filter((p) => p.status === "Planned").length;
    return { total, completed, ongoing, planned };
  }, [projects]);

  const recent = [...projects]
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
    .slice(0, 5);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Welcome back 👋</h1>
      <p className="text-sm text-muted-foreground">
        Here are your quick stats and recent activity.
      </p>

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          {
            label: "Total Projects",
            value: metrics.total,
            sub: `${metrics.completed} completed · ${metrics.ongoing} ongoing`,
          },
          { label: "Team Members", value: team.length, sub: "active profiles" },
          { label: "Ongoing", value: metrics.ongoing, sub: "in progress" },
          { label: "Planned", value: metrics.planned, sub: "up next" },
        ].map((m, i) => (
          <div
            key={i}
            className="rounded-2xl bg-white/60 dark:bg-white/5 backdrop-blur border border-black/5 p-5 shadow-sm"
          >
            <div className="text-xs uppercase tracking-wide text-gray-500 mb-1">
              {m.label}
            </div>
            <div className="text-3xl font-bold">{m.value}</div>
            <div className="text-xs text-gray-500 mt-1">{m.sub}</div>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 rounded-2xl bg-white/60 dark:bg-white/5 border border-black/5 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Recent Projects</h2>
            <span className="text-xs text-gray-500">Last 5</span>
          </div>

          <ul className="divide-y divide-gray-200/60 dark:divide-white/10">
            {recent.length === 0 && (
              <li className="py-8 text-sm text-gray-500 text-center">
                No projects yet. Add your first project from the Project form.
              </li>
            )}

            {recent.map((p) => (
              <li key={p.id} className="py-3 flex items-center gap-3">
                {p.cover && (
                  <img
                    src={p.cover}
                    alt={p.name}
                    className="h-10 w-10 rounded-lg object-cover border border-black/5"
                  />
                )}
                <div className="min-w-0">
                  <div className="font-medium truncate">{p.name}</div>
                  <div className="text-xs text-gray-500 truncate">
                    {p.tools?.join(", ")}
                  </div>
                </div>
                <span className="ml-auto text-xs rounded-full px-2 py-0.5 bg-gray-100 dark:bg-white/10">
                  {p.status}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-white/60 dark:bg-white/5 border border-black/5 p-5">
          <h2 className="font-semibold mb-4">Quick Actions</h2>
          <div className="grid gap-3">
            <a
              href="/project"
              className="inline-flex items-center justify-center rounded-xl border border-black/10 px-4 py-2 hover:bg-black/5"
            >
              View Projects
            </a>
            <a
              href="/team"
              className="inline-flex items-center justify-center rounded-xl border border-black/10 px-4 py-2 hover:bg-black/5"
            >
              View Team
            </a>
            <button
              onClick={() => {
                writeLS(STORAGE_KEYS.projects, []);
                writeLS(STORAGE_KEYS.team, []);
                window.location.reload();
              }}
              className="rounded-xl bg-red-600 text-white px-4 py-2 hover:bg-red-700"
            >
              Clear Demo Data
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
