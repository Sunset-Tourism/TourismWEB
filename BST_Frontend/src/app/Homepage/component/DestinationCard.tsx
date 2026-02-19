import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { ReactNode } from "react";

interface DestinationCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function DestinationCard({
  icon,
  title,
  description,
}: DestinationCardProps) {
  return (
    <Card className="tour-card">
      <CardHeader className="flex flex-row items-center gap-2">
        {icon}
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
}
