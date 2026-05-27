// ─── In-memory auth store (no backend required) ───────────────────────────────
const authStore = {
  users: [],
  currentUser: null,

  register(data) {
    const exists = this.users.find(
      (u) => u.email.toLowerCase() === data.email.toLowerCase()
    );
    if (exists) throw new Error("An account with this email already exists.");
    const user = {
      ...data,
      id: Date.now(),
      joinedAt: new Date().toISOString(),
      points: 0,
    };
    this.users.push(user);
    this.currentUser = user;
    return user;
  },

  login(email, password) {
    const user = this.users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (!user) throw new Error("No account found with this email address.");
    if (user.password !== password)
      throw new Error("Incorrect password. Please try again.");
    this.currentUser = user;
    return user;
  },

  logout() {
    this.currentUser = null;
  },
};

export default authStore;
