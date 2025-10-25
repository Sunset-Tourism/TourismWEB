
import { BookOpen, Tag } from "lucide-react";
import React from "react";

export interface StoriesCardProps {
  category: string;
  title: string;
  description: string;
  image?: string;
  onClick?: () => void;
}

const categoryIcons: Record<string, React.ReactNode> = {
  History: <BookOpen className="stories-card__icon" size={20} />,
  Culture: <Tag className="stories-card__icon" size={20} />,
  Lifestyle: <Tag className="stories-card__icon" size={20} />,
  Traditions: <BookOpen className="stories-card__icon" size={20} />,
};

export function StoriesCard({ category, title, description, image, onClick }: StoriesCardProps) {
  return (
    <div className="stories-card" onClick={onClick}>
      <div className="stories-card__image-wrapper">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="stories-card__image"
        />
      </div>
      <div className="stories-card__header">
        <span className={`stories-card__category stories-card__category--${category.toLowerCase()}`}>{categoryIcons[category] || <Tag size={20} />} {category}</span>
        <h3 className="stories-card__title">{title}</h3>
      </div>
      <div className="stories-card__content">
        <p className="stories-card__desc">{description}</p>
        <span className="stories-card__readmore">Read More &rarr;</span>
      </div>
    </div>
  );
}
