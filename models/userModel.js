class User {
  constructor(username, password) {
    this.id = User.generateId();
    this.username = username;
    this.password = password;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  static generateId() {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  update(updates) {
    const allowedUpdates = ["password"];

    Object.keys(updates).forEach((key) => {
      if (allowedUpdates.includes(key)) {
        this[key] = updates[key];
      }
    });

    this.updatedAt = new Date().toISOString();

    return this;
  }

  toJSON() {
    return {
      id: this.id,
      username: this.username,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

module.exports = User;
