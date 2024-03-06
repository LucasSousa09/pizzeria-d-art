export default function ProfileLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className="flex flex-col items-center justify-start max-w-[100vw] min-h-[calc(100vh-60px)] md:min-h-[calc(100vh-104px)] mt-[60px] md:mt-[104px]">
        {children}
      </div>    
    )
  }