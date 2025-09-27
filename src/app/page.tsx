// src/app/page.tsx
"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [employeeId, setEmployeeId] = useState("");
  const [status, setStatus] = useState<"entrada" | "salida" | "horas" | null>(null);
  const [message, setMessage] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!employeeId) {
      setMessage("⚠️ Ingresa tu ID de empleado");
      return;
    }

    if (status === "entrada") {
      setMessage(`✅ Entrada registrada para ID: ${employeeId}`);
    } else if (status === "salida") {
      setMessage(`✅ Salida registrada para ID: ${employeeId}`);
    } else if (status === "horas") {
      setMessage(`📊 Reporte de horas ID: ${employeeId}\nSemana: 32h\nMes: 120h`);
    }

    setEmployeeId("");
    setStatus(null);
  };

  // Funciones del teclado
  const handleKeyPress = (num: string) => {
    setEmployeeId((prev) => prev + num);
  };

  const handleDelete = () => {
    setEmployeeId((prev) => prev.slice(0, -1));
  };

  return (
    <main className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-orange-900 text-white">
      <div className="w-full max-w-3xl rounded-2xl bg-gray-950 p-12 shadow-2xl border border-gray-700">
        {/* Reloj */}
        <div className="text-center mb-10">
          <h1 className="text-7xl font-extrabold tracking-wider">{time}</h1>
          <p className="text-gray-400 mt-4 text-2xl">Sistema de Fichaje</p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <input
            type="text"
            placeholder="Escanea tu tarjeta o ingresa ID"
            value={employeeId}
            readOnly
            className="w-full rounded-lg border border-gray-600 bg-gray-800 px-6 py-5 text-2xl text-center focus:outline-none"
          />

          {/* Teclado numérico */}
          <div className="grid grid-cols-3 gap-4 text-2xl font-bold">
            {["1","2","3","4","5","6","7","8","9","0"].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => handleKeyPress(num)}
                className="rounded-xl bg-gray-700 py-6 hover:bg-gray-600 transition"
              >
                {num}
              </button>
            ))}
            <button
              type="button"
              onClick={handleDelete}
              className="col-span-2 rounded-xl bg-red-600 py-6 hover:bg-red-700 transition"
            >
              ⌫ Borrar
            </button>
            <button
              type="button"
              onClick={() => handleSubmit()}
              className="col-span-1 rounded-xl bg-green-600 py-6 hover:bg-green-700 transition"
            >
              OK
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-6">
            <button
              type="button"
              onClick={() => setStatus("entrada")}
              className={`rounded-xl px-6 py-6 text-2xl font-bold transition ${
                status === "entrada"
                  ? "bg-green-700"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              Entrada
            </button>
            <button
              type="button"
              onClick={() => setStatus("salida")}
              className={`rounded-xl px-6 py-6 text-2xl font-bold transition ${
                status === "salida"
                  ? "bg-red-700"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              Salida
            </button>
            <button
              type="button"
              onClick={() => setStatus("horas")}
              className={`rounded-xl px-6 py-6 text-2xl font-bold transition ${
                status === "horas"
                  ? "bg-blue-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              Ver horas
            </button>
          </div>
        </form>

        {/* Mensaje */}
        {message && (
          <pre className="mt-10 text-center text-2xl font-medium text-orange-400 whitespace-pre-wrap">
            {message}
          </pre>
        )}
      </div>
    </main>
  );
}
