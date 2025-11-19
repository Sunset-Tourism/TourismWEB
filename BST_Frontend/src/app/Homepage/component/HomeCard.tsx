import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface HomeCardProps {
  icon?: ReactNode;
  image?: ReactNode;
  title: string;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
}

export default function HomeCard({
  icon,
  image,
  title,
  subtitle,
  children,
  className,
}: HomeCardProps) {
  return (
    <Card className={`home-card ${className || ""}`}>
      <CardHeader>
        {icon || image}
        <CardTitle>{title}</CardTitle>
        {subtitle && <div className="home-card-subtitle">{subtitle}</div>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
