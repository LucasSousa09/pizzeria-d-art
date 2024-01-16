export default function ProfileLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className="px-5 2xl:px-0 flex flex-col items-center justify-start min-h-[calc(100vh-104px)] mt-[60px] md:mt-[104px]">
        <h1 className="mt-5 text-5xl text-primary font-bold">Meu Perfil</h1>
        {children}
      </div>    
    )
  }