import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { STATIC_ROUTES } from "@/lib/routeConfig";

export default function Page() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
            >
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                        duration: 2,
                        ease: "easeInOut",
                        times: [0, 0.2, 0.5, 0.8, 1],
                        repeat: Infinity,
                        repeatDelay: 1,
                    }}
                    className="inline-block mb-8 text-red-500 dark:text-red-400"
                >
                    <AlertCircle size={64} />
                </motion.div>

                <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                    Forbidden Access
                </h1>

                <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
                    Oops! You don&apos;t have permission to access this page.
                </p>

                <Button asChild>
                    <Link href={STATIC_ROUTES.dashboard}>Return Home</Link>
                </Button>
            </motion.div>
        </main>
    );
}
