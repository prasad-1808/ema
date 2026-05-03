import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { FloralDecoration } from "~/components/floral-decoration";
import { createUser } from "~/lib/api";
import { storeUser } from "~/lib/auth";

export default function Register() {
  const [form, setForm] = useState({ user_name: "", user_email: "", user_mobile: "", user_type: "guest" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await createUser(form);
      storeUser(user);
      navigate("/home");
    } catch (err: any) {
      const data = err?.data;
      if (data?.user_email) setError(`Email: ${data.user_email[0]}`);
      else setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <FloralDecoration className="w-32 h-16 mx-auto text-primary mb-2" />
          <CardTitle className="font-serif text-3xl">Create Account</CardTitle>
          <CardDescription>Join to manage your event memories</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-destructive-foreground bg-destructive/10 rounded-lg border border-destructive/20">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="user_name">Full Name</Label>
              <Input id="user_name" placeholder="Your Name" value={form.user_name} onChange={set("user_name")} required className="h-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="user_email">Email</Label>
              <Input id="user_email" type="email" placeholder="you@example.com" value={form.user_email} onChange={set("user_email")} required className="h-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="user_mobile">Mobile</Label>
              <Input id="user_mobile" type="tel" placeholder="+91 98765 43210" value={form.user_mobile} onChange={set("user_mobile")} required className="h-11" />
            </div>
            <Button type="submit" className="w-full h-11 font-medium" disabled={loading}>
              {loading ? "Creating account..." : "Register"}
            </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-primary hover:underline">Sign in</Link>
          </p>
          <FloralDecoration className="w-32 h-16 mx-auto text-primary mt-4 rotate-180" />
        </CardContent>
      </Card>
    </div>
  );
}
