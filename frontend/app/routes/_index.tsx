export default function Index() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="font-serif text-5xl font-bold text-foreground mb-4">
          Event Management App
        </h1>
        <p className="text-muted-foreground text-lg mb-8">
          Manage and cherish your special moments
        </p>
        <a
          href="/auth/login"
          className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
        >
          Get Started
        </a>
      </div>
    </div>
  );
}
