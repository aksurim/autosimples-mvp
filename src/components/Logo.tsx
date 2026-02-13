export function Logo({ className = "h-12" }: { className?: string }) {
  return (
    <img 
      src="/logo_autosimples.png" 
      alt="AutoSimples Logo" 
      className={`${className} object-contain`}
    />
  );
}