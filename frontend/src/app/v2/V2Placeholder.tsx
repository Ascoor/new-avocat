interface V2PlaceholderProps {
  title: string;
  description: string;
}

const V2Placeholder = ({ title, description }: V2PlaceholderProps) => (
  <div className="rounded-2xl border border-border bg-card p-8 text-center">
    <h2 className="text-xl font-semibold text-foreground">{title}</h2>
    <p className="mt-2 text-sm text-muted-foreground">{description}</p>
  </div>
);

export default V2Placeholder;
