<p align="center">
  <img src="https://github.com/imtoasting/TTL/assets/logo.png" />
</p>
<p align="center">
  <h1 align="center">Discord TTL</h1>
</p>

A simple Discord bot that automatically deletes messages older than a defined TTL (time-to-live) across an entire guild.

This bot is intended for **private servers** and runs silently in the background.

---

## Features

- Deletes messages older than **7 days**
- Works across the **entire guild**
- Auto-scales cleanup interval based on guild size
- Runs cleanup immediately on startup (catch-up)
- No database
- No commands
- No logs

---

## Requirements

- Node.js v18+
- Discord.js v14
- Bot permissions:
  - Read Message History
  - Manage Messages

---

## Installation

```bash
npm install