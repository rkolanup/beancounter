"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import * as jwt_decode from "jwt-decode";

interface JwtPayload {
    exp: number;        // Token expiry timestamp (in seconds)
    userId: string;
    email: string;
}

export default function useAuth() {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/login"); // Redirect if no token
            return;
        }

        try {
            // Use .default because of module resolution issues
            const decoded = jwt_decode<JwtPayload>(token);
            const isExpired = decoded.exp * 1000 < Date.now();

            if (isExpired) {
                localStorage.removeItem("token");
                router.push("/login"); // Redirect if token expired
            }
        } catch (err) {
            // Invalid token format
            localStorage.removeItem("token");
            router.push("/login");
        }
    }, [router]);
}
