import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/useAuth"
import type { RequestLogin } from "@/types/type"
import { useState } from "react"
import { toast } from "sonner"

export default function LoginPage() {
    const { loading, login } = useAuth();
    const [formData, setFormData] = useState<RequestLogin>({ email: "", password: "" });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.email && formData.password) {
            login(formData);
        } else {
            toast.warning("Silakan isi email dan password Anda.");
        }
    }

    return (
        // Background dengan gradasi Hijau yang elegan
        <div className="flex min-h-screen w-full items-center justify-center p-4 bg-gradient-to-br from-emerald-500 via-green-600 to-teal-700">
            <Card className="w-full max-w-sm shadow-2xl border-none bg-white/95 backdrop-blur-sm">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-2">
                        {/* Placeholder Logo SIPESDA */}
                        <div className="h-12 w-12 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-xl">S</span>
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold text-emerald-900">SIPESDA</CardTitle>
                    <CardDescription className="text-emerald-700/70">
                        Masuk untuk mengakses sistem informasi
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="grid w-full items-center gap-4">
                        <div className="flex flex-col gap-5">
                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-emerald-900">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="nama@email.com"
                                    onChange={handleInputChange}
                                    value={formData.email}
                                    className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password" name="password" className="text-emerald-900">Password</Label>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-xs text-emerald-600 hover:text-emerald-700 underline-offset-4 hover:underline"
                                    >
                                        Lupa password?
                                    </a>
                                </div>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    onChange={handleInputChange}
                                    value={formData.password}
                                    className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                                    required
                                />
                            </div>
                        </div>
                        <div className="pt-4">
                            <Button
                                type="submit"
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-all active:scale-[0.98]"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                        Memproses...
                                    </span>
                                ) : 'Masuk Sekarang'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center border-t border-emerald-50 mt-4 pt-4">
                    <p className="text-sm text-gray-500">
                        Belum punya akun?{" "}
                        <button className="text-emerald-600 font-semibold hover:underline">Daftar</button>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}