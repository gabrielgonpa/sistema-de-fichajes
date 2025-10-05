"use client";
import Image from "next/image";
import { useState } from "react";

export default function FichajeKiosk() {
  const [pin, setPin] = useState("");

  const handlePress = (num: string) => {
    if (pin.length < 6) setPin(pin + num);
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };

  const handleClear = () => {
    setPin("");
  };

  const handleAction = (tipo: string) => {
    console.log(`Fichaje: ${tipo}, Código: ${pin}`);
    setPin("");
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-[400px] text-center">
        {/* LOGO */}
        <div className="flex justify-center mb-6">
          <Image
            src="/logo.png"
            alt="Logo Empresa"
            width={120}
            height={120}
            className="object-contain"
          />
        </div>

        <h1 className="text-2xl font-bold text-[#f47c27] mb-2">
          Sistema de Fichaje
        </h1>
        <p className="text-gray-500 mb-6">
          Introduce tu código o usa tu tarjeta
        </p>

        {/* Pantalla PIN */}
        <div className="bg-gray-100 rounded-xl py-4 mb-6 text-2xl tracking-[0.5em] font-mono text-gray-700">
          {pin.replace(/./g, "•") || " "}
        </div>

        {/* Teclado numérico */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[..."123456789"].map((num) => (
            <button
              key={num}
              onClick={() => handlePress(num)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-2xl font-semibold py-4 rounded-xl shadow-sm"
            >
              {num}
            </button>
          ))}
          <button
            onClick={handleDelete}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 text-xl font-semibold py-4 rounded-xl shadow-sm"
          >
            ←
          </button>
          <button
            onClick={() => handlePress("0")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-2xl font-semibold py-4 rounded-xl shadow-sm"
          >
            0
          </button>
          <button
            onClick={handleClear}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 text-xl font-semibold py-4 rounded-xl shadow-sm"
          >
            C
          </button>
        </div>

        {/* Botones de acción */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button
            onClick={() => handleAction("entrada")}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl shadow"
          >
            Entrada
          </button>
          <button
            onClick={() => handleAction("salida")}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl shadow"
          >
            Salida
          </button>
          <button
            onClick={() => handleAction("pausa")}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-xl shadow"
          >
            Pausa
          </button>
          <button
            onClick={() => handleAction("reanudar")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl shadow"
          >
            Reanudar
          </button>
        </div>

        {/* Botón Ver horas */}
        <button
          onClick={() => handleAction("ver_horas")}
          className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 rounded-xl shadow w-full"
        >
          Ver horas
        </button>
      </div>
    </main>
  );
}
