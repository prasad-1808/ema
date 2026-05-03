import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { FloralDecoration } from "~/components/floral-decoration";
import { findUserByEmail } from "~/lib/api";
import { storeUser } from "~/lib/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await findUserByEmail(email);
      const user = data.results[0];
      if (!user) {
        setError("No account found with that email.");
        return;
      }
      storeUser(user);
      navigate("/home");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <FloralDecoration className="w-32 h-16 mx-auto text-primary mb-2" />
          <CardTitle className="font-serif text-3xl">Welcome Back</CardTitle>
          <CardDescription>Enter your email to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-destructive-foreground bg-destructive/10 rounded-lg border border-destructive/20">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11"
              />
            </div>
            <Button type="submit" className="w-full h-11 font-medium" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Don't have an account?{" "}
            <Link to="/auth/register" className="text-primary hover:underline">Register</Link>
          </p>
          <FloralDecoration className="w-32 h-16 mx-auto text-primary mt-6 rotate-180" />
        </CardContent>
      </Card>
    </div>
  );
}
