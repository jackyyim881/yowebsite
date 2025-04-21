import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "./components/ui/Button";

export default function NewsletterModal() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 5000);
    return () => clearTimeout(timer);
  }, []);
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
      <div className="bg-white rounded-lg shadow-lg max-w-[700px] w-full relative ">
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-2 right-2"
          onClick={() => setOpen(false)}
        >
          <X />
        </Button>
        <div className="grid grid-cols-2 gap-4">
          <div className="">
            <img
              src="/img/newsletter.png"
              alt="Newsletter"
              className="w-full h-full mx-auto mb-4"
            />
          </div>
          <div className="flex flex-col justify-center p-10">
            <h3 className="text-lg font-bold text-center mb-2">
              Subscribe Newsletter.
            </h3>
            <p className="text-sm text-gray-600 text-center mb-4">
              Subscribe to <b>Anon</b> to get latest products and discount
              updates.
            </p>
            <form
              className="flex flex-col gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thanks for subscribing!");
                setOpen(false);
              }}
            >
              <input
                type="email"
                required
                placeholder="Email Address"
                className="border rounded-md px-3 py-2 text-sm"
              />
              <button
                type="submit"
                className="uppercase text-xs font-bold py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
