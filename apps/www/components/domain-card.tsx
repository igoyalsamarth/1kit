import React from "react";
import { LucideIcon } from "lucide-react";

interface IDomainCard {
  title: string;
  description: string;
  icon: LucideIcon;
  tags: string[];
}

export default function DomainCard({ title, description, icon, tags }: IDomainCard) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-4">
        {React.createElement(icon, { className: "h-6 w-6 text-white" })}
      </div>
      <h3 className="text-lg font-bold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600 text-sm mb-3">
        {description}
      </p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-800">{tag}</span>
        ))}
      </div>
    </div>
  )
}
