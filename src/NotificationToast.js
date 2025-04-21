import React, { useEffect, useState } from "react";
import { Button } from "./components/ui/Button";
import { X } from "lucide-react";

const NotificationToast = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const timer = setInterval(() => {
      setShow(true);
      setTimeout(() => setShow(false), 5000);
    }, 10000);
    return () => clearInterval(timer);
  }, []);
  return show ? (
    <div className="fixed bottom-10 left-4 bg-white rounded-md shadow-lg flex gap-3 p-3 w-72 border">
      <img
        src="/assets/images/products/jewellery-1.jpg"
        alt="Rose Gold Earrings"
        className="w-16 h-16 object-contain border rounded-md"
      />
      <div className="text-xs leading-snug pr-4">
        <p className="text-gray-500">Someone just bought</p>
        <p className="font-semibold">Rose Gold Earrings</p>
        <p className="text-gray-400">2 minutes ago</p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="ml-auto"
        onClick={() => setShow(false)}
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  ) : null;
};

export default NotificationToast;
