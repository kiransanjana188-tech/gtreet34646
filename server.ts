import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const PORT = 3000;
const STORE_PATH = path.join(process.cwd(), "resonance_store.json");

// Default initial resonance counts
const DEFAULT_RESONANCE: Record<number, number> = {
  0: 412,
  1: 524,
  2: 785,
  3: 631,
  4: 719,
  5: 938,
  6: 1052,
  7: 1391,
  8: 1184,
  9: 1642
};

// Initialize server-side state
let chapterResonance: Record<number, number> = { ...DEFAULT_RESONANCE };

// Load persistent data if exists
try {
  if (fs.existsSync(STORE_PATH)) {
    const raw = fs.readFileSync(STORE_PATH, "utf8");
    const parsed = JSON.parse(raw);
    chunkUpdate(parsed);
    console.log("Loaded persistent resonance store successfully.");
  } else {
    fs.writeFileSync(STORE_PATH, JSON.stringify(DEFAULT_RESONANCE, null, 2), "utf8");
  }
} catch (err) {
  console.warn("Failed to load or write local store, using defaults:", err);
}

function chunkUpdate(parsed: any) {
  if (parsed && typeof parsed === "object") {
    for (const key of Object.keys(parsed)) {
      const numKey = parseInt(key, 10);
      const val = parseInt(parsed[key], 10);
      if (!isNaN(numKey) && !isNaN(val)) {
        chapterResonance[numKey] = val;
      }
    }
  }
}

function saveStore() {
  try {
    fs.writeFileSync(STORE_PATH, JSON.stringify(chapterResonance, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing store to filesystem:", err);
  }
}

// Active Server-Sent Events clients
let clients: Array<{ id: number; res: express.Response }> = [];

const broadcastState = () => {
  const payload = JSON.stringify(chapterResonance);
  clients.forEach(client => {
    try {
      client.res.write(`data: ${payload}\n\n`);
    } catch (e) {
      // Clean up failed client transmissions
    }
  });
};

async function startServer() {
  const app = express();

  // API Route - Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", activeClients: clients.length });
  });

  // API Route - SSE Real-Time Stream
  app.get("/api/resonance/stream", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    // Send immediate current state to the connecting client
    res.write(`data: ${JSON.stringify(chapterResonance)}\n\n`);

    const clientId = Date.now() + Math.random();
    const newClient = { id: clientId, res };
    clients.push(newClient);

    req.on("close", () => {
      clients = clients.filter(c => c.id !== clientId);
    });
  });

  // API Route - Increment Heartbeat
  app.post("/api/resonance/like", express.json(), (req, res) => {
    const { index } = req.body;
    const idxNum = parseInt(index, 10);

    if (!isNaN(idxNum) && idxNum >= 0 && idxNum <= 9) {
      chapterResonance[idxNum] = (chapterResonance[idxNum] || 0) + 1;
      saveStore();
      broadcastState();
      res.json({ success: true, count: chapterResonance[idxNum] });
    } else {
      res.status(400).json({ error: "Invalid chapter index specified" });
    }
  });

  // Vite development integration or static asset distribution in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running in full-stack mode on port ${PORT}`);
  });
}

startServer();
