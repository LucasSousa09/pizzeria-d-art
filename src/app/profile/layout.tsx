export default function ProfileLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className="flex flex-col items-center justify-start h-[calc(100vh-104px)]">
        <h1 className="mt-5 text-5xl text-primary font-bold">Meu Perfil</h1>
        {children}
      </div>    
    )
  }