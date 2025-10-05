import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const codigo = searchParams.get('codigo')

  if (!codigo)
    return NextResponse.json({ error: 'Falta el código del empleado' }, { status: 400 })

  const empleado = await prisma.empleado.findUnique({
    where: { codigo },
    include: { fichajes: true },
  })

  if (!empleado)
    return NextResponse.json({ error: 'Empleado no encontrado' }, { status: 404 })

  return NextResponse.json(empleado)
}
