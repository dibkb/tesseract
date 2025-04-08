interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="h-[calc(100vh-3rem)]">
      <div className="h-full">{children}</div>
    </div>
  );
}
