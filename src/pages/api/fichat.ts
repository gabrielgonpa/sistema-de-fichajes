// pages/api/fichar.ts
import { NextApiRequest, NextApiResponse } from "next";
import { pool } from "../../lib/db"; // conexión db

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { empleadoId, tipo, metodo } = req.body;

  try {
    await pool.query(
      "INSERT INTO fichajes (empleado_id, tipo, fecha_hora, metodo) VALUES ($1, $2, NOW(), $3)",
      [empleadoId, tipo, metodo]
    );
    res.status(200).json({ message: "Fichaje registrado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registrando fichaje" });
  }
}
