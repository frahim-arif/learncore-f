
"use client";

import { useEffect, useState } from "react";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "https://learncore-b.onrender.com"
).replace(/\/$/, "");

export default function AdminDashboard() {
  const [token, setToken] = useState("");
  const [admin, setAdmin] = useState(null);
  const [authChecking, setAuthChecking] = useState(true);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [status, setStatus] = useState("pending");
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [busyId, setBusyId] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("adminToken");

    if (savedToken) {
      setToken(savedToken);
    } else {
      setAuthChecking(false);
    }
  }, []);

  // VERIFY ADMIN TOKEN
  useEffect(() => {
    if (!token) return;

    let active = true;

    const verifyAdmin = async () => {
      setAuthChecking(true);

      try {
        const res = await fetch(`${API_URL}/api/admin/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.message || "Admin session expired");
        }

        if (active) {
          setAdmin(data.admin);
        }
      } catch (error) {
        if (active) {
          localStorage.removeItem("adminToken");
          localStorage.removeItem("admin");
          setToken("");
          setAdmin(null);
          setMessage(error.message);
        }
      } finally {
        if (active) setAuthChecking(false);
      }
    };

    verifyAdmin();

    return () => {
      active = false;
    };
  }, [token]);

  // LOAD ENROLLMENTS
  useEffect(() => {
    if (!token || !admin) return;

    let active = true;

    const loadEnrollments = async () => {
      setLoading(true);
      setMessage("");

      try {
        const res = await fetch(
          `${API_URL}/api/admin/enrollments?status=${status}&page=1&limit=100`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.message || "Unable to load payments");
        }

        if (active) {
          setEnrollments(data.enrollments || []);
        }
      } catch (error) {
        if (active) setMessage(error.message);
      } finally {
        if (active) setLoading(false);
      }
    };

    loadEnrollments();

    return () => {
      active = false;
    };
  }, [token, admin, status]);

  // ADMIN LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();

    setLoginLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("admin", JSON.stringify(data.admin));

      setAdmin(data.admin);
      setToken(data.token);
      setForm({ username: "", password: "" });
      setMessage("Admin login successful");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoginLoading(false);
    }
  };

  // APPROVE PAYMENT
  const handleApprove = async (id) => {
    const confirmed = window.confirm(
      "Have you verified the UTR and payment in your bank account? Approve this payment?"
    );

    if (!confirmed) return;

    setBusyId(id);
    setMessage("");

    try {
      const res = await fetch(
        `${API_URL}/api/admin/enrollments/${id}/approve`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Approval failed");
      }

      setMessage("Payment approved! Course access has been granted.");
      setEnrollments((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      setMessage(error.message);
    } finally {
      setBusyId("");
    }
  };

  // REJECT PAYMENT
  const handleReject = async (id) => {
    const reason = window.prompt("Enter rejection reason:");

    if (reason === null) return;

    if (!reason.trim()) {
      setMessage("Please enter a rejection reason.");
      return;
    }

    setBusyId(id);
    setMessage("");

    try {
      const res = await fetch(
        `${API_URL}/api/admin/enrollments/${id}/reject`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ reason }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Rejection failed");
      }

      setMessage("Payment rejected successfully.");
      setEnrollments((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      setMessage(error.message);
    } finally {
      setBusyId("");
    }
  };

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");

    setToken("");
    setAdmin(null);
    setEnrollments([]);
    setMessage("");
  };

  const getScreenshotUrl = (imagePath) => {
    if (!imagePath) return "";

    if (/^https?:\/\//i.test(imagePath)) {
      return imagePath;
    }

    return `${API_URL}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
  };

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const tabs = [
    { value: "pending", label: "Pending" },
    { value: "approved", label: "Approved" },
    { value: "rejected", label: "Rejected" },
  ];

  if (authChecking) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        Checking admin session...
      </main>
    );
  }

  // ADMIN LOGIN SCREEN
  if (!token || !admin) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="mx-auto w-14 h-14 rounded-xl bg-emerald-900 text-white flex items-center justify-center text-2xl font-bold">
              W
            </div>

            <h1 className="text-2xl font-bold text-slate-900 mt-4">
              Admin Login
            </h1>

            <p className="text-sm text-slate-500 mt-2">
              WebcoreCubeTech Payment Verification
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Username
              </label>

              <input
                type="text"
                value={form.username}
                onChange={(e) =>
                  setForm({ ...form, username: e.target.value })
                }
                autoComplete="username"
                required
                className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:border-emerald-700"
                placeholder="Admin username"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>

              <input
                type="password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                autoComplete="current-password"
                required
                className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:border-emerald-700"
                placeholder="Admin password"
              />
            </div>

            {message && (
              <p className="text-sm text-center text-red-600">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-emerald-900 hover:bg-emerald-800 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
            >
              {loginLoading ? "Please wait..." : "Login to Dashboard"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  // PAYMENT DASHBOARD
  return (
    <main className="min-h-screen bg-slate-100">
      <header className="bg-slate-950 text-white px-5 py-5">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">
              Payment Verification
            </h1>

            <p className="text-sm text-slate-400 mt-1">
              WebcoreCubeTech Admin Dashboard
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="font-semibold">{admin.name}</p>
              <p className="text-xs text-slate-400">{admin.role}</p>
            </div>

            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-semibold"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-3 items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Course Payments
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Verify UTR and payment screenshot before approving.
            </p>
          </div>

          <button
            onClick={() => setStatus(status)}
            className="bg-emerald-900 text-white px-4 py-2 rounded-lg text-sm font-semibold"
          >
            Refresh
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setStatus(tab.value)}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold border ${
                status === tab.value
                  ? "bg-emerald-900 text-white border-emerald-900"
                  : "bg-white text-slate-700 border-slate-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {message && (
          <div className="mb-5 p-4 rounded-lg bg-white border border-slate-200 text-sm text-slate-700">
            {message}
          </div>
        )}

        {loading ? (
          <div className="bg-white p-10 rounded-xl text-center text-slate-500">
            Loading payments...
          </div>
        ) : enrollments.length === 0 ? (
          <div className="bg-white p-12 rounded-xl text-center border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800">
              No {status} payments
            </h3>

            <p className="text-sm text-slate-500 mt-2">
              Payment records will appear here when available.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {enrollments.map((item) => (
              <article
                key={item._id}
                className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden"
              >
                <div className="p-5 border-b border-slate-100 flex flex-wrap justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {item.course?.title || "Course unavailable"}
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                      Submitted: {formatDate(item.createdAt)}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xl font-bold text-emerald-900">
                      ₹{item.amount}
                    </p>

                    <span className="text-xs uppercase font-bold text-slate-500">
                      {item.paymentStatus}
                    </span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 p-5">
                  <div className="space-y-3 text-sm">
                    <h4 className="font-bold text-slate-800 text-base">
                      Student Details
                    </h4>

                    <p>
                      <strong>Name:</strong>{" "}
                      {item.student?.name || "N/A"}
                    </p>

                    <p>
                      <strong>Username:</strong>{" "}
                      {item.student?.username || "N/A"}
                    </p>

                    <p>
                      <strong>Email:</strong>{" "}
                      {item.student?.email || "N/A"}
                    </p>

                    <p>
                      <strong>Phone:</strong>{" "}
                      {item.student?.phone || "N/A"}
                    </p>

                    <div className="pt-3 border-t border-slate-100">
                      <h4 className="font-bold text-slate-800 mb-2">
                        Payment Details
                      </h4>

                      <p className="break-all">
                        <strong>UTR:</strong>{" "}
                        {item.transactionId || "Not provided"}
                      </p>

                      <p>
                        <strong>Method:</strong>{" "}
                        {item.paymentMethod || "UPI QR"}
                      </p>

                      <p>
                        <strong>Amount:</strong> ₹{item.amount}
                      </p>

                      {item.approvedAt && (
                        <p>
                          <strong>Approved:</strong>{" "}
                          {formatDate(item.approvedAt)}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-800 text-base mb-3">
                      Payment Screenshot
                    </h4>

                    {item.paymentScreenshot ? (
                      <a
                        href={getScreenshotUrl(item.paymentScreenshot)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <img
                          src={getScreenshotUrl(item.paymentScreenshot)}
                          alt="Payment screenshot"
                          className="w-full max-h-80 object-contain bg-slate-100 border border-slate-200 rounded-lg"
                        />

                        <p className="text-sm text-emerald-800 font-semibold mt-2">
                          Open full screenshot
                        </p>
                      </a>
                    ) : (
                      <div className="p-8 bg-slate-100 rounded-lg text-center text-slate-500 text-sm">
                        Screenshot not available
                      </div>
                    )}
                  </div>
                </div>

                {status === "pending" && (
                  <div className="p-5 bg-slate-50 border-t border-slate-200 flex flex-wrap gap-3">
                    <button
                      disabled={busyId === item._id}
                      onClick={() => handleApprove(item._id)}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-3 rounded-lg font-semibold text-sm disabled:opacity-50"
                    >
                      {busyId === item._id
                        ? "Processing..."
                        : "Approve Payment"}
                    </button>

                    <button
                      disabled={busyId === item._id}
                      onClick={() => handleReject(item._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold text-sm disabled:opacity-50"
                    >
                      Reject Payment
                    </button>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
