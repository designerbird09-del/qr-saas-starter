import { motion } from "framer-motion";
import { PremiumCard } from "@/components/PremiumCard";
import { PremiumButton } from "@/components/PremiumButton";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Link } from "react-router-dom";

const POSTS = [
  {
    slug: "how-to-create-qr-codes",
    title: "How to Create QR Codes: The Complete Guide",
    excerpt: "Learn everything about QR codes — from basic generation to advanced customization for marketing, events, and business.",
    date: "Jul 15, 2026",
    readTime: "8 min read",
    category: "Guide",
  },
  {
    slug: "best-qr-code-practices",
    title: "10 Best Practices for QR Code Design",
    excerpt: "Make your QR codes more scannable and stylish with these proven design tips from top brands.",
    date: "Jul 12, 2026",
    readTime: "5 min read",
    category: "Design",
  },
  {
    slug: "qr-codes-for-small-business",
    title: "QR Codes for Small Business: Ultimate Tips",
    excerpt: "Discover how small businesses can leverage QR codes to boost sales, improve customer experience, and grow their brand.",
    date: "Jul 10, 2026",
    readTime: "6 min read",
    category: "Business",
  },
  {
    slug: "dynamic-vs-static-qr-codes",
    title: "Dynamic vs Static QR Codes: Which One Do You Need?",
    excerpt: "Understand the key differences between dynamic and static QR codes and choose the right one for your use case.",
    date: "Jul 8, 2026",
    readTime: "7 min read",
    category: "Guide",
  },
  {
    slug: "qr-code-analytics",
    title: "How to Track QR Code Scans and Measure ROI",
    excerpt: "Learn how to use QR code analytics to track performance, understand your audience, and measure return on investment.",
    date: "Jul 5, 2026",
    readTime: "6 min read",
    category: "Analytics",
  },
  {
    slug: "qr-code-marketing-ideas",
    title: "15 Creative QR Code Marketing Ideas for 2026",
    excerpt: "Stand out from the crowd with these innovative QR code marketing strategies used by leading brands.",
    date: "Jul 2, 2026",
    readTime: "9 min read",
    category: "Marketing",
  },
];

export function BlogPage() {
  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            QRSO <span className="bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text text-transparent">Blog</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-neutral-400">
            Tips, guides, and insights about QR codes, marketing, and growing your business with QR technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <PremiumCard glow className="h-full flex flex-col">
                <div className="mb-4 flex items-center gap-3">
                  <span className="rounded-full bg-gray-600/20 px-3 py-1 text-xs font-medium text-neutral-300">
                    {post.category}
                  </span>
                  <span className="text-xs text-neutral-500">{post.readTime}</span>
                </div>
                <h2 className="mb-3 text-lg font-semibold text-white leading-snug">
                  {post.title}
                </h2>
                <p className="mb-4 flex-1 text-sm text-neutral-400 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-500">{post.date}</span>
                  <Link
                    to={`/blog/${post.slug}`}
                     className="text-sm font-medium text-neutral-400 hover:text-neutral-300 transition"
                  >
                    Read More →
                  </Link>
                </div>
              </PremiumCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mx-auto mt-16 max-w-2xl text-center"
        >
          <PremiumCard glow className="!p-10">
              <h2 className="text-2xl font-bold text-white">
                Ready to create your <span className="bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text text-transparent">first QR code</span>?
              </h2>
            <p className="mx-auto mt-3 text-neutral-400">
              Join thousands of creators using QRSO to build beautiful, scannable QR codes in seconds.
            </p>
            <Link to="/builder">
              <PremiumButton variant="primary" className="mt-6 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                Generate QR Code
              </PremiumButton>
            </Link>
          </PremiumCard>
        </motion.div>
      </div>
    </div>
  );
}
