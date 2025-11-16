const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/intervenants", async (req, res) => {
  try {
    const data = await prisma.intervenant.findMany({
      orderBy: { id: "asc" },
    });
    res.json(data);
  } catch (err) {
    console.error("Erreur Prisma :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
