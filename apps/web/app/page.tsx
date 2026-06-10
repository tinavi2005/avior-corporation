import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Vale Integrador</h1>
        <p className="text-lg text-muted-foreground">
          CRM Académico - Sistema de Gestión de Formación Aeronáutica
        </p>
        <div className="flex gap-4 justify-center pt-4">
          <Link
            href="/login"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Iniciar Sesión
          </Link>
          <Link
            href="/dashboard"
            className="px-6 py-3 border border-input bg-background rounded-lg hover:bg-accent transition-colors"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}