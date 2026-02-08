export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div id="sanity" style={{ margin: 0 }}>
      {children}
    </div>
  );
}
