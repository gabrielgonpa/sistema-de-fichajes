import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { codigo, tipo } = await req.json()

    const empleado = await prisma.empleado.findUnique({ where: { codigo } })
    if (!empleado)
      return NextResponse.json({ error: 'Empleado no encontrado' }, { status: 404 })

    const fichaje = await prisma.fichaje.create({
      data: { tipo, empleadoId: empleado.id },
    })

    return NextResponse.json({ message: 'Fichaje registrado', fichaje })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Error al registrar el fichaje' }, { status: 500 })
  }
}
