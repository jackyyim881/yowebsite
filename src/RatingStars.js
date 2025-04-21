import { Star } from "lucide-react";
import React from "react";

const RatingStars = ({ n }) => {
  return (
    <div className="flex text-yellow-400 text-sm">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={i < n ? "fill-current" : "fill-none"} />
      ))}
    </div>
  );
};

export default RatingStars;
