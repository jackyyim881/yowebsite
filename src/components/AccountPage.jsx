import React, { useState, useEffect } from "react";

const AccountPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // replace '/api/account' with your real endpoint
    fetch("/api/account")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user data");
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading account details…</div>;

  if (!user) {
    // No account found – redirect to register page
    window.location.href = "/register";
    return null;
  }

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="account-page">
      <h1>My Account</h1>
      <div className="account-info">
        <label>Name:</label>
        <span>{user.name}</span>
      </div>
      <div className="account-info">
        <label>Email:</label>
        <span>{user.email}</span>
      </div>
    </div>
  );
};

export default AccountPage;
