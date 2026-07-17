import { useBuilderStore } from "@/store/builderStore";

export function ContentPanel() {
  const { type, value, formData, setValue, setFormData } = useBuilderStore();

  function renderFields() {
    switch (type) {
      case "URL":
        return (
          <div>
            <label className="mb-1 block text-xs font-medium text-neutral-400">Website URL</label>
            <input
              type="url"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="https://example.com"
              className="h-10 w-full rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-neutral-100 outline-none focus:border-gray-500"
            />
          </div>
        );

      case "EMAIL":
        return (
          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-400">Email Address</label>
              <input type="email" value={value} onChange={(e) => setValue(e.target.value)} placeholder="you@example.com" className="h-10 w-full rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-neutral-100 outline-none focus:border-gray-500" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-400">Subject</label>
              <input type="text" value={formData.subject || ""} onChange={(e) => setFormData({ subject: e.target.value })} placeholder="Hello" className="h-10 w-full rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-neutral-100 outline-none focus:border-gray-500" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-400">Message</label>
              <textarea value={formData.message || ""} onChange={(e) => setFormData({ message: e.target.value })} placeholder="Your message..." rows={3} className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-neutral-100 outline-none resize-none focus:border-gray-500" />
            </div>
          </div>
        );

      case "PHONE":
        return (
          <div>
            <label className="mb-1 block text-xs font-medium text-neutral-400">Phone Number</label>
            <input type="tel" value={value} onChange={(e) => setValue(e.target.value)} placeholder="+1 234 567 8900" className="h-10 w-full rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-neutral-100 outline-none focus:border-gray-500" />
          </div>
        );

      case "SMS":
        return (
          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-400">Phone Number</label>
              <input type="tel" value={value} onChange={(e) => setValue(e.target.value)} placeholder="+1 234 567 8900" className="h-10 w-full rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-neutral-100 outline-none focus:border-gray-500" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-400">Message</label>
              <textarea value={formData.message || ""} onChange={(e) => setFormData({ message: e.target.value })} placeholder="Your message..." rows={3} className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-neutral-100 outline-none resize-none focus:border-gray-500" />
            </div>
          </div>
        );

      case "WHATSAPP":
        return (
          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-400">Phone Number</label>
              <input type="tel" value={value} onChange={(e) => setValue(e.target.value)} placeholder="1234567890" className="h-10 w-full rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-neutral-100 outline-none focus:border-gray-500" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-400">Message</label>
              <textarea value={formData.message || ""} onChange={(e) => setFormData({ message: e.target.value })} placeholder="Your message..." rows={3} className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-neutral-100 outline-none resize-none focus:border-gray-500" />
            </div>
          </div>
        );

      case "WIFI":
        return (
          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-400">Network Name (SSID)</label>
              <input type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder="MyWiFi" className="h-10 w-full rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-neutral-100 outline-none focus:border-gray-500" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-400">Password</label>
              <input type="text" value={formData.wifiPassword || ""} onChange={(e) => setFormData({ wifiPassword: e.target.value })} placeholder="password123" className="h-10 w-full rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-neutral-100 outline-none focus:border-gray-500" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-400">Security Type</label>
              <select value={formData.wifiSecurity || "WPA"} onChange={(e) => setFormData({ wifiSecurity: e.target.value as any })} className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-gray-500">
                <option value="WPA">WPA/WPA2</option>
                <option value="WEP">WEP</option>
                <option value="nopass">No Password</option>
              </select>
            </div>
          </div>
        );

      case "CONTACT":
      case "MECARD":
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-neutral-400">First Name</label>
                <input type="text" value={formData.contactName || ""} onChange={(e) => setFormData({ contactName: e.target.value })} placeholder="John" className="h-10 w-full rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-neutral-100 outline-none focus:border-gray-500" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-neutral-400">Last Name</label>
                <input type="text" value={formData.contactLastName || ""} onChange={(e) => setFormData({ contactLastName: e.target.value })} placeholder="Doe" className="h-10 w-full rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-neutral-100 outline-none focus:border-gray-500" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-400">Company</label>
              <input type="text" value={formData.contactCompany || ""} onChange={(e) => setFormData({ contactCompany: e.target.value })} placeholder="Acme Inc" className="h-10 w-full rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-neutral-100 outline-none focus:border-gray-500" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-400">Phone</label>
              <input type="tel" value={formData.contactPhone || ""} onChange={(e) => setFormData({ contactPhone: e.target.value })} placeholder="+1 234 567 8900" className="h-10 w-full rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-neutral-100 outline-none focus:border-gray-500" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-400">Email</label>
              <input type="email" value={formData.contactEmail || ""} onChange={(e) => setFormData({ contactEmail: e.target.value })} placeholder="john@example.com" className="h-10 w-full rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-neutral-100 outline-none focus:border-gray-500" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-400">Website</label>
              <input type="url" value={formData.contactWebsite || ""} onChange={(e) => setFormData({ contactWebsite: e.target.value })} placeholder="https://example.com" className="h-10 w-full rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-neutral-100 outline-none focus:border-gray-500" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-400">Address</label>
              <input type="text" value={formData.contactAddress || ""} onChange={(e) => setFormData({ contactAddress: e.target.value })} placeholder="123 Main St, City" className="h-10 w-full rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-neutral-100 outline-none focus:border-gray-500" />
            </div>
          </div>
        );

      case "LOCATION":
        return (
          <div>
            <label className="mb-1 block text-xs font-medium text-neutral-400">Location Query</label>
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Eiffel Tower, Paris" className="h-10 w-full rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-neutral-100 outline-none focus:border-gray-500" />
          </div>
        );

      case "GOOGLE_MAPS":
        return (
          <div>
            <label className="mb-1 block text-xs font-medium text-neutral-400">Search Query</label>
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Restaurants near me" className="h-10 w-full rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-neutral-100 outline-none focus:border-gray-500" />
          </div>
        );

      case "EVENT":
        return (
          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-400">Event Name</label>
              <input type="text" value={formData.eventName || ""} onChange={(e) => setFormData({ eventName: e.target.value })} placeholder="Summer Concert" className="h-10 w-full rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-neutral-100 outline-none focus:border-gray-500" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-400">Date</label>
              <input type="date" value={formData.eventDate || ""} onChange={(e) => setFormData({ eventDate: e.target.value })} className="h-10 w-full rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-neutral-100 outline-none focus:border-gray-500" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-400">Time</label>
              <input type="time" value={formData.eventTime || ""} onChange={(e) => setFormData({ eventTime: e.target.value })} className="h-10 w-full rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-neutral-100 outline-none focus:border-gray-500" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-400">Location</label>
              <input type="text" value={formData.eventLocation || ""} onChange={(e) => setFormData({ eventLocation: e.target.value })} placeholder="Concert Hall, NYC" className="h-10 w-full rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-neutral-100 outline-none focus:border-gray-500" />
            </div>
          </div>
        );

      case "UPI":
        return (
          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-400">UPI ID</label>
              <input type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder="name@upi" className="h-10 w-full rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-neutral-100 outline-none focus:border-gray-500" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-400">Name</label>
              <input type="text" value={formData.upiName || ""} onChange={(e) => setFormData({ upiName: e.target.value })} placeholder="John Doe" className="h-10 w-full rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-neutral-100 outline-none focus:border-gray-500" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-400">Amount (optional)</label>
              <input type="text" value={formData.upiAmount || ""} onChange={(e) => setFormData({ upiAmount: e.target.value })} placeholder="100.00" className="h-10 w-full rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-neutral-100 outline-none focus:border-gray-500" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-400">Note (optional)</label>
              <input type="text" value={formData.upiNote || ""} onChange={(e) => setFormData({ upiNote: e.target.value })} placeholder="Payment for..." className="h-10 w-full rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-neutral-100 outline-none focus:border-gray-500" />
            </div>
          </div>
        );

      case "BITCOIN":
        return (
          <div>
            <label className="mb-1 block text-xs font-medium text-neutral-400">Bitcoin Address</label>
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder="bc1qxy2kgdygjrsqtzq2n0yrf2493p80kkw" className="h-10 w-full rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-neutral-100 outline-none focus:border-gray-500" />
          </div>
        );

      case "APP_DOWNLOAD":
        return (
          <div>
            <label className="mb-1 block text-xs font-medium text-neutral-400">App Store URL</label>
            <input type="url" value={value} onChange={(e) => setValue(e.target.value)} placeholder="https://apps.apple.com/..." className="h-10 w-full rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-neutral-100 outline-none focus:border-gray-500" />
          </div>
        );

      case "COUPON":
        return (
          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-400">Coupon Code</label>
              <input type="text" value={formData.couponCode || ""} onChange={(e) => setFormData({ couponCode: e.target.value })} placeholder="SUMMER25" className="h-10 w-full rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-neutral-100 outline-none focus:border-gray-500" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-400">Discount</label>
              <input type="text" value={formData.couponDiscount || ""} onChange={(e) => setFormData({ couponDiscount: e.target.value })} placeholder="25% OFF" className="h-10 w-full rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-neutral-100 outline-none focus:border-gray-500" />
            </div>
          </div>
        );

      case "GOOGLE_REVIEW":
        return (
          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-400">Business Name</label>
              <input type="text" value={formData.reviewBusinessName || ""} onChange={(e) => setFormData({ reviewBusinessName: e.target.value })} placeholder="My Business" className="h-10 w-full rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-neutral-100 outline-none focus:border-gray-500" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-400">Review URL</label>
              <input type="url" value={formData.reviewUrl || ""} onChange={(e) => setFormData({ reviewUrl: e.target.value })} placeholder="https://g.page/..." className="h-10 w-full rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-neutral-100 outline-none focus:border-gray-500" />
            </div>
          </div>
        );

      case "CUSTOM_LANDING":
        return (
          <div>
            <label className="mb-1 block text-xs font-medium text-neutral-400">Landing Page URL</label>
            <input type="url" value={formData.landingUrl || ""} onChange={(e) => setFormData({ landingUrl: e.target.value })} placeholder="https://your-landing-page.com" className="h-10 w-full rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-neutral-100 outline-none focus:border-gray-500" />
          </div>
        );

      case "DYNAMIC":
        return (
          <div>
            <label className="mb-1 block text-xs font-medium text-neutral-400">Destination URL</label>
            <input type="url" value={formData.dynamicDestination || ""} onChange={(e) => setFormData({ dynamicDestination: e.target.value })} placeholder="https://your-dynamic-url.com" className="h-10 w-full rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-neutral-100 outline-none focus:border-gray-500" />
          </div>
        );

      case "FACEBOOK":
      case "INSTAGRAM":
      case "YOUTUBE":
      case "TIKTOK":
      case "X":
      case "LINKEDIN":
      case "PINTEREST":
      case "PAYTM":
      case "PHONEPE":
      case "GOOGLE_PAY":
      case "DISCORD":
      case "TELEGRAM":
        return (
          <div>
            <label className="mb-1 block text-xs font-medium text-neutral-400">Username / Profile</label>
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder={`@username`} className="h-10 w-full rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-neutral-100 outline-none focus:border-gray-500" />
          </div>
        );

      case "PDF":
      case "IMAGE":
      case "VIDEO":
        return (
          <div>
            <label className="mb-1 block text-xs font-medium text-neutral-400">File URL</label>
            <input type="url" value={value} onChange={(e) => setValue(e.target.value)} placeholder="https://example.com/file.pdf" className="h-10 w-full rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-neutral-100 outline-none focus:border-gray-500" />
          </div>
        );

      case "STRIPE":
      case "MULTI_LINK":
      case "TEXT":
      default:
        return (
          <div>
            <label className="mb-1 block text-xs font-medium text-neutral-400">Content</label>
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter your text..."
              rows={5}
              className="h-28 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-neutral-100 outline-none resize-none focus:border-gray-500 focus:bg-white/10"
            />
          </div>
        );
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-300">
        {type === "URL" && "Website URL"}
        {type === "TEXT" && "Text Content"}
        {type === "EMAIL" && "Email"}
        {type === "PHONE" && "Phone Number"}
        {type === "SMS" && "SMS"}
        {type === "WHATSAPP" && "WhatsApp"}
        {type === "WIFI" && "WiFi Network"}
        {type === "CONTACT" && "Contact Card"}
        {type === "MECARD" && "MeCard"}
        {type === "LOCATION" && "Location"}
        {type === "GOOGLE_MAPS" && "Google Maps"}
        {type === "FACEBOOK" && "Facebook"}
        {type === "INSTAGRAM" && "Instagram"}
        {type === "YOUTUBE" && "YouTube"}
        {type === "TIKTOK" && "TikTok"}
        {type === "X" && "X / Twitter"}
        {type === "LINKEDIN" && "LinkedIn"}
        {type === "PINTEREST" && "Pinterest"}
        {type === "BITCOIN" && "Bitcoin"}
        {type === "UPI" && "UPI Payment"}
        {type === "PAYTM" && "Paytm"}
        {type === "PHONEPE" && "PhonePe"}
        {type === "GOOGLE_PAY" && "Google Pay"}
        {type === "APP_DOWNLOAD" && "App Download"}
        {type === "PDF" && "PDF Document"}
        {type === "IMAGE" && "Image"}
        {type === "VIDEO" && "Video"}
        {type === "EVENT" && "Event Details"}
        {type === "COUPON" && "Coupon"}
        {type === "RESTAURANT_MENU" && "Restaurant Menu"}
        {type === "GOOGLE_REVIEW" && "Google Review"}
        {type === "CUSTOM_LANDING" && "Custom Landing"}
        {type === "DYNAMIC" && "Dynamic QR"}
        {type === "MULTI_LINK" && "Multi URL"}
        {type === "STRIPE" && "Stripe Payment"}
        {type === "DISCORD" && "Discord"}
        {type === "TELEGRAM" && "Telegram"}
      </h2>
      {renderFields()}
    </div>
  );
}
