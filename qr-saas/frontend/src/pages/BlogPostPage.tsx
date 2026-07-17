import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { PremiumButton } from "@/components/PremiumButton";

const POSTS: Record<string, {
  title: string;
  date: string;
  readTime: string;
  category: string;
  content: string;
}> = {
  "how-to-create-qr-codes": {
    title: "How to Create QR Codes: The Complete Guide",
    date: "Jul 15, 2026",
    readTime: "8 min read",
    category: "Guide",
    content: `
QR codes have become an essential tool for businesses and individuals alike. Whether you're sharing a website link, contact information, or payment details, QR codes offer a quick and scannable solution.

In this guide, we'll walk you through everything you need to know about creating effective QR codes that work perfectly every time.

## Getting Started

Creating a QR code is simpler than ever. Start by deciding what type of content you want to encode — a URL, text, contact card, or something else. Then use a reliable generator like QRSO to create your code in seconds.

## Best Practices

- Keep your QR codes simple and clean
- Use high contrast colors for better scanability
- Add a quiet zone around the code
- Test on multiple devices before printing

## Conclusion

With the right tools and approach, anyone can create professional QR codes. Start generating yours today at QRSO.
    `,
  },
  "best-qr-code-practices": {
    title: "10 Best Practices for QR Code Design",
    date: "Jul 12, 2026",
    readTime: "5 min read",
    category: "Design",
    content: `
Designing QR codes that scan reliably and look great requires following proven best practices. Here are the top 10 tips from design experts.

## 1. Keep It Simple

Avoid overcrowding your QR code with too much detail. Simplicity ensures better scannability.

## 2. Use High Contrast

Dark codes on light backgrounds work best. Avoid low-contrast color combinations.

## 3. Size Matters

Make sure your QR code is large enough to be scanned easily — at least 2x2 cm for print.

## 4. Add a Call to Action

Tell users what to do with a simple instruction like "Scan for menu" or "Download now."

## 5. Test Thoroughly

Always test your QR code on multiple devices and scanning apps before publishing.
    `,
  },
  "qr-codes-for-small-business": {
    title: "QR Codes for Small Business: Ultimate Tips",
    date: "Jul 10, 2026",
    readTime: "6 min read",
    category: "Business",
    content: `
Small businesses can gain a competitive edge by using QR codes effectively. From restaurant menus to business cards, QR codes bridge the gap between physical and digital experiences.

## Why QR Codes Work for Small Business

They're affordable, easy to implement, and familiar to customers. A well-placed QR code can drive traffic, collect feedback, and increase sales.

## Creative Uses

- Restaurant menus
- Loyalty programs
- Contactless payments
- Event check-ins
- Product information

Get started with QRSO today and see the difference.
    `,
  },
  "dynamic-vs-static-qr-codes": {
    title: "Dynamic vs Static QR Codes: Which One Do You Need?",
    date: "Jul 8, 2026",
    readTime: "7 min read",
    category: "Guide",
    content: `
Understanding the difference between dynamic and static QR codes helps you choose the right solution for your needs.

## Static QR Codes

Static QR codes contain fixed information that cannot be changed once generated. They're best for simple, permanent uses like website links or contact details.

## Dynamic QR Codes

Dynamic QR codes point to a redirect URL, allowing you to change the destination without reprinting the code. This is ideal for marketing campaigns and business use.

## Which Should You Choose?

If you need flexibility and tracking, go dynamic. For simple, one-time uses, static is perfectly fine.

Learn more at QRSO.
    `,
  },
  "qr-code-analytics": {
    title: "How to Track QR Code Scans and Measure ROI",
    date: "Jul 5, 2026",
    readTime: "6 min read",
    category: "Analytics",
    content: `
Tracking QR code performance is essential for understanding your audience and measuring return on investment.

## Key Metrics to Track

- Total scans
- Unique users
- Device types
- Geographic location
- Time of day

## Tools for Analytics

Use platforms like QRSO that offer built-in analytics dashboards to monitor your QR code performance in real time.

## Improving ROI

Analyze scan data to optimize placement, timing, and design. Small adjustments can lead to significant improvements in engagement.
    `,
  },
  "qr-code-marketing-ideas": {
    title: "15 Creative QR Code Marketing Ideas for 2026",
    date: "Jul 2, 2026",
    readTime: "9 min read",
    category: "Marketing",
    content: `
Stand out from the competition with these creative QR code marketing strategies.

## 1. Interactive Product Packaging

Add QR codes to your packaging that link to video tutorials or product stories.

## 2. Event Check-Ins

Use QR codes for ticketing and check-ins to streamline the attendee experience.

## 3. Social Media Integration

Link QR codes directly to your social profiles for instant follows.

## 4. Loyalty Programs

Reward customers with QR-based loyalty stamps and discounts.

## 5. Augmented Reality

Combine QR codes with AR experiences for immersive brand interactions.

Explore more ideas with QRSO.
    `,
  },
};

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? POSTS[slug] : null;

  if (!post) {
    return (
      <div className="relative min-h-screen">
        <AnimatedBackground />
        <div className="relative z-10 mx-auto max-w-3xl px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-white">Post not found</h1>
          <p className="mt-4 text-neutral-400">The blog post you're looking for doesn't exist.</p>
          <Link to="/blog">
            <PremiumButton className="mt-6">Back to Blog</PremiumButton>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <div className="relative z-10 mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/blog" className="text-sm text-neutral-400 hover:text-neutral-300">← Back to Blog</Link>
          <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">{post.title}</h1>
          <div className="mt-3 flex items-center gap-3 text-xs text-neutral-400">
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
            <span>·</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5">{post.category}</span>
          </div>
          <div className="prose prose-invert mt-8 whitespace-pre-line text-sm leading-7 text-neutral-300">
            {post.content}
          </div>
          <div className="mt-10">
            <Link to="/blog">
              <PremiumButton variant="secondary">← Back to Blog</PremiumButton>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
